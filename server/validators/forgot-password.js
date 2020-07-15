// Importing validation framework
import * as Yup from 'yup';
import User from '@models/Users'
import PasswordReset from '@models/PasswordReset'

// Creating validation schema
const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required()
});

export default async (req, res, next) => {
    // Decosntruction of an object
    const {email} = req.body
    try {
        // Validating forgot password request
        await ForgotPasswordSchema.validate(req.body)
        // Validanting that there is a user with this email
        const user = await User.findOne({
            email: email
        })
        // IF the user is not found, we throw a yup error
        if(!user){
            throw new Yup.ValidationError('This user doent exist.',
            req.body,
            'email')
        }
        // Check if we aready have a reset request for these user
        const existingReset = await PasswordReset.findOne({email})
        // If
        if(existingReset){
            throw new Yup.ValidationError('Password Reset Link already Sent.',
            req.body,
            'email')
        }

        // The user was found, we add the user to the request
        req.user = user

        // Calling Next
        next()

    } catch (error) {
        res.status(422).json({
            [error.path]: error.message
        })
    }
}
