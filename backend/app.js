const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

require('dotenv/config');

app.use(cors());
app.options('*', cors());


// A middleware (a body parser)
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
// Handling errors in butiful way
app.use(errorHandler);


//Routers
const categoriesRouter = require('./routers/categories');
const jobsRouter = require('./routers/jobs');
const trunksRouter = require('./routers/trunks');
const usersRouter = require('./routers/users');
const warehousesRouter = require('./routers/warehouses');
//sub-Routers
const statusJobsRouter = require('./routers/statusJobs');
const statusTrunksRouter = require('./routers/statusTrunks');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/jobs`, jobsRouter);
app.use(`${api}/trunks`, trunksRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/warehouses`, warehousesRouter);
app.use(`${api}/statusJobs`, statusJobsRouter);
app.use(`${api}/statusTrunks`, statusTrunksRouter);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'transit-database'
})
.then(()=> {
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
})