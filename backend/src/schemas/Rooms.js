const { DataTypes } = require("sequelize");
const db = require("../config/connection");

const Rooms = db.define(
    "Rooms",
    {
        room_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        room_type: {
            type: DataTypes.ENUM(["private", "group"]),
            allowNull: false
        }
    },
    {
        tableName: "rooms",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

module.exports = { Rooms };