
import { Router, Request, Response } from "express";
const { Alarm, sequelize} = require("../database");
const route = Router();

route.get("/useralarm/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
  
    const result = await Alarm.findAll({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["iaVideo", "iaMessage"],
      },
      include: [
        {
          model: sequelize.models.AlarmAnalytic,
          as: "alarmAnalytic", 
          attributes: ["actualWeek", "lastWeek", "timesSounded"],
        },
      ],
      order: [
        [
          sequelize.literal(
            "EXTRACT(HOUR FROM CAST(hour AS TIME)) * 60 + EXTRACT(MINUTE FROM CAST(hour AS TIME))"
          ),
          "ASC",
        ],
      ],
    });
    res.status(200).send(result);
  } catch (error: any) {
    console.log("error", error);
    res.status(400).send(error);
  }
});

export default route;
