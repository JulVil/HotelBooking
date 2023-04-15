import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // // Check if username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser.username === username)
        return next(createError(400, 'Username already exists'));

      if (existingUser.email === email)
        return next(createError(400, 'Email already exists'));
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the newUser object
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Save the newUser object to the database
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);
    res
      .cookie('user_token', token, { httpOnly: true })
      .status(200)
      .json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, 'User not found!'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong password or username!'));

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    const { password, ...otherDetails } = user._doc;
    res
      .cookie('user_token', token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, 'User not found!'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong password or username!'));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_KEY
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
