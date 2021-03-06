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

// Import reset password validator
import resetPasswordValidator from '@validators/reset-password'

// Import reset password validator
import emailConfirmValidator from '@validators/email-confirm'

// Create an instance from Express Router
const authRouter = new Router();

// Register login method
authRouter.post('/login', loginValidator, authController.login);

// Register register method
authRouter.post('/register', registerValidator, authController.register);

// Reset Password Route
authRouter.post('/passwords/email', forgotPasswordValidator, authController.forgotPassword)

// Registering password Reset
authRouter.post('/passwords/reset', resetPasswordValidator, authController.resetPassword)

// Registering email Confirm
authRouter.post('/emails/confirm', emailConfirmValidator, authController.emailConfirm)

// Exporting Router
export default authRouter;
