import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './interface/routes/index';
import { errorMiddleware } from './interface/middlewares/error.middleware';
import { mainConfig } from './config';
import { sequelize } from './infrastructure/database';
import implementaDocumentation from './infrastructure/documentation/documentation';

const { PORT } = mainConfig;

const app = express();
app.use(json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);
app.use(errorMiddleware);

async function initializateApp() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    app.listen(PORT, () => {
      implementaDocumentation(app, PORT);
      console.log(`Servidor funcionando en puerto ${PORT}`);
    });
  } catch (error) {
    await sequelize.close();
    console.log('Error al intentar conectar con la base de datos: ', error);
    process.exit(1);
  }
}

initializateApp();
