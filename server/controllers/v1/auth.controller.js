// Iport a user model
import User from '@models/Users';
import PasswordReset from '@models/PasswordReset'
import { response } from 'express';
// Importing bcryp for hashing
import Bcrypt from 'bcryptjs'

// Controller of all authentication end points

// Log In function
const login = async (req, res) => {
    // Get the email and password from the frontend
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        // Compare the password
        // if the user is found
        if (user.comparePasswords(password)) {
            // Generating Token for the user
            const token = user.generateToken();

            // Return the user and token
            return res.json({ user, token });
        }
    }
    // If not match
    return res.status(400).json({
        email: 'These credential do not match our records.',
    });
};

// Register Function
const register = async (req, res) => {
    // Getting parameters from body
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });

    const token = user.generateToken();

    return res.status(201).json({ user, token });
};

// Forgot Password Controller
const forgotPassword = async (req, res)=>{
    
    await req.user.forgotPassword()
    
    return res.json({
        message: 'Password reset link sent.'
    })
}

const resetPassword = async (req,res)=>{
    // Get user from the request
    const {user} = req
    // Find an update the user with the new password
    await User.findOneAndUpdate({
        email: user.email
    },{
        password: Bcrypt.hashSync(req.body.password)
    })
    // Delete the password reset
    await PasswordReset.findOneAndDelete({
        email: user.email
    })

    // Return success
    return res.json({
        message: 'Password reset successfully'
    })
}

const emailConfirm = async (req, res)=>{
    const user = await User.findOneAndUpdate({
        email: req.user.email
    },{
        emailConfirmCode: null,
        emailConfirmedAt: new Date()
    },{
        new: true
    })

    // Generate a toke for the user
    const token = user.generateToken()

    return res.json({
        user,
        token
    })
} 

// Exporting methods
export default {
    login,
    register,
    forgotPassword,
    resetPassword,
    emailConfirm
};
