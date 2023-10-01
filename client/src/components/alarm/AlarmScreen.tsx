import  { useEffect, useRef, useState } from "react";
import { Typewriter } from "../utils/TypeWriter";
import NoVideoImg from "../../assets/shakinghead.gif";
import ChroniClosedEyes from "../../assets/chroniClosedEyes.png";
import AlarmAudio from "../../assets/ringtone-alarm.mp3";
import ChroniLoading from "../../assets/ChroniAlarmLoading.mp4";
import "./AlarmScreen.css";
interface AlarmTypeProps {
  iaMessage?: string;
  description: string;
  iaVideo?: Blob | null;
  data: string;
  hour: string;
  onClose: (value: boolean) => void;
}

export const AlarmScreen = ({
  iaMessage,
  data,
  hour,
  description,
  iaVideo,
  onClose,
}: AlarmTypeProps) => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [audioisPlaying, setAudioIsPlaying] = useState(false);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [iaVideoValue, setIaVideoValue] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stopAlarmClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioIsPlaying(false);
    }
    
    if (iaVideo) {
      setVideoIsPlaying(true);
      setVideoLoading(false);
      console.log("El video se está reproduciendo");
    }
    if(!iaVideo){
      setVideoLoading(true);
    }
    //si iavideo no tiene nada podes meter un video de espera aca
  };
 const handleStopVideo = () => {
  console.log("videoStoped");
  setVideoIsPlaying(false);
  setIaVideoValue(null);
 }; 
  useEffect(() => {
    if (iaVideo) {
      const blob = new Blob([iaVideo], { type: "video/mp4" });
        console.log("iavideollegousefect");
        const url = URL.createObjectURL(blob);
        setIaVideoValue(url);
      if(!audioisPlaying){
        setVideoIsPlaying(true);
        setVideoLoading(false);
      }
      
      return () => {
        URL.revokeObjectURL(url);
        setVideoIsPlaying(false);
        setIaVideoValue(null);
      };
    }
  }, [iaVideo]);
 
  
  useEffect(() => {
    const audio = audioRef.current;
    setVideoIsPlaying(false);
    if (audio) {
      audio.play();
      setAudioIsPlaying(true);
    }
    return () => {
      if (audio) {
        audio.pause();
        setAudioIsPlaying(false);
      }
    };
  }, []);

  console.log(videoIsPlaying, audioRef);
  return (
    <div className="flex flex-col  select-none w-full h-full text-white z-50  text-start  items-center justify-center sm:space-y-8">
      <div className="flex flex-col sm:flex-row w-full h-full text-start items-center justify-between gap-x-4">
        <div className="flex flex-col w-full sm:w-fit  sm:mb:0 py-4 px-6 stext-start items-center justify-center space-y-4 bg-[#1615149a] shadow-md border border-[#b56118] select-none  rounded-md mr-auto mb-6 sm:mb-0">
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
              <p className="text-white m-auto ">S</p>
            </div>
          </div>
          <span className="text-[25px]">{description}</span>
        </div>

        <div className="flex flex-col text-start items-center justify-center sm:mb-6  sm:content-center">
          <div
            className={`outer-circle ${
              !videoIsPlaying ? "outer-circle-end" : ""
            } `}
          >
            <div
              className={`outer-circle ${
                !videoIsPlaying || !audioisPlaying ? "outer-circle-end" : ""
              } `}
            ></div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`flex flex-col  text-start items-center justify-center ${!audioisPlaying && !videoIsPlaying && !videoLoading ? "border-0" : "border border-[#f07d19a9]"}   shadow-md select-none  shadow-[#f07d19a9] rounded-full z-50 absolute top-[200px] sm:top-[50px] lg:right-[152px]`}>
            {audioisPlaying && !videoIsPlaying  ? (
              <img
                className=" w-full h-full max-h-[250px] min-h-[250px] max-w-[250px] min-w-[250px] rounded-full transform transition-colors delay-150 "
                src={NoVideoImg}
                alt={NoVideoImg}
              />
            ) : (
              <></>
            )}
            
            {  !audioisPlaying && videoLoading ? (
              <div className="relative border-0">
              <video
                className=" w-full rounded-full h-full max-h-[250px] min-h-[250px] max-w-[250px] min-w-[250px] transform transition-colors delay-150  border-0"
                autoPlay
                loop
                src={ChroniLoading}
              > 
                Your browser does not support video playback
              </video>
              <span className="absolute z-50 text-white animate-bounce top-[115px] right-[90px]">Loading..</span> 
              </div>
            ) : <></>}
            { iaVideoValue && videoIsPlaying && !audioisPlaying ? (
              <video
                className=" w-full rounded-full h-full max-h-[250px] min-h-[250px] max-w-[250px] min-w-[250px] transform transition-colors delay-150 "
                autoPlay
                src={iaVideoValue}
                ref={videoRef}
                onEnded={() => handleStopVideo()}
              >
                Your browser does not support video playback
              </video> 
            ) : <></>}
            {
              !audioisPlaying && !videoIsPlaying && !videoLoading ? 
              <img
                className=" transform transition-colors delay-150 w-full h-full max-h-[195px] object-cover min-h-[195px] max-w-[195px] min-w-[195px] rounded-full scale-125  sm:absolute sm:top-[29px] lg:right-[25px] overflow-hidden"
                src={ChroniClosedEyes}
                alt={"ChroniClosedEyes"}
              /> : <></>
            }
          </div>
        </div>
      </div>

      <div className="bg-[#1615149a] shadow-md border border-[#b56118]   select-none  rounded-md p-5 w-full h-full min-h-[150px]">
        <Typewriter
          text={
            iaMessage
              ? iaMessage
              : "There was an error with the avatar stream, replacing avatar for an alarm sound, we apologize for the problems"
          }
        />
      </div>
      <div>
        <audio autoPlay loop ref={audioRef}>
          <source src={AlarmAudio} type="audio/mpeg" />
          Your browser does not support audio playback.
        </audio>
      </div>

      <div className="absolute bottom-2">
        {audioisPlaying ? (
          <button
            className="bg-[#b5611811] border border-[#f07d19a9]  animate-bounce h-14 w-14 rounded-full"
            onClick={stopAlarmClick}
          >
            STOP
          </button>
        ) : (
          <button
            className="bg-[#b5611811] border border-[#f07d19a9]  animate-bounce h-14 w-14 rounded-full"
            onClick={() => onClose(false)}
          >
            ClOSE
          </button>
        )}
      </div>
    </div>
  );
};
