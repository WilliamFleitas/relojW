import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Alarm",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      hour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      alarmDays: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      }
    },
    
    {
      timestamps: false,
      
    },
    
  );
};