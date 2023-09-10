import { Router, Request, Response } from "express";
import { createAlarm } from "./controllers/alarmController";
const { Alarm} = require("../database");
import axios from "axios";
const { createAlarmValidate } = require("../validators/alarmValidator");
const route = Router();


route.post("/didWebhook", async (req: Request, res: Response) => {
    const body = req;
   
 try {
    console.log(body.body)
    if(body.body.status === "done"){
      // const response = await axios.get(body.body.result_url, { responseType: 'stream' });
      const response = await axios.get(body.body.result_url, { responseType: 'arraybuffer' });
      const findAlarm = await Alarm.findByPk(body.body.user_data);
      console.log("arraybuffer", response.data, "findalarm", findAlarm);
      if (findAlarm) {
        await findAlarm.update({ iaVideo: response.data});
      }
      // if (response.headers['content-type'] === 'video/mp4') {
      //   const fileName = 'video.mp4'; 
      //   const fileStream = fs.createWriteStream(fileName);
      //   response.data.pipe(fileStream);
  
      //   fileStream.on('finish', () => {
      //     console.log(`Archivo ${fileName} descargado con éxito.`);
      //     res.status(200).send('Archivo descargado con éxito.');
      //   });
  
      //   fileStream.on('error', (err: any) => {
      //     console.error('Error al descargar el archivo:', err);
      //     res.status(500).send('Error al descargar el archivo.');
      //   });
      // } else {
      //   console.error('La respuesta no es un archivo de video MP4.');
      //   res.status(500).send('La respuesta no es un archivo de video MP4.');
      // }

    }
    res.status(200).send("ok");
 } catch (error) {
   console.log(error);
    res.status(400).send(error); 
 }
});

route.post(
  "/createalarm",
  createAlarmValidate,
  async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const result = await createAlarm(body);

      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
);

export default route;
