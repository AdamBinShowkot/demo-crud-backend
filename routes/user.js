const express = require("express");
const userRouter = express.Router();

const { API } = require("../util/constant");
const authMiddleware = require("../middlewares/auth_middleware");
const CreateUserController=require('../controllers/users/create')

userRouter.post(
  API.API_CONTEXT + API.USER_CREATE,
  CreateUserController
);




module.exports = userRouter;
