import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Typewriter } from "../utils/TypeWriter";
const socket = io("http://localhost:3001");
import "./AlarmScreen.css";
interface AlarmTypeProps {
  iaMessage: string;
  description: string;
  iaVideo: Blob;
  data: string;
  hour: string;
}

// const fetchData = async (
//   iaMessage: string,
//   audioRef: React.RefObject<HTMLAudioElement>
// ) => {
//   const voice = "21m00Tcm4TlvDq8ikWAM";
//   try {
//     const response = await axios.post(
//       "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0",
//       {
//         text: iaMessage,
//         model_id: "eleven_monolingual_v1",
//         voice_settings: {
//           stability: 0,
//           similarity_boost: 0,
//           style: 0.5,
//           use_speaker_boost: true,
//         },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           accept: "audio/mpeg",
//           "xi-api-key": "98abe736d164f534e57adbc52ed98276",
//         },
//         responseType: "arraybuffer",
//       }
//     );
//     console.log(response);
//     const audioData = response.data;
//     const audioBlob = new Blob([audioData], { type: "audio/mpeg" });
//     const audioUrl = URL.createObjectURL(audioBlob);
//     if (audioRef.current) {
//       audioRef.current.src = audioUrl;
//       audioRef.current.play();
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
export const AlarmScreen = ({
  iaMessage,
  data,
  hour,
  description,
  iaVideo,
}: AlarmTypeProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (iaVideo && videoRef.current) {
      const blob = new Blob([iaVideo], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      videoRef.current.src = url;
      videoRef.current.play();
      const handlePlay = () => {
        setIsPlaying(true);
        console.log("El video se está reproduciendo");
      };

      const handlePause = () => {
        setIsPlaying(false);
        console.log("El video se ha pausado");
      };

      videoRef.current.addEventListener("play", handlePlay);
      videoRef.current.addEventListener("pause", handlePause);
      return () => URL.revokeObjectURL(url);
    }
  }, []);
  console.log(iaMessage, iaVideo);
  return (
    <div className="flex flex-col  select-none w-full h-full text-white z-50  text-start  items-center justify-center space-y-8">
        <div className="flex flex-row w-full h-full text-start items-center justify-between gap-x-4">
          <div className="flex flex-col  py-4 px-6 stext-start items-center justify-center space-y-4 bg-[#b5611811] border border-[#f07d19a9]  shadow-md select-none  shadow-[#f07d19a9] rounded-md mr-auto">
            <div className="flex flex-row text-[35px] md:text-[55px]  text-start items-center justify-between">
              <div className="flex flex-row ">
              <span className=" bg-[#b5611845] border border-[#f07d19a9]  shadow-md select-none shadow-[#f07d19a9] rounded-md   p-2 ">
                {hour.slice(0, 2)}
              </span>
              <p className="text-white m-auto ">H:</p>
              </div>
              <div className="flex flex-row ">
              <span className=" bg-[#b5611845] border border-[#f07d19a9]  shadow-md select-none shadow-[#f07d19a9] rounded-md   p-2 ">
              {hour.slice(3, 5)}
              </span>
              <p className="text-white m-auto ">M:</p>
              </div>
              <div className="flex flex-row ">
              <span className=" bg-[#b5611845] border border-[#f07d19a9]  shadow-md select-none shadow-[#f07d19a9] rounded-md   p-2 ">
              {hour.slice(6, 8)}
              </span>
              <p className="text-white m-auto ">S:</p>
              </div>
              
            </div>
            <span className="text-[25px]">{description}</span>
          </div>
          {/* <div className="flex flex-col relative text-start items-center justify-center  border border-[#f07d19a9]  shadow-md select-none  shadow-[#f07d19a9] rounded-full  ">
           
            <video
              className="max-w-[30vw] min-w-[30vw] min-h-fit rounded-full "
              ref={videoRef}
              muted
              autoPlay
              controls
              width="640"
              height="360"
            >
              Your browser does not support video playback
            </video>
          </div> */}
          <div className="flex flex-col items-center content-center">
            <div className={`outer-circle ${!isPlaying ? "outer-circle-end": ""} `}>
            <div className={`outer-circle ${!isPlaying ? "outer-circle-end": ""} `}>
            </div>
             <span></span>
            <span></span>
            <span></span>
            <span></span> 
            </div>
            
            <div className="flex flex-col  text-start items-center justify-center  border border-[#f07d19a9]  shadow-md select-none  shadow-[#f07d19a9] rounded-full z-50 absolute right-[9.5vw]">
           
           <video
             className="max-w-[25vw] min-w-[25vw] min-h-fit rounded-full "
             ref={videoRef}
             autoPlay
             width="640"
             height="360"
           >
             Your browser does not support video playback
           </video>
         </div>
            </div> 
        </div>

        <div className="bg-[#b5611811] border border-[#f07d19a9]  shadow-md select-none  shadow-[#f07d19a9] rounded-md p-5 w-full h-full min-h-[150px]">
          <Typewriter text={iaMessage} />
        </div>
    </div>
  );
};
