import * as Yup from 'yup';

// Requiring the user model
import User from '@models/Users';

// Define a validation schema
const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});

export default async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        await RegisterSchema.validate({ name, email, password });
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Yup.ValidationError(
                'This user already exist.',
                req.body,
                'email'
            );
        }

        // To continue to the process!!!
        next();
    } catch (error) {
        return res.status(422).json({
            [error.path]: error.message,
        });
    }
};
