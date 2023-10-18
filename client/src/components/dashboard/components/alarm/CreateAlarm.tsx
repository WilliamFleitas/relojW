import React, { useEffect, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getUserAlarms } from "../../../../redux/alarmSlice/alarmAction";
import dayjs from "dayjs";
import { IUserType } from "../../../../redux/userSlice";
import {GiStairsGoal} from "react-icons/gi";
import {TfiAlarmClock} from "react-icons/tfi";
import { REPEAT_ALARM_OPTIONS } from "./AlarmLayout";
import { socket } from "../../DashboardPage";
import CreateAlarmSkeleton from "../../../loading/CreateAlarmSkeleton";

const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u);

const AlarmSchema = z.object({
  hour: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Enter a valid time",
    })
    .min(5, { message: "Enter a time" })
    .max(5, { message: "Enter a valid time" }),
  description: z.preprocess(
    trimString,
    z
      .string()
      .nonempty({ message: "Description needed" })
      .max(60, { message: "60 characters max" })
  ),
});

const GoalSchema = z.object({
  goalDateEnd: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nonempty({ message: "Goal Date End Value needed" }),
});

const CombinedAlarmAndGoalSchema = AlarmSchema.merge(GoalSchema);
type alarmType = z.infer<typeof AlarmSchema>;
type goalType = z.infer<typeof CombinedAlarmAndGoalSchema>;

