import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['admin', 'manager', 'technologist', 'operator'], required: true }
});


const user = new User({
  username: 'admin',
  password: await bcrypt.hash('yourpassword', 10),
  role: 'manager',
});
await user.save();
export default mongoose.models.User || mongoose.model('User', UserSchema);