import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/users.js';
import { SessionCollection } from '../db/models/session.js';

import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/index.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 5);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

// export const loginUser = async (payload) => {
//   const user = await UsersCollection.findOne({ email: payload.email });
//   if (!user) {
//     throw createHttpError(404, 'User not found');
//   }

//   const isEqual = await bcrypt.compare(payload.password, user.password); // Порівнюємо хеші паролів

//   if (!isEqual) {
//     throw createHttpError(401, 'Unauthorized');
//   }

//   // далі ми доповнемо цей контролер
// };

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  });
};
