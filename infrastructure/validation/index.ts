import { z, ZodRawShape, ZodError } from 'zod';

export { z, ZodError };

export const createObject = (object: ZodRawShape) => z.object(object);

export const manageMessage = ({ errors }: ZodError) => errors.map((error) => error.message);

export const isEmail = (value: string): boolean => z.string().email().safeParse(value).success;
