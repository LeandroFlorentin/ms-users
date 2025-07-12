import jwt from 'jsonwebtoken';
import { jwtConfig } from '&/config';

const JWT_SECRET = jwtConfig.JWT_SECRET;

export const generateToken = (payload: object): string => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

export const decodedToken = (token: string): jwt.JwtPayload | string => jwt.verify(token, JWT_SECRET);
