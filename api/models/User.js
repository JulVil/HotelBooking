import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    roomNumber: [String],
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
