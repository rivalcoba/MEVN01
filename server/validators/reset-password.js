// Importing validation framework
import * as Yup from 'yup';
import User from '@models/Users'
import PasswordReset from '@models/PasswordReset'

// Creating validation schema
const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(6).required()
});

export default async (req, res, next) => {
    // Decosntruction of an object
    const {password, token} = req.body
    try {
        // Validating Reset password request
        await ResetPasswordSchema.validate(req.body)
        
        // Check if we aready have a reset request for these user
        const existingReset = await PasswordReset.findOne({token})
        // If
        if(!existingReset){
            throw new Yup.ValidationError('Invalid Reset Token',
            req.body,
            'password' // Error Path
            )
        }

        const timeInMinutes = Math.ceil((new Date().getTime() - new Date(existingReset.createdAt).getTime())/60000)

        if(timeInMinutes > 5){
            // Delete the password Reset
            await PasswordReset.findOneAndDelete({token})
            // Throw a yup error
            throw new Yup.ValidationError(
                'Reset Token Expired',
                req.body,
                'password' // Error Path
            )
        }

        // If we fine an existing reset
        const user = await User.findOne({email: existingReset.email})

        req.user = user

        return next()

    } catch (error) {
        res.status(422).json({
            [error.path]: error.message
        })
    }
}
