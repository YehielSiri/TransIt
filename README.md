# TransIt
An application that aims to help shipping companies perform their job pool faster and more efficiently.

TransIt is a smart digital work scheduler.
It does this in two ways:
1. Courier collects the works for himself, instead of company will do it.
2. A smart search engine optimizes the scheduling between the all targets for the shortest route.

<div align="center">

| Deliver with TransIt |
| ------------- |
| <p align="center"><img src="https://github.com/YehielSiri/TransIt/blob/main/screenshots/1_name_%26_logo.jpg"/></p>  |
  
 </div>

 Its general design resembles an online store, and much of its internal dynamics is taken from there. Responds to a private business that has its own couriers as well as shipping companies.

-----

<h2> Technically </h2>
Written in React Native, except for the search engine itself, so the app is compatible with iOS as well as Android. Uses MongoDB for the database and NodeJS for the server.

-----

<h2> Methods </h2>
As a company user:
1. [ Push in jobs (and edit, delete, etc) ]()
2. [ Tracking the progress of the shipment and the progress of the messengers. ]()
3. [ A general follow-up review of their work pool and its performance. ]()
4. [ Ranking jobs according to urgency, alongside building a bar of preferred jobs. ]()

As a courier user:
1. [ Fill a trunk with jobs from the pool. ]()
2. [ Update a job / trunk execution status. ]()
3. [ Arrange the order of execution of the works. ]()
4. [ Accept/reject the system proposal for the execution order. ]()

<div align="center">

| The jobs pool in TransIt |
| ------------- |
| <p align="center"><img src="https://github.com/YehielSiri/TransIt/blob/main/screenshots/2_main_page.jpg"/></p>  |
  
 </div>

-----

<h2>The Smart Search Engine</h2>
Its goal is to find the shortest route which is going through the all jobs. Actually, this is the Travelling Salesman Problem. It's an NPC problem which has a good enough solution until 3-4 target points.

<div align="center">

| Travelling Salesman Problem |
| ------------- |
| <p align="center"><img src="https://github.com/YehielSiri/TransIt/blob/main/screenshots/TSP.gif"/></p>  |
  
 </div>

Therefor, we focused on three directions:
<div>
<h5>1. Optimizing an exist solution (which has built authomaticaly by the user).</h5>
    <p>
        Such as calculate the greedy route and then, optimize it by swapping 2 edges.
    </p>
 </div>

<div>
<h5>2. Gradually, point by point.</h5>
    <p>
        Calculate the exact solution for the first target. For every additional target, optimize the route.
    </p>
 </div>

<div>
<h5>3. An approximation algorithm.</h5>
    <p>
        For example, firstly, find a minimal spannig tree (by Grip or Kruskal). Then, scan the tree (by prefix scannig for example).
    </p>
 </div>
Our final leading direction is Simulated Annealing.

-----

<h2> How to use </h2>

Just wating for the final version :-)