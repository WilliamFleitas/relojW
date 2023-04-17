import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "User",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      privilege: {
        type: DataTypes.ENUM("none", "user", "admin"),
        allowNull: false,
        defaultValue: "none"
      }
    },
    
    {
      timestamps: false,
      
    },
    
  );
};