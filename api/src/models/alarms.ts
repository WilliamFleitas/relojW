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
      alarmType: {
        type: DataTypes.ENUM("once", "daily", "custom"),
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
      enable: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      iaVideo: {
        type: DataTypes.BLOB,
        allowNull: true
      },
      goalType: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      goalDateEnd: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      goalNotes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    
    {
      timestamps: true,
      
    },
    
  );
};