// Iport a user model
import User from '@models/Users';
import { response } from 'express';

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

// Exporting methods
export default {
    login,
    register,
};
