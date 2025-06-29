import { createObjectZod, z } from '&/infrastructure/zod/index';

const options = {
  email: z.string().min(1, { message: 'El email es obligatorio' }).email({ message: 'Formato de email inválido.' }),
  username: z.string().min(1, { message: 'El nombre de usuario es obligatorio.' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, { message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.' }),
};

export default createObjectZod(options);
