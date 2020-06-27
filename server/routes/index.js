// Importing Router
import { Router } from 'express';

// Importing auth
import authRouter from './v1/auth';

// Creating an instance of Express Router
const v1Router = new Router();

// Add Atuh routes
v1Router.use('api/v1/auth', authRouter);

// Export v1Router
export default v1Router;
