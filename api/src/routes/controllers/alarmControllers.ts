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
    const customAlarmOnGptFailed = `There was an error with the Ia Message, contact to the support or try again later, we apologize for the problems`;
    const gptPrompt = body.goalType ? `Act as a personal assistant updating your user on an upcoming event. The user has shared a goal, described as "${description}", with the end date set as "${body.goalDateEnd}". Since it's the first day of this endeavor, craft a response that resonates with the sentiment conveyed in the goal description. Your response may include words of congratulations, advice, celebration, support, or comfort, depending on the user's goal. Make the interaction engaging and share a fascinating fact or tidbit related to the user's goal.` 
    : 
    `Imagine you are a personal assistant, and your task is to inform the user about an upcoming alarm. You'll be given "${description}" as the cause for the alarm and "${body.hour}" as the set alarm time. Begin by crafting a creatively engaging comment about the purpose of this alarm. For example, if the alarm is related to eating, you might say something like, '12:00 PM is the classic lunch hour, or it's a popular time for a snack.' Then, follow up with an insightful comment about the chosen alarm time, discussing typical activities or events that occur during that hour. Wrap up your response by recommending a random song from the top 50 charts that perfectly complements the user's intended activity. Ensure that the song genre aligns with the activity. If the alarm reason is in Spanish, respond in Spanish; otherwise, respond in English. Use only these two languages.`;
    
    let response ;
    try {
      response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: gptPrompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    } catch (error) {
      console.log(error);
    }
      
    
    
    const result = await Alarm.create({
      hour: body.hour,
      description: description,
      alarmDays: body.alarmDays,
      alarmType: body.alarmType,
      goalType: body.goalType,
      goalDateEnd: body.goalDateEnd,
      iaMessage: response && response.data.choices[0].text ? response.data.choices[0].text : customAlarmOnGptFailed
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

export const addAlarmNote = async (goalNote: string, goalNoteDate: string, id: string) => {
  try {
    const alarm = await Alarm.findByPk(id);
  if(!alarm){
    throw new Error('Alarm Not Found');
  }else {
    alarm.goalNotes = [...alarm.goalNotes, goalNote];
    alarm.goalNotesDates = [...alarm.goalNotesDates, goalNoteDate];
    await alarm.save();
    return "Note create successfully"
  }
  } catch (error: any) {
    
    throw new Error(error);
  }
  
};
