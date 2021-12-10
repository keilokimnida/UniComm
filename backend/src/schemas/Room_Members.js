const { DataTypes } = require("sequelize");
const db = require("../config/connection");

const { Accounts } = require("./Accounts");
const { Rooms } = require("./Rooms");

const Room_Members = db.define(
    "Room_Members",
    {
        room_members_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        fk_room_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Rooms,
                key: "room_id"
            }
        },
        fk_account_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Accounts,
                key: "account_id"
            }
        }
    },
    {
        tableName: "room_members",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

Accounts.hasMany(Rooms, {
    foreignKey: "fk_room_id",
    as: "room"
});

Rooms.belongsTo(Accounts, {
    foreignKey: "fk_room_id",
    as: "account"
});

Accounts.hasMany(Room_Members, {
    foreignKey: "fk_account_id",
    as: "room_member"
});

Room_Members.belongsTo(Accounts, {
    foreignKey: "fk_account_id",
    as: "account"
});

module.exports = { Room_Members };