type CombinedSchemaType = alarmType | goalType;
interface days {
  0: boolean;
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
  5: boolean;
  6: boolean;
}
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const customDaysObject = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
};
interface CreateAlarmTypeProps {
  user: IUserType | null;
}
export const CreateAlarm = ({ user }: CreateAlarmTypeProps) => {
  const BackUrl = import.meta.env.VITE_BACK_URL as string;
  const dispatch = useAppDispatch();

  const [goalTypeSwitch, setGoalTypeSwitch] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<any>({
    resolver: zodResolver(
      goalTypeSwitch ? CombinedAlarmAndGoalSchema : AlarmSchema
    ),
  });
  const input_labels = {
    alarmReason: goalTypeSwitch ? "Goal Reason" : "Alarm Reason",
    alarmDays: goalTypeSwitch ? "Goal Days" : "Alarm Days",
    alarmHour: goalTypeSwitch ? "Goal Hour" : "Alarm Hour",
    goalDateEnd: "Goal End Date"
  }
  
  const { alarmList, userAlarmsLoading} = useAppSelector((state) => state.alarm);

  const [customDays, setCustomDays] = useState<days>(customDaysObject);
  const [arrayDays, setArrayDays] = useState<number[]>([]);
  const [personalizedAlarm, setPersonalizedAlamr] = useState<boolean>(false);
  const [customAlarmError, setCustomAlarmError] = useState<boolean>(false);
  const [repeatAlarmType, setRepeatAlarmType] = useState<string>(
    REPEAT_ALARM_OPTIONS.once
  );
  const handleDays = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLButtonElement;
    setCustomDays({
      ...customDays,
      [target.value]: event.currentTarget.checked,
    });
  };

  const handleArrayDays = () => {
    setCustomAlarmError(false);

    const daysSelected: number[] = [];
    for (const [key, value] of Object.entries(customDays)) {
      if (value === true) {
        daysSelected.push(Number(key));
      }
    }
    if (daysSelected.length <= 0) {
      setCustomAlarmError(true);
      return;
    }

    setArrayDays(daysSelected);
    setPersonalizedAlamr(false);
  };
  const handlePerzonalizedAlarm = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setArrayDays([]);
    const value = event.target.value;
    setRepeatAlarmType(value);
    setPersonalizedAlamr(false);
    switch (value) {
      case REPEAT_ALARM_OPTIONS.daily:
        setArrayDays([0, 1, 2, 3, 4, 5, 6]);
        break;
      case REPEAT_ALARM_OPTIONS.custom:
        setPersonalizedAlamr(!personalizedAlarm);
        break;
      default:
        break;
    }
  };
  

  const handleOnSubmit = handleSubmit(async ({ hour, description, goalDateEnd }) => {
    const goalDateFormated =  goalDateEnd;
    const fechaActual = dayjs().format("d");
    const findDuplicateAlarm = alarmList?.find((item) => {
      const parseActualHour = hour.split(":");
      const objectHour = item.hour.split(":");
      return (
        objectHour[0] === parseActualHour[0] &&
        objectHour[1] === parseActualHour[1]
      );
    });
    if (findDuplicateAlarm) {
      alert("Duplicate Alarm");
      return;
    }
    const newObj = {
      hour,
      description,
      alarmDays: arrayDays.length ? arrayDays : [Number(fechaActual)],
      userId: user?.id,
      alarmType: repeatAlarmType,
      goalType: goalTypeSwitch,
      goalDateEnd: goalDateFormated
    };
    axios
      .post(`${BackUrl}/api/alarm/createalarm`, newObj)
      .then((result) => {
        socket.emit("resetCronTask", (error: any) => {
          if (error) {
            console.error( error);
          } 
        });
        reset();
        dispatch(getUserAlarms(user?.id as string));
      })
      .catch((err) => {
        console.log( err);
      });
  });

  useEffect(()=>{
   reset()
  },[goalTypeSwitch]);

  if(userAlarmsLoading){
    return (
     <CreateAlarmSkeleton goalTypeSwitch={goalTypeSwitch} />
    )
  }
  return (
    <div className=" bg-[#673115] bg-opacity-[5%]  shadow-md border border-[#2713095e] text-start items-start w-full h-fit rounded-md text-zinc-400 text-[13px] md:text-[15px] relative ">
      <form
        className="flex flex-col md:flex-row h-full  w-full "
        onSubmit={handleOnSubmit}
      >
        <div className="flex flex-col text-start items-center justify-start w-full p-4 gap-y-2 ">

          <div className="flex flex-row w-full h-fit gap-x-4 mt-4">
            <div className="flex flex-col  w-full ">
              <label className="font-bold tracking-wider">{input_labels.alarmReason}</label>
              <input
                className="rounded-md w-full bg-[#01000062] hover:bg-[#01000091] border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none shadow-md text-[13px] text-zinc-500 placeholder:text-zinc-500 h-10"
                type="text"
                id="description"
                {...register("description")}
                placeholder="¿What do we do today?"
              />
              {errors.description && (
                <p className=" text-sm text-red-300">
                  {errors?.description?.message?.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col w-fit text-end">
              <label
                className="font-bold tracking-wider truncate"
                htmlFor="alarmDays"
              >
               {input_labels.alarmDays}
              </label>
              <select
                className="rounded-md w-fit bg-[#01000062] hover:bg-[#01000091] border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none shadow-md text-[13px] text-zinc-500 placeholder:bg-zinc-500 h-10"
                id="alarmDays"
                name="alarmDays"
                onChange={(event) => handlePerzonalizedAlarm(event)}
              >
                <option
                  className="bg-[#01000062] hover:bg-[#01000091]"
                  value={REPEAT_ALARM_OPTIONS.once}
                >
                  One Time
                </option>
                <option
                  className="bg-[#01000062] hover:bg-[#01000091]"
                  value={REPEAT_ALARM_OPTIONS.daily}
                >
                  Daily
                </option>
                <option
                  className="bg-[#01000062] hover:bg-[#01000091]"
                  value={REPEAT_ALARM_OPTIONS.custom}
                >
                  Custom
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-row  w-full h-fit text-start items-center justify-between  relative mb-4 ">
          <div className="flex flex-col w-fit  ">
              <label className="font-bold tracking-wider truncate">
              {input_labels.alarmHour}
              </label>
              <input
                className="rounded-md w-fit bg-[#01000062] hover:bg-[#01000091] border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none shadow-md text-[13px] text-zinc-500 placeholder:bg-zinc-500 h-10"
                type="time"
                id="hour"
                {...register("hour")}
              />
              {errors.hour && (
                <p className=" text-sm text-red-300">
                  {errors?.hour?.message?.toString()}
                </p>
              )}
            </div>
            
            {goalTypeSwitch ? (
              <div className="flex flex-col w-fit  text-end">
                <label className="font-bold tracking-wider truncate">
                {input_labels.goalDateEnd}
                </label>
                <input
                  className="rounded-md w-fit bg-[#01000062] hover:bg-[#01000091] border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none shadow-md text-[13px] text-zinc-500 placeholder:bg-zinc-500 h-10"
                  type="date"
                  
                  id="goalDateEnd"
                  {...register("goalDateEnd")}
                />

                {errors.goalDateEnd && (
                  <p className=" text-sm text-red-300">
                    {/* {errors.goalDateEnd.message}  */}
                    goalDateEnd needed
                  </p>
                )}
              </div>
            ) : (
              <></>
            )}
            {personalizedAlarm ? (
              <div className="absolute top-16 right-0  md:left-0 bg-[#3d1b1b]  w-full min-w-[18vw] z-10 p-5 flex flex-col rounded-md border border-[#2713095e] gap-2">
                {daysOfWeek?.map((day: string, index: any) => {
                  return (
                    <div
                      className="flex flex-row text-start items-center justify-start gap-2"
                      key={`${day} ${index}`}
                    >
                      <input
                        type="checkbox"
                        id={`${day}`}
                        className="rounded-md w-5 h-5 bg-[#010000b7]  border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none shadow-md text-[13px] text-green-800 "
                        name={`${day}`}
                        value={`${index}`}
                        onClick={handleDays}
                        defaultChecked={customDays[index as keyof days]}
                      />
                      <label htmlFor={`${day}`}> {`${day}`} </label>
                    </div>
                  );
                })}

                <div>
                  <button
                    className="mt-3 rounded-md p-2 text-amber-800 bg-[#01000062] hover:bg-[#2201016f] border border-[#2713095e] hover:text-[#ba5d06] hover:bg-[#1b1916] focus:bg-[#1a1612c7]"
                    type="button"
                    onClick={handleArrayDays}
                  >
                    OK
                  </button>
                </div>
                {customAlarmError ? (
                  <h2 className="text-red-400 w-fit my-2 p-1 text-[12.4px] rounded-md">
                    Pick atleast one day..
                  </h2>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        
        <div>
          <button
            className=" flex flex-col text-start items-center justify-center h-8 md:h-full w-full md:w-[50px] text-[50px] rounded-b-md md:rounded-r md:rounded-l-none text-amber-700 bg-[#01000062] hover:bg-[#01000091] md:border-l border-[#2713095e] hover:text-amber-800    "
            type="submit"
          >
            {" "}
            <IoMdArrowDropright className="w-8 h-8 md:w-12 md:h-12 rotate-90 md:rotate-0 transform transition-transform duration-300 ease-in-out" />
          </button>
        </div>
      </form>
      <div className="flex flex-row absolute top-0 left-0 text-center items-center justify-center ">
          <div className=" flex flex-row  rounded-tl-md rounded-br-md w-fit border border-[#2713095e] bg-zinc-900">
          <button className={`py-1 px-2  h-full  w-full  hover:bg-[#01000091] rounded-tl-md gap-x-1 rounded-br-md  text-center items-center flex flex-row justify-center ${!goalTypeSwitch ? "bg-zinc-800 " : "bg-zinc-900"}`} type="button" onClick={() => setGoalTypeSwitch(false)}>
            Alarm <TfiAlarmClock className="w-4 h-4"/>
          </button>
          <button className={`px-2 py-1 h-full  w-full hover:bg-[#01000091]  text-center items-center flex flex-row gap-x-1 justify-center rounded-tl-md  rounded-br-md ${goalTypeSwitch ? "bg-zinc-800 " : "bg-zinc-900 "}`} type="button" onClick={() => setGoalTypeSwitch(true)}>
            Goal <GiStairsGoal className="w-4 h-4"/>
          </button>
          </div>
          
        </div>
    </div>
  );
};
