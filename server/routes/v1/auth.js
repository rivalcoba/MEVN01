// Import Router from express
import { Router } from 'express';

// Importing Validator
import loginValidator from '@validators/login'

// Importing validator
import registerValidator from '@validators/register';

// Import Controller
import authController from '@controllers/v1/auth.controller';

// Import forgot password validator
import forgotPasswordValidator from '@validators/forgot-password'

// Create an instance from Express Router
const authRouter = new Router();

// Register login method
authRouter.post('/login', loginValidator, authController.login);

// Register register method
authRouter.post('/register', registerValidator, authController.register);

// Reset Password Route
authRouter.post('/passwords/email', forgotPasswordValidator, authController.forgotPassword)

// Exporting Router
export default authRouter;
