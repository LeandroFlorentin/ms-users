import { Response, NextFunction } from 'express';
import { createUser, updateUser, getByIdUser, getUserByEmailOrUser, getUsers, deleteUser } from '&/application/use-cases/user';
import { userRepository } from '&/infrastructure/database/repositories/user.repository.impl';
import { cacheRepository } from '&/infrastructure/cache/repositories/cache.repository.impl';
import buildLogger from '&/infrastructure/logs';
import { RequestWithUsername, RequestWithUserBody, RequestWhenUpdateUser, RequestWithIdQuery, RequestGetUsers } from '&/types/express';

const logger = buildLogger('users');

export const createUserHandler = async (req: RequestWithUserBody, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await createUser(userRepository, cacheRepository, req.body);
    const { password, ...restUser } = user;
    logger.log(restUser);
    res.status(200).json(restUser);
    return;
  } catch (error: any) {
    next(error);
  }
};

export const updateUserHandler = async (req: RequestWhenUpdateUser, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user!;
    await updateUser(userRepository, cacheRepository, req.body, Number(req.query.id), user);
    logger.log(req.query.id);
    res.status(200).json({ message: 'Usuario actualizado con exito' });
  } catch (error) {
    next(error);
  }
};

export const getByIdUserHandler = async (req: RequestWithIdQuery, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userReq = req.user!;
    const user = await getByIdUser(userRepository, cacheRepository, Number(req.query.id), userReq);
    logger.log(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsersHandler = async (req: RequestGetUsers, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await getUsers(userRepository, req.query);
    logger.log(users);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler = async (req: RequestWithIdQuery, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    await deleteUser(userRepository, cacheRepository, Number(req.query.id), user);
    logger.log(`Usuario ${user.username} eliminado con éxito.`);
    res.status(200).json({ message: `Usuario ${user.username} eliminado con éxito.` });
  } catch (error) {
    next(error);
  }
};

export const getUserByEmailOrUserHandler = async (req: RequestWithUsername, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await getUserByEmailOrUser(userRepository, req.query);
    logger.log(user);
    res.status(200).json(user);
  } catch (error: any) {
    next(error);
  }
};
