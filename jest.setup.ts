import { createTestUser } from '&/infrastructure/database/helpers';
import { sequelize } from '&/infrastructure/database/index';

beforeAll(() => {
  sequelize.sync({ force: false });
  // await createTestUser();
});
