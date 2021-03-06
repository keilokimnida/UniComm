const { DataTypes } = require("sequelize");
const db = require("../config/connection");

const { Accounts } = require("./Accounts");

const Friendships = db.define(
    "Friendships",
    {
        friendship_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        fk_account_id_1: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Accounts,
                key: "account_id"
            }
        },
        fk_account_id_2: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Accounts,
                key: "account_id"
            }
        }
    },
    {
        tableName: "friendships",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at"
    }
);

module.exports = { Friendships };

Accounts.hasMany(Friendships, {
    foreignKey: "fk_account_id_1",
    as: "friendship_1"
});

Friendships.belongsTo(Accounts, {
    foreignKey: "fk_account_id_1",
    as: "account_friend_1"
});

Accounts.hasMany(Friendships, {
    foreignKey: "fk_account_id_2",
    as: "friendship_2"
});

Friendships.belongsTo(Accounts, {
    foreignKey: "fk_account_id_2",
    as: "account_friend_2"
});