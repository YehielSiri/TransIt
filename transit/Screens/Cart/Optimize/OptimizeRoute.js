
/**
 * @private
 * 
 * @param {Points[]} points Points in the path as a list.
 * @param {Function} distanceFunc Calculate the distance between two points.
 *                                Assume that there are distances between each two points.
 */
class Path {
    constructor(points, distanceFunc) {
        this.points = points;
        this.distanceFunc = distanceFunc;
        this.initializeOrder();
        this.initializeDistances();
    }
    /**
       * Creates the default order for the points, the courior's order.
       */
    initializeOrder() {
        this.order = new Array(this.points.length);
        for (var i = 0; i < this.order.length; i++)
            this.order[i] = i;
    }
    /**
       * Calculates the distance for all the points.
       */
    initializeDistances() {
        this.distances = new Array(this.points.length * this.points.length);
        for (var i = 0; i < this.points.length; i++) {
            for (var j = i + 1; j < this.points.length; j++) {
                this.distances[j + i * this.points.length] = this.distanceFunc(this.points[i], this.points[j]);
            }
        }
    }
    /**
       * Perform one iteration of the simulated annealing.
       *
       * Choose two random points in the path, and calculate how much the path distance would change
       * if you swapped the two points. If it would make the path shorter, swap them.
       *
       * If not, have a random chance to swap them anyway.
       * This random chance is based on how bad the move is,
       * as well as how early in the annealing process we are (the "temperature").
       *
       * @param {*} temp The current temperature of the algorithm.
       */
    change(temp) {
        var i = this.randomPos(), j = this.randomPos();
        var delta = this.delta_distance(i, j);
        if (delta < 0 || Math.random() < Math.exp(-delta / temp)) {
            this.swap(i, j);
        }
    }
    /**
       * Swap two points in the path order by their indices.
       * @param {*} i The first index to swap.
       * @param {*} j The second index to swap.
       */
    swap(i, j) {
        var tmp = this.order[i];
        this.order[i] = this.order[j];
        this.order[j] = tmp;
    }
    /**
       * Calculate the change in path distance if i and j were swapped.
       *
       * Calculate the distance between i and j's neighbors,
       * plus the distance between j and i's neighbors, minus the current distances.
       *
       * If the value is negative, it would make the path shorter to swap the values.
       * @param {*} i The first index to compare.
       * @param {*} j The second index to compare.
       * @returns The change in path distance if i and j were swapped.
       */
    delta_distance(i, j) {
        var jm1 = this.index(j - 1), jp1 = this.index(j + 1), im1 = this.index(i - 1), ip1 = this.index(i + 1);
        var s = this.distance(jm1, i)
            + this.distance(i, jp1)
            + this.distance(im1, j)
            + this.distance(j, ip1)
            - this.distance(im1, i)
            - this.distance(i, ip1)
            - this.distance(jm1, j)
            - this.distance(j, jp1);
        if (jm1 === i || jp1 === i)
            s += 2 * this.distance(i, j);
        return s;
    }
    /**
       * Get the ith point in the point array.
       * @param {*} i The index to retrieve.
       *   If i is greater than or less
       */
    index(i) {
        return (i + this.points.length) % this.points.length;
    }
    /**
       * Get the ith point in the path order.
       * @param {*} i The index to retrieve.
       */
    access(i) {
        return this.points[this.order[this.index(i)]];
    }
    /**
       * Access the cached distance between two points, by their indices.
       * @param {number} i The first index as an integer
       * @param {number} j The second index as an integer
       * @returns {number} The distance between point i and point j.
       */
    distance(i, j) {
        if (i === j)
            return 0; // Identity.


        // Ensure low is actually lower.
        var low = this.order[i], high = this.order[j];
        if (low > high) { low = this.order[j]; high = this.order[i]; }

        return this.distances[low * this.points.length + high] || 0;
    }
    /**
       * Retrieve a random index between 1 and the last position in the array of points.
       * @returns {number} A random index.
       */
    randomPos() {
        return 1 + Math.floor(Math.random() * (this.points.length - 1));
    }
}

// /**
//  * Represents a point in two dimensions. Used as the input for `solve`.
//  * @class
//  * @param {number} x abscissa
//  * @param {number} y ordinate
//  */
// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
// };
class Point {
    constructor(street, house, city, zip) {
        this.street = street;
        this.house = house;
        this.city = city;
        this.zip = zip;
    }
};

/**
 * Solves the following problem:
 *  Given a list of points and the distances between each pair of points,
 *  what is the shortest possible route that visits each point exactly
 *  once and returns to the origin point?
 *
 * @param {Point[]} points The points that the path will have to visit.
 * @param {number} [temp_coeff=0.999] changes the convergence speed of the algorithm. Smaller values (0.9) work faster but give poorer solutions, whereas values closer to 1 (0.99999) work slower, but give better solutions.
 * @param {Function} [callback=undefined] An optional callback to be called after each iteration.
 * @param {Function} [callback=euclidean] An optional argument to specify how distances are calculated. The function takes two Point objects as arguments and returns a number for distance. Defaults to simple Euclidean distance calculation.
 *
 * @returns {number[]} An array of indexes in the original array. Indicates in which order the different points are visited.
 *
 * @example
 * var points = [
 *       new salesman.Point(2,3)
 *       //other points
 *     ];
 * var solution = salesman.solve(points);
 * var ordered_points = solution.map(i => points[i]);
 * // ordered_points now contains the points, in the order they ought to be visited.
 **/
function solve(points, temp_coeff = 0.999, callback, distance = wazeDist) {
    var path = new Path(points, distance);
    // Optimization: If there is only one point in the list, there is no path.
    if (points.length < 2) return path.order;
    // Optimization: If the user would provide a bad input, end immediately.
    if (temp_coeff >= 1 || temp_coeff <= 0) return path.order;

    // Create a temperature coefficient.
    if (!temp_coeff)
        temp_coeff = 1 - Math.exp(-10 - Math.min(points.length, 1e6) / 1e5);
    var hasCallback = typeof (callback) === "function";

    for (var temperature = 100 * distance(path.access(0), path.access(1));
        temperature > 1e-6;
        temperature *= temp_coeff) {
        path.change(temperature);
        if (hasCallback) callback(path.order);
    }
    return path.order;
};

// /**
//  * @private
//  * 
//  * A simple distance function, to use as the default.
//  * @param {Point} p 
//  * @param {Point} q 
//  * @returns {number} The Euclidean distance between p and q
//  */
// function euclidean(p, q) {
//     var dx = p.x - q.x, dy = p.y - q.y;
//     return Math.sqrt(dx * dx + dy * dy);
// }wazeDist

 /* @private
 * 
 * A simple distance function, to use as the default.
 * @param {Point} p 
 * @param {Point} q 
 * @returns {number} The Euclidean distance between p and q
 */
function wazeDist(p, q) {
    var dist = calculateWase (p, q);
    return dist;
}


if (typeof module === "object") {
    module.exports = {
        "solve": solve,
        "Point": Point
    };
}