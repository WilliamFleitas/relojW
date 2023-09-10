import { getTimeUntilNextExecution } from "../../cronUtil/cronWatcher";
import axios from "axios";
const { Alarm, User } = require("../../database");
const { Configuration, OpenAIApi } = require("openai");
const DID_API_KEY: string = process.env.DID_API_KEY as string;
// const apiKey: string = process.env.APIKEYIA as string;
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface alarmBodyType {
  userId: string;
  id: string;
  hour: string;
  description: string;
  alarmDays: string;
}

export const createAlarm = async (body: alarmBodyType) => {
  try {
    const prompt = `Responde este prompt actuando como un reloj alarma que habla al usuario, vas a tener " ${body.description} " que es la razón de la alarma y " ${body.hour} " que es la hora de la alarma, al comienzo de la respuesta agrega emoji para saber el sentimiento del texto, tu primer comentario debe ser acerca de la razón de la alarma, avisale al usuario que tiene una alarma para eso con algún comentario creativo, ejemplo: si la razon de la alarma es comer haz un comentario sobre eso, por algo ejemplo "a las 12:00pm normalmente se almuerza o hay una actividad muy conocida a esa hora" entonces haz un comentario sobre eso, despues haz otro comentario sobre la hora de la alarma por ejemplo: que actividades se hacen normalmente a esa hora, terminar respuesta con una cancion aleatoria que este entre el top 50 para realizar ese tipo de actividades, TIENE QUE COINCIDIR EL GENERO CON LA ACTIVIDAD`;

    const asda = getTimeUntilNextExecution();
    console.log("asdas", asda);
    
    const result = await Alarm.create({
      hour: body.hour,
      description: body.description,
      alarmDays: body.alarmDays,
    });
    const user = await User.findByPk(body.userId);
    console.log("alarmacreada", result);
    if (user) {
      await user.addAlarms(result);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      if (response.data.choices[0].text) {
        await result.update({ iaMessage: response.data.choices[0].text });
      }else {
        await result.update({ iaMessage: `La hora de alarma es ${body.hour} y tenemos: ${body.description}` });
      }
       await axios.post(
        "https://api.d-id.com/talks",
        {
          script: {
            type: "text",
            subtitles: "false",
            stitch: "false",
            input: response.data.choices[0].text ? response.data.choices[0].text : `La hora de alarma es ${body.hour} y tenemos: ${body.description}`,
            "provider": {
              "type": "microsoft",
              "voice_id": "es-PY-TaniaNeural"
            }
          },
          source_url: "https://i.imgur.com/EHaaqXR.png",
          webhook: "https://d3a7-2803-2a00-4000-2152-f96c-1ad7-5812-6557.ngrok.io/api/alarm/didWebhook",
          user_data: `${result.id}`,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Basic ${DID_API_KEY}`,
          },
        }
      );
      return result;
    } else {
      throw new Error("No user found");
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
