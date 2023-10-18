import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "UserPreferences",
    {
      
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      language: {
        type: DataTypes.ENUM("spanish", "english"),
        allowNull: true,
        defaultValue: "english"
      },
      avatarVideo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      didKey: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      }
    },
    {
      timestamps: false,
      
    },
    
  );
};