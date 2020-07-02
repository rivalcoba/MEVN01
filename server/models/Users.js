// importing configuration
import config from '@config'
// Importing mongoose
import mongoose from 'mongoose';
// Importing library to encript passwords
import Bcrypt from 'bcryptjs';
// Generates Random String
import randomstring from 'randomstring';
// Importing mail package
import Mail from '@fullstackjs/mail';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: Date,
    updatedAt: Date,
    password: String,
    emailConfirmedAt: Date,
    emailConfirmCode: String
});

// Is executed before saving
// No use arrow functions when defining schemas
// do not bid the "this"
UserSchema.pre('save', function(){
    this.password = Bcrypt.hashSync(this.password);
    this.emailConfirmCode = randomstring.generate(72);
    this.createdAt = new Date();
});

UserSchema.post('save',async function(){
    console.log(`> CODE: ${config.url}/auth/emails/confirm/${this.emailConfirmCode}`);
    await new Mail('confirm-account')
    .to(this.email, this.name)
    .subject('Please Confirm your account')
    .data({
        name: this.name,
        url: `${config.url}/auth/emails/confirm/${this.emailConfirmCode}`
    })
    .send();
})

export default mongoose.model('User', UserSchema);