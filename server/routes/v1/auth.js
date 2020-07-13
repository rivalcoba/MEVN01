// Import Router from express
import { Router } from 'express';

// Importing validator
import registerValidator from '@vaildators/register'

// Import Controller
import authController from '@controllers/v1/auth.controller';

// Create an instance from Express Router
const authRouter = new Router();

// Register login method
authRouter.post('/login', authController.login);

// Register register method
authRouter.post('/register', registerValidator, authController.register);

// Exporting Router
export default authRouter;
