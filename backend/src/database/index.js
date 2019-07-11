import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import { File, Meetup, User, Subscription } from '../app/models';

const models = [File, Meetup, User, Subscription];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
