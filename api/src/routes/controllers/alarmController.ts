

const { Alarm, User, AlarmAnalytic } = require("../../database");
const { Configuration, OpenAIApi } = require("openai");

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
  alarmType: string;
  goalType: boolean;
  goalDateEnd?: string;
}

export const createAlarm = async (body: alarmBodyType) => {
  try {

    const description = body.description;
    const customAlarmOnGptFailed = body.goalType ? `La meta es ${description} y el final de la meta es ${body.goalDateEnd}` : `La hora de alarma es ${body.hour} y tenemos: ${description}`;
    const gptPrompt = body.goalType ? `Vas a responder este prompt como una asistente personal que le esta informando un evento a su usuario, el usuario va a ingresar una meta la cual sera ${description} y el final de la meta va a ser esta fecha ${body.goalDateEnd}, es el dia 1 de la meta por lo cual hazle un comentario acorde a eso el sentimiento del comentario deberia basarse en la description de la meta, como felicitarlo, aconsejarlo, festejarlo, apoyarlo, confortarlo, respondele algo interesante a tu usuario` 
    : 
    `vas a responder este prompt actuando como un reloj alarma que habla al usuario, vas a tener " ${description} " que es la razón de la alarma y " ${body.hour} " que es la hora de la alarma, tu primer comentario debe ser acerca de la razón de la alarma, avisale al usuario que tiene una alarma para eso con algún comentario creativo, ejemplo: si la razon de la alarma es comer haz un comentario sobre eso, por algo ejemplo "a las 12:00pm normalmente se almuerza o hay una actividad muy conocida a esa hora" entonces haz un comentario sobre eso, despues haz otro comentario sobre la hora de la alarma por ejemplo: que actividades se hacen normalmente a esa hora, terminar respuesta con una cancion aleatoria que este entre el top 50 para realizar ese tipo de actividades, TIENE QUE COINCIDIR EL GENERO CON LA ACTIVIDAD.`;
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: gptPrompt,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log("gptResponse", response.data.choices)
    const result = await Alarm.create({
      hour: body.hour,
      description: description,
      alarmDays: body.alarmDays,
      alarmType: body.alarmType,
      goalType: body.goalType,
      goalDateEnd: body.goalDateEnd,
      iaMessage: response.data.choices[0].text ? response.data.choices[0].text : customAlarmOnGptFailed
    });
    const newAlarmAnalytic = await AlarmAnalytic.create({
      alarmId: result.id, 
    });
    result.alarmAnalytic = newAlarmAnalytic;
    await result.save();
    const user = await User.findByPk(body.userId);
    if (user) {
      await user.addAlarms(result);
      
       
      return result;
    } else {
      throw new Error("No user found");
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
