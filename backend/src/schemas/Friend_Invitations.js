const { DataTypes } = require("sequelize");
const db = require("../config/connection");

const { Accounts } = require("./Accounts");

const Friend_Invitations = db.define(
    "Friend_Invitations",
    {
        invitation_id: {
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
        }
    },
    {
        tableName: "friend_invitations",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at"
    }
);

module.exports = { Friend_Invitations };

Accounts.hasMany(Friend_Invitations, {
    foreignKey: "fk_requester_id",
    as: "requester"
});

Friend_Invitations.belongsTo(Accounts, {
    foreignKey: "fk_requester_id",
    as: "account_requester"
});

Accounts.hasMany(Friend_Invitations, {
    foreignKey: "fk_addressee_id",
    as: "addressee"
});

Friend_Invitations.belongsTo(Accounts, {
    foreignKey: "fk_addressee_id",
    as: "account_addressee"
});