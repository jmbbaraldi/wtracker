import Sequelize, { Model } from 'sequelize';

export default class Wallet extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                },
                address: {
                    type: Sequelize.STRING,
                    unique: true,
                    defaultValue: '',
                },
                emoji: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                },
                tag: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                },
                favorite: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                tableName: 'Wallets',
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Transaction, {
            foreignKey: 'walletAddress',
            sourceKey: 'address',
            as: 'transactions',
        });
    }
}
