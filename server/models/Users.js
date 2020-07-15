// importing configuration
import config from '@config';
// Importing mongoose
import mongoose from 'mongoose';
// importing web tokens
import jwt from 'jsonwebtoken';
// Importing library to encript passwords
import Bcrypt from 'bcryptjs';
// Generates Random String
import randomstring from 'randomstring';
// Importing mail package
import Mail from '@fullstackjs/mail';
// Import password reset model
import PasswordReset from '@models/PasswordReset'

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: Date,
    updatedAt: Date,
    password: String,
    emailConfirmedAt: Date,
    emailConfirmCode: String,
});

// Is executed before saving
// No use arrow functions when defining schemas
// do not bid the "this"
UserSchema.pre('save', function () {
    this.password = Bcrypt.hashSync(this.password);
    this.emailConfirmCode = randomstring.generate(72);
    this.createdAt = new Date();
});

UserSchema.post('save', async function () {
    console.log(
        `> CODE: ${config.url}/auth/emails/confirm/${this.emailConfirmCode}`
    );
    await new Mail('confirm-account')
        .to(this.email, this.name)
        .subject('Please Confirm your account')
        .data({
            name: this.name,
            url: `${config.url}/auth/emails/confirm/${this.emailConfirmCode}`,
        })
        .send();
});

UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, config.jwtSecret);
};

UserSchema.methods.comparePasswords = function (plainPassword) {
    return Bcrypt.compareSync(plainPassword, this.password);
};

UserSchema.methods.forgotPassword = async function(){
    // Creating the reset token
    const token = randomstring.generate(72)
    
    // Create document reset password
    await PasswordReset.create({
        token,
        email: this.email,
        createdAt: new Date()
    })

    // Sending Mail
    await new Mail('forgot-password')
    .to(this.email, this.name)
    .subject('Password reset From MEVN')
    .data({
        url: `${config.url}/auth/passwords/reset/${token}`,
        name: this.name
    })
    .send()
}

export default mongoose.model('User', UserSchema);
