import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Alarm",
    {
      
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
      iaMessage: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      alarmDays: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      iaVideo: {
        type: DataTypes.BLOB,
        allowNull: true
      },
    },
    
    {
      timestamps: false,
      
    },
    
  );
};