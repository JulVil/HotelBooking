import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  const userToken = req.cookies.user_token;
  if (!token && !userToken) {
    return next(createError(401, `You're not authenticated`));
  }

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
      if (error) return next(createError(403, 'Token is not valid'));
      req.user = user;
      next();
    });
  }

  if (userToken) {
    jwt.verify(userToken, process.env.JWT_KEY, (error, user) => {
      if (error) return next(createError(403, 'Token is not valid'));
      req.user = user;
      next();
    });
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (error) => {
    if (error) {
      return next(createError(error.status, error.message));
    }
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, `You're not authorized`));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (error) => {
    if (error) {
      return next(createError(error.status, error.message));
    }
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, `You're note authorized`));
    }
  });
};
