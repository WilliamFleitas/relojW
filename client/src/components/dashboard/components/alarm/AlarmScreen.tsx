import { useEffect, useRef, useState } from "react";
import { Typewriter } from "../../../utils/TypeWriter";
import chroniShakingHead from "../../../../assets/ChroniShakingHead.mp4";
import chroniClosedEyes from "../../../../assets/chroniClosedEyes.png";
import alarmAudio from "../../../../assets/ringtone-alarm.mp3";
import chroniLoading from "../../../../assets/ChroniAlarmLoading.mp4";
import "./AlarmScreen.css";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import AlarmNotes from "./alarmScreenAssets/AlarmNotes";
interface AlarmTypeProps {
  iaMessage?: string;
  description: string;
  iaVideo?: Blob | null;
  hour: string;
  goalType: boolean;
  goalDateEnd?: string;
  createdAt: string;
  id:string;
  iaVideoError?: string | null;
  onClose: (value: boolean) => void;
}

const notesArrayC = ["Asdasd ", "asdasd asda ", "asdasd asd as sda sa as d," , "asdasd as das", "asdas as d,","Asdasd ", "asdasd asda ", "asdasd asd as sda sa as d," , "asdasd as das", "asdas as d,","Asdasd ", "asdasd asda ", "asdasd asd as sda sa as d," , "asdasd as das", "asdas as d,"]
const notesDatesArrayC = [
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
  "25/22/2004",
]
const BackUrl = (import.meta.env.VITE_BACK_URL as string);
export const AlarmScreen = ({
  iaMessage,
  hour,
  description,
  iaVideo,
  onClose,
  goalType,
  goalDateEnd,
  createdAt,
  iaVideoError,
  id
}: AlarmTypeProps) => {
  const dispatch = useAppDispatch();
  const userAvatarVideo = window.localStorage.getItem("avatarVideo");
  const goalDateEndFormated = dayjs(goalDateEnd).format("HH/MM/DD");
  const goalDaysPassed = dayjs().diff(dayjs(createdAt), "day");
  const goalTotalDays = dayjs(goalDateEnd).diff(dayjs(createdAt), "days");
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [audioisPlaying, setAudioIsPlaying] = useState(false);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [iaVideoValue, setIaVideoValue] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startVideoRef = useRef<HTMLVideoElement | null>(null);
  const stopAlarmClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      startVideoRef?.current?.pause();
      setAudioIsPlaying(false);
    }
    if (iaVideo && goalType) {
      setVideoIsPlaying(true);
      setVideoLoading(false);
    }
    if (!iaVideo && goalType) {
      setVideoLoading(true);
    }
  };
 
  const handleStopVideo = () => {
    setVideoIsPlaying(false);
    setIaVideoValue(null);
  };
  useEffect(() => {
    if (iaVideo) {
      const blob = new Blob([iaVideo], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setIaVideoValue(url);
      if (!audioisPlaying) {
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
    const startVideo = startVideoRef.current;
    setVideoIsPlaying(false);
    if (audio) {
      audio.play();
      startVideo?.play();
      setAudioIsPlaying(true);
    }
    return () => {
      if (audio) {
        audio.pause();
        startVideo?.pause();
        setAudioIsPlaying(false);
      }
    };
  }, []);
 
  return (
    <div className="flex flex-col  select-none w-full h-screen  text-white z-50  text-start  items-center justify-between pt-10 px-6 ">
      <div className="flex flex-col  sm:flex-row  gap-y-4 sm:gap-y-0 sm:gap-x-8 w-full sm:w-fit text-start items-center justify-start h-full">
        <div className="relative flex flex-col sm:flex-row w-full h-fit text-center items-center justify-center sm:text-start sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col text-start items-center justify-center   sm:content-center">
            <div className={`outer-circle `}>
              <div className={`outer-circle`}></div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div
              className={`flex flex-col  text-start items-center justify-center ${
                !audioisPlaying && !videoIsPlaying && !videoLoading
                  ? "border-0"
                  : "border border-[#895953ce]"
              }   shadow-md select-none  shadow-[#895953ce] rounded-full z-50 absolute top-[-5px] sm:top-0  sm:left-0`}
            >
              {audioisPlaying && !videoIsPlaying ? (
                <video
                  className="object-cover w-full rounded-full h-full max-h-[250px] min-h-[250px] max-w-[250px] min-w-[250px] transform transition-colors delay-150 "
                  autoPlay={true}
                  loop
                  src={chroniShakingHead}
                  ref={startVideoRef}
                >
                  Your browser does not support video playback
                </video>
              ) : (
                <></>
              )}

              {!audioisPlaying && videoLoading && userAvatarVideo  ? (
                <div className="relative border-0">
                  <video
                    className="object-cover w-full rounded-full h-full max-h-[250px] min-h-[250px] max-w-[250px] min-w-[250px] transform transition-colors delay-150 "
                    autoPlay
                    loop
                    src={chroniLoading}
                  >
                    Your browser does not support video playback
                  </video>
                  <span className="absolute z-50 bg-red-500 w-full text-white animate-bounce top-[120px] flex text-start items-center justify-center">
                   {iaVideoError   ? iaVideoError : "Loading.."} 
                  </span>
                </div>
              ) : (
                <></>
              )}

              {iaVideoValue &&
              videoIsPlaying &&
              userAvatarVideo &&
              !audioisPlaying ? (
                <video
                  className=" object-cover w-full rounded-full h-full max-h-[250px] min-h-[250px] max-w-[250px] min-w-[250px] transform transition-colors delay-150 "
                  autoPlay
                  src={iaVideoValue}
                  ref={videoRef}
                  onEnded={() => handleStopVideo()}
                >
                  Your browser does not support video playback
                </video>
              ) : (
                <></>
              )}

              {!audioisPlaying && !videoIsPlaying && !videoLoading ? (
                <img
                  className="object-cover w-full rounded-full h-full max-h-[250px] min-h-[250px] max-w-[250px] min-w-[250px] transform transition-colors delay-150 "
                  src={chroniClosedEyes}
                  alt={"ChroniClosedEyes"}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="flex  flex-col w-full sm:w-fit text-start items-start justify-center  sm:text-start sm:items-center sm:justify-center  fh:bg-gradient-to-r from-[#613a36] to-[#302e2e]   fh:shadow-md fh:border fh:border-[#895953ce] select-none  rounded-md px-6 py-2 gap-4">
            <div className="flex flex-row text-[35px] md:text-[55px] w-full sm:w-fit  text-start items-center justify-center sm:justify-between ">
              <div className="flex flex-row ">
                <span className=" bg-gradient-to-r from-[#613a36] to-[#302e2e]  shadow-md border border-[#895953ce] select-none shadow-[#895953ce] rounded-md   p-2 ">
                  {hour.slice(0, 2)}
                </span>
                <p className="text-white m-auto ">H:</p>
              </div>
              <div className="flex flex-row ">
                <span className="bg-gradient-to-r from-[#613a36] to-[#302e2e]  shadow-md border border-[#895953ce] select-none shadow-[#895953ce] rounded-md   p-2 ">
                  {hour.slice(3, 5)}
                </span>
                <p className="text-white m-auto ">M:</p>
              </div>
              <div className="flex flex-row ">
                <span className="bg-gradient-to-r from-[#613a36] to-[#302e2e]  shadow-md border border-[#895953ce] select-none shadow-[#895953ce] rounded-md   p-2 ">
                  {hour.slice(6, 8)}
                </span>
                <p className="text-white m-auto ">S</p>
              </div>
            </div>

          <span className=" text-[20px] ">"{description}"</span>
        </div>
      </div>

      <div className="flex flex-col w-full h-fit gap-2 mt-6  rounded-md p-4  bg-gradient-to-r from-[#613a36] to-[#302e2e]  shadow-md border border-[#895953ce] text-zinc-400">
        {
          goalType && videoIsPlaying && iaMessage || !goalType && iaMessage ? 
          <Typewriter
          text={
            iaMessage
          }
        /> : <></>
        }
      
        {goalType ? (
          <div className="flex flex-col w-full gap-x-4 gap-y-2  ">
            
            <div className="flex flex-col w-full h-full text-start items-center justify-start text-[20px] text-zinc-400">
              {goalType ? (
                <>
                  <span className="w-full ">
                    Day {goalDaysPassed} of {goalTotalDays}, the end of the goal
                    is {goalDateEndFormated}.
                  </span>
                  <span className="flex flex-row w-full text-start items-center justify-start "></span>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-col w-full h-full gap-2">
             
              
              <AlarmNotes alarmId={id}/>
            </div>
              
            
          </div>
        ) : (
          <></>
        )}
        
      </div>

      <div>
        <audio autoPlay loop ref={audioRef}>
          <source src={alarmAudio} type="audio/mpeg" />
          Your browser does not support audio playback.
        </audio>
      </div>

      <div className="flex flex-col my-8 text-end items-end justify-end h-full">
        {audioisPlaying ? (
          <button
            className="bg-gradient-to-r from-[#613a36] to-[#302e2e]  shadow-md border border-[#895953ce] select-none shadow-[#895953ce]  animate-bounce h-14 w-14 rounded-full"
            onClick={stopAlarmClick} 
          >
            STOP
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-[#613a36] to-[#302e2e]  shadow-md border border-[#895953ce] select-none shadow-[#895953ce] animate-bounce h-14 w-14 rounded-full"
            onClick={() => onClose(false)}
          >
            ClOSE
          </button>
        )}
      </div>
    </div>
  );
};
