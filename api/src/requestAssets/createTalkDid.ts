import axios from "axios";
const DID_API_KEY: string = process.env.DID_API_KEY as string;

export const createTalkDid = async (promtValue: string, userId: string) => {
     try {
      axios.post(
        "https://api.d-id.com/talks",
        {
          script: {
            type: "text",
            subtitles: "false",
            stitch: "false",
            input: promtValue,
            "provider": {
              "type": "microsoft",
              "voice_id": "es-PY-TaniaNeural"
            }
          },
          source_url: "https://i.imgur.com/EHaaqXR.png",
          webhook: "https://7f04-2803-2a00-4000-2152-4d5-2345-456e-8bcd.ngrok.io/api/alarm/didWebhook",
          user_data: userId,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Basic ${DID_API_KEY}`,
          },
        }
      );
     } catch (error) {
      console.log(error)
     }
};