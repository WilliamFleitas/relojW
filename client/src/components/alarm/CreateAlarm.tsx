import React, { useEffect, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserData } from "../../redux/userSlice/userAction";
import { getUserAlarms } from "../../redux/alarmSlice/alarmAction";

const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u);

const AlarmSchema = z.object({
  hour: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Ingrese una hora valida",
    })
    .min(5, { message: "Ingrese una hora" })
    .max(5, { message: "Ingrese una hora valida" }),
  description: z.preprocess(
    trimString,
    z.string().max(60, { message: "El limite es de 60 caracteres" })
  ),
  // alarmDays: z
  // .union([z.array(z.number()), z.string()])
  // .refine((value) => {
  //   if (Array.isArray(value)) {
  //     return value.length > 0 && value.every((num) => typeof num === 'number');
  //   }
  //   return value.trim().length > 0;
  // }, 'Debe seleccionar al menos una opción')
});

type alarmType = z.infer<typeof AlarmSchema>;

interface days {
  0: boolean;
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
  5: boolean;
  6: boolean;
}
export const CreateAlarm = () => {
  const BackUrl = import.meta.env.VITE_BACK_URL as string;
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<alarmType>({
    resolver: zodResolver(AlarmSchema),
  });

  const customDaysObject = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  };
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const { user } = useAppSelector((state) => state.user);
  console.log("iduser", user?.id);
  const [customDays, setCustomDays] = useState<days>(customDaysObject);
  const [arrayDays, setArrayDays] = useState<number[]>([]);
  const [alarmOnce, setAlarmOnce] = useState<boolean>(true);
  const [personalizedAlarm, setPersonalizedAlamr] = useState<boolean>(false);
  const [customAlarmError, setCustomAlarmError] = useState<boolean>(false);

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
    setPersonalizedAlamr(false);
    switch (value) {
      case "Daily":
        setAlarmOnce(false);
        setArrayDays([0, 1, 2, 3, 4, 5, 6]);
        break;
      case "Custom":
        setAlarmOnce(false);
        setPersonalizedAlamr(!personalizedAlarm);

        break;
      default:
        setAlarmOnce(true);
        setArrayDays([]);
        break;
    }
  };
  const handleOnSubmit = handleSubmit(async ({ hour, description }) => {
    if (alarmOnce) {
      //endpoint para alarmas de solo una vez;
      console.log("repetir alarma una vez");
      return;
    }
    const newObj = {
      hour,
      description,
      alarmDays: arrayDays,
      userId: user?.id,
    };
    axios
      .post(`${BackUrl}/api/alarm/createalarm`, newObj)
      .then((result) => {
        console.log("resultcreatealarm", result);
        dispatch(getUserAlarms(user?.id as string));
      })
      .catch((err) => {
        console.log("createalarmerror", err);
      });
    console.log("eventsubmit", hour, description);
    console.log("submit", arrayDays, alarmOnce);
  });

  return (
    <div className=" bg-[#ba5d0649] border border-[#ba5d06] text-start items-start w-full h-full rounded-md text-white text-[13px] md:text-[16px]">
      <form className="flex flex-col md:flex-row h-full  w-full" onSubmit={handleOnSubmit}>
        <div className="flex flex-col text-start items-start justify-center w-full p-2 md:p-5 space-y-2">

          <div className="flex flex-row md:flex-col w-full text-start items-center justify-between md:text-start md:items-start md:justify-center md:space-y-2 gap-x-4">
          <div className="flex flex-col w-full space-y-1">
            <label className="font-bold tracking-wider">Alarm Hour *</label>
            <input
              className="rounded-md text-zinc-400 w-fit bg-zinc-800 border-none hover:border-none focus:border-none ring-0 focus:ring-0 hover:ring-0 h-8 md:h-full"
              type="time"
              id="hour"
              {...register("hour")}
            />
            {errors.hour && (
              <p className=" text-sm text-red-300">{errors.hour.message}</p>
            )}
          </div>
          <div className="relative">
          <div className="flex flex-col w-fit space-y-1">
            <label className="font-bold tracking-wider" htmlFor="alarmDays">Repeat Alarm *</label>
            <select
              className="rounded-md  bg-zinc-800 border-none text-zinc-400 hover:border-none focus:border-none ring-0 focus:ring-0 hover:ring-0 h-8 md:h-full"
              id="alarmDays"
              name="alarmDays"
              onChange={(event) => handlePerzonalizedAlarm(event)}
            >
              <option className="" value="Once">One Time</option>
              <option className="" value="Daily">Daily</option>
              <option className="" value="Custom">Custom</option>
            </select>
          </div>

          {personalizedAlarm  ? (
            <div className="absolute bottom-0 bg-zinc-800 w-full z-10 p-5 grid grid-rows-1 rounded-md border border-[#ba5d06] ">
              {daysOfWeek?.map((day: string, index: any) => {
                return (
                  <div key={`${day} ${index}`}>
                    <input
                      type="checkbox"
                      id={`${day}`}
                      className="rounded-full text-[#ba5d06] ring-0 focus:ring-0 hover:ring-0  outline-none focus:outline-none hover:outline-none"
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
                  className="mt-3 rounded-md p-2 text-[#ba5d06] bg-zinc-800 border border-[#ba5d06] hover:text-[#ba5d06] hover:bg-[#1b1916] focus:bg-[#1a1612c7]"
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
          


        <div className="flex flex-col  w-full space-y-1">
          <label className="font-bold tracking-wider">Alarm Reason</label>
          <input
            className="rounded-md text-zinc-300 bg-zinc-800 border-none hover:border-none focus:border-none ring-0 focus:ring-0 hover:ring-0 text-[13px] md:text-[16px] h-8 md:h-full"
            type="text"
            id="description"
            {...register("description")}
            placeholder="¿What do we do today?"
          />
          {errors.description && (
            <p className="pt-2 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
        </div>

        <div>
        <button
          className=" flex flex-col text-start items-center justify-center h-8 md:h-full w-full md:w-[50px] text-[50px] rounded-b-md md:rounded-r md:rounded-l-none text-[#ba5d06] bg-zinc-800 md:border-l border-[#ba5d06] hover:text-[#ba5d06] hover:bg-[#1b1916] focus:bg-[#1a1612c7]   "
          type="submit"
        >
          {" "}
          <IoMdArrowDropright className="w-8 h-8 md:w-12 md:h-12 rotate-90 md:rotate-0 transform transition-transform duration-300 ease-in-out" />
        </button>
        </div>
        
      </form>
    </div>
  );
};
