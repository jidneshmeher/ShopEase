import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  address: [
    {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    }
  ],
  profile_pic: {
    type: String,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
