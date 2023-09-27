import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "AlarmAnalytic",
    {
      
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      actualWeek : {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: [0,0,0,0,0,0,0]
      },
      lastWeek : {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: [0,0,0,0,0,0,0]
      },
      timesSounded: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
    },
    {
      timestamps: false,
      
    },
    
  );
};