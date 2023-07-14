const express = require('express');
const postRoute = require('../routes/post');
const userRoute = require('../routes/user');
const authRoute = require('../routes/auth');


const route = express.Router();


route.use('/post',postRoute);
route.use('/user',userRoute);
route.use('/auth',authRoute);



module.exports = route;