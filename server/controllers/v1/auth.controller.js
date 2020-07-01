// Iport a user model
import User from '@models/Users'
import { response } from 'express';

// Controller of all authentication end points

// Log In function
const login = (req, res) => {};

// Register Function
const register = async (req, res) => {
    // Getting parameters from body
    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password
    });
    
    return res.status(201).json({user});
};

// Exporting methods
export default {
    login,
    register,
};
