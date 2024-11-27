import dotenv from 'dotenv';
dotenv.config();

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'bibliotheque_secret_key',
    expiresIn: '24h',
  },
  upload: {
    path: './uploads',
  },
  port: process.env.PORT || 3000,
};