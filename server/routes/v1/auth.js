// Import Router from express
import { Router } from 'express';

// Import Controller
import authController from '@controllers/v1/auth.controller';

// Create an instance from Express Router
const authRouter = new Router();

// Register login method
authRouter.post('/login', authController.login);

// Register register method
authRouter.post('/register', authController.register);

// Exporting Router
export default authRouter;
