/**
 * This script is responsible for create the SQL tables.
 * Run it via `npm run db:create`.
 */
require('dotenv').config();

import MigrationService from '../../services/migrationService';
import models from '../models';

const options = {
  database: models(),
};

const sequelize = options.database.sequelize;

sequelize
  .query('SET FOREIGN_KEY_CHECKS = 0')
  .then(() => {
    console.log(`FOREIGN_KEY_CHECKS = 0`);
    sequelize
      .query('DROP TABLE IF EXISTS `users`')
      .then(() => {
        console.log('Table `users` was dropped.');
        sequelize
          .query('SET FOREIGN_KEY_CHECKS = 1')
          .then(() => {
            console.log('FOREIGN_KEY_CHECKS = 1');
            sequelize
              .sync()
              .then(() => {
                console.log('Sync OK');
                new MigrationService(options)
                  .convertImages()
                  .then(() => {
                    process.exit();
                  })
                  .catch((error) => {
                    console.log(error);
                    process.exit(1);
                  });
              })
              .catch((error) => {
                console.error(error);
                process.exit(1);
              });
          })
          .catch((error) => {
            console.log(error);
            process.exit(1);
          });
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
