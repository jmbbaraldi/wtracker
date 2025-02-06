import Sequelize from 'sequelize';
import databaseConfig from '../config/db.js';
import Wallet from '../models/walletModel.js';
import Transaction from '../models/transactionModel.js';

const models = [Wallet, Transaction];

const connection = new Sequelize(databaseConfig.development);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
