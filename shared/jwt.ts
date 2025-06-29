import jwt from 'jsonwebtoken';
import { jwtConfig } from '&/config';

const JWT_SECRET = jwtConfig.JWT_SECRET;
const EXPIRATION_TIME = jwtConfig.EXPIRATION_TIME;

export const generateToken = (payload: object): string => jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRATION_TIME });

export const decodedToken = <T>(token: string): T => jwt.verify(token, JWT_SECRET) as T;
