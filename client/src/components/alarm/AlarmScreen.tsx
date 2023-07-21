import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Modal from "../utils/Modal";
import { Typewriter } from "../utils/TypeWriter";
import axios from "axios";
import ChroniPP from "../../assets/Chroni.png";
import SpectrumG from "../../assets/Waveform.gif";
const elevenApiKey = import.meta.env.VITE_ELEVEN_API_KEY as string;
const socket = io("http://localhost:3001");

interface AlarmTypeProps {
  iaMessage: string;
  description: string;
  data: string;
  hour: string;
}
export const AlarmScreen = ({
  iaMessage,
  data,
  hour,
  description,
}: AlarmTypeProps) => {
  const voice = "21m00Tcm4TlvDq8ikWAM";
  const audioRef = useRef<HTMLAudioElement>(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://api.elevenlabs.io/v1/text-to-speech/9Zoq7MR3PaVRNOPx4CWC?optimize_streaming_latency=0",
  //         {
  //           "text": iaMessage,
  //           "model_id": "eleven_monolingual_v1",
  //           "voice_settings": {
  //             "stability": 0,
  //             "similarity_boost": 0,
  //             "style": 0.5,
  //             "use_speaker_boost": false
  //           }
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "audio/mpeg",
  //             'xi-api-key': elevenApiKey,
  //           },
  //           responseType: "arraybuffer",
  //         }
  //       );

  //       const audioData = response.data;
  //       const audioBlob = new Blob([audioData], { type: "audio/mpeg" });
  //       const audioUrl = URL.createObjectURL(audioBlob);
  //       if(audioRef.current){
  //         audioRef.current.src = audioUrl;
  //         audioRef.current.play();
  //       }

  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="flex flex-col  select-none w-full h-full text-white z-50  p-5 text-start  items-center justify-center">
      <div className="flex flex-row text-start items-center justify-center gap-x-4">

        <div className="flex flex-col w-full select-none">
          <div className="flex flex-col mb-4 p-5  stext-start items-center justify-center space-y-4 bg-[#b5611811] border border-[#f07d19a9]  shadow-md select-none  shadow-[#f07d19a9] rounded-md mr-auto">
            <div className="flex flex-row gap-x-2 ">
              <span className=" bg-[#b5611845] border border-[#f07d19a9]  shadow-md select-none shadow-[#f07d19a9] rounded-md  text-[55px] py-3 px-2  ">
                {hour.slice(0, 2)}
              </span>
              <p className="text-white text-[55px] m-auto">H :</p>
              <span className="bg-[#b5611845] flex border border-[#f07d19a9]  shadow-md select-none  shadow-[#f07d19a9] rounded-md  text-[55px] py-3 px-3  ">
                {hour.slice(3, 5)}
              </span>
              <p className="text-white text-[55px] m-auto">M :</p>
              <span className="bg-[#b5611845] flex  border border-[#f07d19a9]  shadow-md select-none shadow-[#f07d19a9] rounded-md  text-[55px] py-3 px-3 ">
                {hour.slice(6, 8)}
              </span>
              <p className="text-white text-[55px] m-auto">S</p>
            </div>
            <span className="text-[25px]">{description}</span>
          </div>

          <div className="bg-[#b5611811] border border-[#f07d19a9]  shadow-md select-none  shadow-[#f07d19a9] rounded-md p-5 min-w-[300px] min-h-[300px]">
            <Typewriter text={iaMessage} />
            <audio ref={audioRef} />
          </div>
        </div>
        <div className="flex flex-col relative text-start items-center justify-center mt-auto border border-[#f07d19a9]  shadow-md select-none  shadow-[#f07d19a9] rounded-md">
        <img draggable={false} src={ChroniPP} className="w-[300px] h-[300px] rounded-md" />
        <div className="absolute text-amber-400 bg-amber-500 bg-opacity-[10%]">
        
        <img draggable={false} src={SpectrumG} className="w-[300px] h-[300px] rounded-md " />
        </div>
      </div>
      </div>

      
    </div>
  );
};
