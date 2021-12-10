const { DataTypes } = require("sequelize");
const db = require("../config/connection");

const Accounts = db.define(
    "Accounts",
    {
        account_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        pfp_type: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    },
    {
        tableName: "accounts",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at"
    }
);

module.exports = { Accounts };