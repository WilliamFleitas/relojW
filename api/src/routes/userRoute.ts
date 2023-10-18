
import { Router, Request, Response } from "express";
import { changeAvatarVideoValue,  } from "./controllers/userControllers";
import { tokenValidation } from "../libs/tokenValidation";
const {updateAvatarPreferenceValidate} = require("../validators/userValidator");
const { Alarm, sequelize} = require("../database");
const route = Router();

route.get("/useralarm/:id", tokenValidation, async (req: Request, res: Response) => {
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
    res.status(400).send(error);
  }
});


route.put("/enableAvatar/:id",updateAvatarPreferenceValidate, async (req: Request, res: Response) => {
  const {id} = req.params;
  const {avatarVideo, didKey} = req.body;
  try {
    const result = await changeAvatarVideoValue(id, avatarVideo, didKey);
    res.status(200).send(result);
  } catch (error: any) {
    res.status(400).send(`there was an error updating the preferences ${error.response}`) 
  }

});
export default route;
