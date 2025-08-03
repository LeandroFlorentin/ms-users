import { UserRepository } from '&/domain/user/user.repository';
import userSchema from '&/infrastructure/validation/schemas/user/create.zod';
import { IUserInput } from '../../dtos/users/users.dto';
import { APIError, hashPassword } from '&/shared';
import { ICacheRepository } from '&/domain/cache/cache.repository';
import { EmailRepository } from '&/domain/email/email.repository';
import { urlConfig } from '&/config';
import { generateToken } from '&/shared';

export const createUser = async (userRepo: UserRepository, cacheRepository: ICacheRepository, emailRepository: EmailRepository, body: IUserInput) => {
  userSchema.parse(body);

  const existingUser = await userRepo.findByEmailAndUsername({ email: body.email, username: body.username });
  if (existingUser) throw new APIError(400, 'El usuario ya existe con el email o nombre de usuario proporcionado.');

  body.password = await hashPassword(body.password);

  const savedUser = await userRepo.create(body);

  const token = generateToken({ id: savedUser.id, username: savedUser.username, email: savedUser.email });

  const structureEmail = `
    <div>
      <h1>Gracias por registrarte ${savedUser.username}</h1>
      <p>Para poder seguir con el proceso debes dar confirmar en el siguiente botón, así se activará tu usuario</p>
      <a href="${urlConfig.url + urlConfig.port + '/users/activate?token=' + token}" 
        style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;"
        target="_blank">
        Confirmar
      </a>
    </div>
  `;

  await emailRepository.sendEmail(savedUser.email, 'Bienvenido', structureEmail);

  await cacheRepository.setValue(savedUser.username, JSON.stringify(savedUser));
  await cacheRepository.setValue(savedUser.email, JSON.stringify(savedUser));

  return savedUser;
};
