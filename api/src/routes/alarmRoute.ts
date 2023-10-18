import { Router, Request, Response } from "express";
import { addAlarmNote, createAlarm } from "./controllers/alarmControllers";
import { io } from "../index";
const { Alarm} = require("../database");
import axios from "axios";
const { createAlarmValidate, enableAlarmValidate, createAlarmNoteValidate } = require("../validators/alarmValidator");
const route = Router();

route.get('/getNotes/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Alarm.findByPk(id, {
      attributes: ['goalNotes', 'goalNotesDates'],
    });
    if (!result) {
      return res.status(404).json("No alarm Found");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
route.delete('/deleteAlarm/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Alarm.destroy({
      where: {
        id: id
      },
    });
    if(result === 1){
      res.status(200).json({ message: 'Alarm cleared successfully' });
    }else {
      throw new Error("There was an error deleting the alarm");
    }
  } catch (error) {
    res.status(500).json({ message: 'There was an error deleting the alarm' });
  }
});


route.put("/enable/:id", enableAlarmValidate, async (req: Request, res: Response) => {
  const {enable} = req.body;
  try {
    
     await Alarm.update({enable: enable}, {
      where: {
        id: req.params.id,
      },
    });
    
    res.status(200).send("Alarm updated correctly");
  } catch (error: any) {
    res.status(400).send(`there was an error updating the alarm ${error.response}`)
    
  }
});

route.put("/addNote/:id", createAlarmNoteValidate, async (req: Request, res: Response) => {
  const {id} = req.params;
  const {goalNote, goalNoteDate} = req.body;
  try {
    const result = await addAlarmNote(goalNote, goalNoteDate, id);
    if(result){
      res.status(200).send(result);
    }
  } catch (error: any) {
    res.status(400).send(error.response);
  }
});

route.post("/didWebhook", async (req: Request, res: Response) => {
  const body = req;
 
try {
  if(body.body.status === "done"){
    // const response = await axios.get(body.body.result_url, { responseType: 'stream' });
    const response = await axios.get(body.body.result_url, { responseType: 'arraybuffer' });
    if(response){
      io.to(`user-${body.body.user_data}`).emit("iaVideoResult", response.data);
    }
    // const findAlarm = await Alarm.findByPk(body.body.user_data);
    // if (findAlarm) {
    //   await findAlarm.update({ iaVideo: response.data});
    // }
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
