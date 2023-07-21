import { alarmType } from "../../typos";
const { Alarm, User } = require("../../database");
const { Configuration, OpenAIApi } = require("openai");
// const OpenAI = require("openai-api");

// const apiKey: string = process.env.APIKEYIA as string;
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export const createAlarm = async (body: alarmType) => {
  try {
    const prompt = `Vas a responder como si fueras un alarma que esta sonando, crea respuesta coherente siguiendo sentimiento del texto, al comienzo de respuesta agrega emoji para saber el sentimiento del texto, y comenzar diciendo razon de alarma, despues haz todo lo siguiente, basar comentario en la razon de alarma que va a ser ${body.description} y hora que va a ser ${body.hour}, ejemplo: si la razon de la alarma es comer haz un comentario sobre eso, si la hora es conocida por algo ejemplo "a las 12:00pm normalmente se almuerza o hay una actividad muy conocida a esa hora" haz un comentario sobre eso, terminar respuesta con una cancion aleatoria que este entre el top 50 para realizar ese tipo de actividades, TIENE QUE COINCIDIR EL GENERO CON LA ACTIVIDAD`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    
    // console.log(response.data.choices[0].text)
    const result = await Alarm.create({
      hour: body.hour,
      description: body.description,
      iaMessage: response.data.choices[0].text,
      alarmDays: body.alarmDays,
    });
    const user = await User.findByPk(body.userId);
    if (user) {
      await user.addAlarms(result);
    }
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
