import {Router, Request, Response } from "express";
const {Alarm} = require("../database");

const route = Router();



route.get("/useralarm/:id", async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const result = await Alarm.findAll(
      {
        where: {UserId: id}
      });
    res.status(200).send(result);  
  } catch (error: any) {
      res.status(400).send(error);
  }
});


export default route;