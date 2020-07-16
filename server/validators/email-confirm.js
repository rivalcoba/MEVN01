// Importing validation framework
import * as Yup from 'yup';
import User from '@models/Users'

// Creating validation schema
const EmailConfirmSchema = Yup.object().shape({
    token: Yup.string().required()
});

export default async (req, res, next) =>{
    try {
        await EmailConfirmSchema.validate(req.body)
        const user = await User.findOne({emailConfirmCode: token})
        
        // If the user was not found
        if(!user){
            throw new Yup.ValidationError(
                'Invalid Confirmation Code',
                req.body,
                'token'
            )
        }

        // If the user was found
        req.user = user;

        return next()


    } catch (error) {
        return res.status(422).json({
            [error.type]: error.message
        })
    }
}
