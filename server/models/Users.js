// Importing mongoose
import mongoose from 'mongoose';
// Importing library to encript passwords
import Bcrypt from 'bcryptjs';
// Generates Random String
import randomstring from 'randomstring';

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

export default mongoose.model('User', UserSchema);