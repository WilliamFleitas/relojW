import React, {useEffect, useState} from "react";
import { IoMdArrowDropright } from "react-icons/io";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserData } from "../../redux/userSlice/userAction";
import { getUserAlarms } from "../../redux/alarmSlice/alarmAction";

const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u);


const AlarmSchema = z.object({
  hour: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ , {message: "Ingrese una hora valida"}).min(5, {message: "Ingrese una hora"}).max(5, {message: "Ingrese una hora valida"}),
  description: z.preprocess(
    trimString,
    z
      .string()
      .max(60, { message: "El limite es de 60 caracteres" })
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
    formState: {errors},
    handleSubmit,
    setValue
  } = useForm<alarmType>({
    resolver: zodResolver(AlarmSchema)
  });

  

 const customDaysObject = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  };
  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  const { user} = useAppSelector((state) => state.user);
  console.log("iduser", user?.id);
  const [customDays, setCustomDays] = useState<days>(customDaysObject);
  const [arrayDays, setArrayDays] = useState<number[]>([]);
  const [alarmOnce, setAlarmOnce] = useState<boolean>(true);
  const [personalizedAlarm, setPersonalizedAlamr] = useState<boolean>(false);
  const [customAlarmError, setCustomAlarmError] = useState<boolean>(false);

  const handleDays = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLButtonElement;
    setCustomDays({...customDays, [target.value] : event.currentTarget.checked})
  };

  const handleArrayDays = () => {
    setCustomAlarmError(false);
    
    const daysSelected: number[] = [];
    for (const [key, value] of Object.entries(customDays)){
        if(value === true){
            daysSelected.push(Number(key));
        }
    }
    if(daysSelected.length <= 0 ) {
      setCustomAlarmError(true);
      return ;
    }

    setArrayDays(daysSelected);
    setPersonalizedAlamr(false);
  }

  
  const handlePerzonalizedAlarm = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setArrayDays([]);
    const value = event.target.value;
    setPersonalizedAlamr(false);
    switch (value) {
        case "Daily":
            setAlarmOnce(false);
            setArrayDays([0,1,2,3,4,5,6]);
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
  const handleOnSubmit = handleSubmit(async({
    hour, description 
  }) => {
    if(alarmOnce){
      //endpoint para alarmas de solo una vez;
      console.log("repetir alarma una vez");
      return ;
    }
    const newObj = {
      hour,
      description,
      alarmDays: arrayDays,
      userId: user?.id
    }
    axios.post(`${BackUrl}/api/alarm/createalarm`, newObj).then((result) => {
      console.log("resultcreatealarm", result);
      dispatch(getUserAlarms(user?.id as string));
    }).catch((err) => {
      console.log("createalarmerror", err);
    });
    console.log("eventsubmit", hour, description);
    console.log("submit", arrayDays, alarmOnce);
  });
  

  return (
    <div className="relative bg-[#C88827] border border-[#9D9B9B] text-center items-center justify-center w-[320px] h-fit m-auto rounded-md">
      <form className="text-start p-5 m-auto" onSubmit={handleOnSubmit}>
        <div className="">
          <div className="flex flex-col w-fit">
            <label>Hora de alarma *</label>
            <input className="rounded-md" type="time" id="hour" {...register("hour")}/>
            {errors.hour && (
              <p className="pt-5 text-sm text-red-400">
                {errors.hour.message}
              </p>
            )}
          </div>

          
        </div >

        <div className="relative">
        <div className="flex flex-col w-fit">
          <label htmlFor="alarmDays">Repetir alarma *</label>
          <select className="rounded-md" id="alarmDays"  name="alarmDays"   onChange={(event) => handlePerzonalizedAlarm(event) } >
            <option value="Once">Una vez</option>
            <option value="Daily">Diariamente</option>
            <option value="Custom">Personalizado</option>
          </select>
          
        </div>

        { personalizedAlarm === true ?
            <div className="absolute bottom-0 bg-amber-500 w-full z-10 p-5 grid grid-rows-1 rounded-md">
            {
                daysOfWeek?.map((day: string, index: any) => {
                    return (
                        <div key={`${day} ${index}`}>
                        <input  type="checkbox" id={`${day}`} name={`${day}`}  value={`${index}`} onClick={handleDays} defaultChecked={customDays[index as keyof days]}/> 
                        <label  htmlFor={`${day}`}> {`${day}`} </label>  
                        </div>
                    )
               }) 
            } 
            
            <div>
                <button className="mt-3 rounded-md p-2 text-[#C88827] bg-[#2C2A2A] border border-[#C88827] hover:text-[#775d35] hover:bg-[#424141]" type="button" onClick={handleArrayDays}>OK</button>
            </div>
            {
              customAlarmError ? <h2 className="text-[#e7e2e2] bg-red-800 w-fit my-2 p-1 text-[12.4px] rounded-md">Seleccione por lo menos un día</h2> : <></>
            }
        </div> : <></>}
        </div>
        <div className="flex flex-col  w-fit">
            <label>Razón de alarma</label> 
            <input className="rounded-md" type="text" id="description" {...register("description")} placeholder="¿Que hacemos hoy?"/>
            {errors.description && (
              <p className="pt-5 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>
        <div className="">
            <button className="absolute right-0 top-0 flex flex-col m-auto justify-center text-center items-center  h-full w-[50px] text-[50px] rounded-r-md text-[#C88827] bg-[#2C2A2A] border border-[#C88827] hover:text-[#775d35] hover:bg-[#424141]" type="submit">
              {" "}
              <IoMdArrowDropright />
            </button>
          </div>
      </form>
    </div>
  );
};
