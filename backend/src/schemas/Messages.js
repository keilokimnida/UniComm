const { DataTypes } = require("sequelize");
const db = require("../config/connection");

const { Accounts } = require("./Accounts");
const { Rooms } = require("./Rooms");

const Messages = db.define(
    "Messages",
    {
        message_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        fk_sender_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Accounts,
                key: "account_id"
            }
        },
        fk_room_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Rooms,
                key: "room_id"
            }
        }

    },
    {
        tableName: "messages",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

Accounts.hasMany(Messages, {
    foreignKey: "fk_sender_id",
    as: "sender"
});

Messages.belongsTo(Accounts, {
    foreignKey: "fk_sender_id",
    as: "account_sender"
});

Rooms.hasMany(Messages, {
    foreignKey: "fk_room_id",
    as: "room"
});

Messages.belongsTo(Rooms, {
    foreignKey: "fk_room_id",
    as: "account_room"
});

module.exports = { Messages };