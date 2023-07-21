import {Router, Request, Response } from "express";
const {User, Alarm} = require("../database");

const route = Router();



route.get("/useralarm/:id", async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const result = await User.findByPk(id, {

      include: [{ model: Alarm, as: "alarms" }],
    });
    res.status(200).send(result);  
  } catch (error: any) {
    console.log("error", error)
      res.status(400).send(error);
  }
});

// route.post("/verify", async (req: Request, res: Response) => {
//   const {body} = req;

//   try {
//     const result = await Alarm.findAll(
//       {
//         where: {UserId: body.id}
//       });
//     res.status(200).send(result);  
//   } catch (error: any) {
//       res.status(400).send(error);
//   }
// });

export default route;