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
        fk_requester_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Accounts,
                key: "account_id"
            }
        },
        fk_addressee_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Accounts,
                key: "account_id"
            }
        },
        status: {
            type: DataTypes.ENUM(["pending", "accepted"]),
            allowNull: false
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
    foreignKey: "fk_requester_id",
    as: "requester"
});

Friendships.belongsTo(Accounts, {
    foreignKey: "fk_requester_id",
    as: "account_requester"
});

Accounts.hasMany(Friendships, {
    foreignKey: "fk_addressee_id",
    as: "addressee"
});

Friendships.belongsTo(Accounts, {
    foreignKey: "fk_addressee_id",
    as: "account_addressee"
});