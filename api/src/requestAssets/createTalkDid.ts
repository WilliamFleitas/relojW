import axios from "axios";
const DID_API_KEY: string = process.env.DID_API_KEY?.toString() as string;
const webhook_url: string = process.env.DID_WEBHOOK_URL?.toString() as string;
export const createTalkDid = async (promtValue: string, userId: string) => {
     try {
     await axios.post(
        "https://api.d-id.com/talks",
        {
          script: {
            type: "text",
            subtitles: "false",
            stitch: "true",
            input: promtValue,
            "provider": {
              "type": "microsoft",
              "voice_id": "es-PY-TaniaNeural"
            }
          },
          source_url: "https://i.imgur.com/EHaaqXR.png",
          webhook: `${webhook_url}/api/alarm/didWebhook`,
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
     } catch (error: any) {
      console.log("createTalk", error)
      throw new Error(error)
     }
};