require('dotenv').config({path:`${process.cwd()}/.env`})
const express = require('express');
const authRouter = require('./route/authRoute');
const contactRouter = require('./route/contactRoute');
const enrolmentRouter = require('./route/enrolmentRoute');
const app = express();
app.use(express.json());


//all routes will be here
app.use('/api/v1/auth',authRouter);
app.use('/api',contactRouter);
app.use('/api',enrolmentRouter);

app.use('*',(req, res, next) => {
    res.status(404).json({
        status:'fail',
        message:'Route are Not Found',
    });
});


const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is Running on Port', PORT);
});

