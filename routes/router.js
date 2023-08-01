const express = require("express");
const appRouter = express.Router();

const authenticationRouter = require("./authentication");
const userRouter=require('./user');

appRouter.use(authenticationRouter);
appRouter.use(userRouter);

module.exports = appRouter;
