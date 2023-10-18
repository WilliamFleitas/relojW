require("dotenv").config();
const { Sequelize } = require("sequelize");
const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require`, {
    logging: false
  }
);

const basename = path.basename(__filename);

const modelDefiners: any = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file: any) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
  )
  .forEach((file: any) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });


modelDefiners.forEach((model: any) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

sequelize?.models?.User?.hasMany(sequelize?.models?.Alarm, {
  foreignKey: "userId",
  as: "alarms",
});
sequelize?.models?.Alarm?.hasOne(sequelize?.models?.AlarmAnalytic, {
  foreignKey: "alarmId",
  as: "alarmAnalytic"
});
sequelize?.models?.AlarmAnalytic?.belongsTo(sequelize?.models?.Alarm, {
  foreignKey: "alarmId",
  as: "alarm"
})

sequelize?.models?.User?.hasOne(sequelize?.models?.UserPreferences, {
  foreignKey: "userId",
  as: "userPreferences"
});

sequelize?.models?.UserPreferences?.belongsTo(sequelize?.models?.User, {
  foreignKey: "userId",
  as: "user"
})

module.exports = {
  sequelize,
  ...sequelize?.models,
};