
import { Router, Request, Response } from "express";
const { Alarm, sequelize } = require("../database");
const route = Router();

route.get("/useralarm/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const currentDate = new Date();
    const currentTimeString = currentDate.toLocaleTimeString('en-US', { hour12: false });
  
    const result = await Alarm.findAll({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["iaVideo", "iaMessage"],
      },
      order: [
        [sequelize.literal(`ABS(EXTRACT(EPOCH FROM (hour::time - '${currentTimeString}'))) DESC`)],
      ],
    });
    console.log("result", result);
    res.status(200).send(result);
  } catch (error: any) {
    console.log("error", error);
    res.status(400).send(error);
  }
});

export default route;
