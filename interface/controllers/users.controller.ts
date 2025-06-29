import { Request, Response, NextFunction } from 'express';
import { createUser, getUserByEmailOrUser } from '&/application/use-cases/user';
import { userRepository } from '&/infrastructure/database/repositories/user.repository.impl';
import { IUserInput, IQueryInput } from '&/application/dtos/users/users.dto';
import buildLogger from '&/infrastructure/winston';
import { RequestWithUsername } from '&/types/express';

const logger = buildLogger('users');

export const createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = (req.body as IUserInput) || {};
    const user = await createUser(userRepository, body);
    const { password, ...restUser } = user;
    logger.log(restUser);
    res.status(200).json(restUser);
    return;
  } catch (error: any) {
    next(error);
  }
};

export const getUserByEmailOrUserHandler = async (req: RequestWithUsername, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = (req.query as IQueryInput) || {};
    const user = await getUserByEmailOrUser(userRepository, query);
    logger.log(user);
    res.status(200).json(user);
  } catch (error: any) {
    next(error);
  }
};
