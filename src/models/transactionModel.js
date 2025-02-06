import Sequelize, { Model } from 'sequelize';

export default class Transaction extends Model {
    static init(sequelize) {
        super.init(
            {
                walletAddress: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                tokenMint: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                amount: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
                type: {
                    type: Sequelize.STRING,
                    allowNull: false, // Valores possíveis: "send" ou "receive"
                },
                timestamp: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                tableName: 'transactions',
            }
        );

        this.addHook('afterCreate', async (transaction) => {
            const transactions = await this.findAll({
                where: { walletAddress: transaction.walletAddress },
                order: [['timestamp', 'DESC']],
            });

            if (transactions.length > 15) {
                await this.destroy({
                    where: { id: transactions[15].id },
                });
            }
        });
    }

    static associate(models) {
        this.belongsTo(models.Wallet, {
            foreignKey: 'walletAddress',
            targetKey: 'address',
            as: 'wallet',
        });
    }
}
