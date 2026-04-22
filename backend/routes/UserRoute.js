import express from 'express'
import { login_user, RegisterUser, adminLogin } from '../controller/userController.js'

const userRouter = express.Router();

userRouter.post('/register', login_user)
userRouter.post('/login', RegisterUser)
userRouter.post('/admin', adminLogin)

export default userRouter
