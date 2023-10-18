import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserNotes } from "../../../../../redux/alarmSlice/alarmAction";
import axios from "axios";
import dayjs from "dayjs";
import { GrFormClose } from "react-icons/gr";
const NoteSchema = z.object({
  goalNote: z
    .string()
    .min(5, { message: "5 characters min" })
    .max(60, { message: "40 characters max" }),
  goalNoteDate: z.string().nonempty(),
});
const BackUrl = import.meta.env.VITE_BACK_URL as string;
interface AlarmNotesTypeProps {
  alarmId: string;
}
const AlarmNotes = ({ alarmId }: AlarmNotesTypeProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm<any>({
    resolver: zodResolver(NoteSchema),
  });
  const dispatch = useAppDispatch();
  const { goalNotes, goalNotesDates } = useAppSelector((state) => state.alarm);
  
  const [addNoteSwitch, setAddNoteSwitch] = useState<boolean>(false);
  const handleOnSubmit = handleSubmit(async ({ goalNote, goalNoteDate }) => {
    
    axios
      .put(`${BackUrl}/api/alarm/addNote/${alarmId}`, {
        goalNote: goalNote,
        goalNoteDate: goalNoteDate,
      })
      .then((result) => {
        dispatch(getUserNotes(alarmId));
        handleAddButtonSwitch();
        reset();
        setValue("goalNoteDate", dayjs().toString());
      })
      .catch((err) => {
        console.log( err);
      });
  });

  useEffect(() => {
      setValue("goalNoteDate", dayjs().toString());
  }, []);
  const handleAddButtonSwitch = () => {
    setAddNoteSwitch(!addNoteSwitch);
  };
  useEffect(() => {
    dispatch(getUserNotes(alarmId));
  }, []);
  return (
    <div className="flex flex-col h-fit">
      <div className="flex flex-row w-full h-fit text-start items-center justify-between relative">
        <label className="text-[20px] w-full ">Goal Notes:</label>
        <button
          className="border border-[#895953ce] hover:border-[#876561ce] hover:text-zinc-500 py-1 rounded-md font-bold tracking-wider min-w-[130px] max-w-[130px]"
          onClick={handleAddButtonSwitch}
          type="button"
        >
          Add Note +
        </button>
        {addNoteSwitch ? (
          <div className="flex flex-row bg-gradient-to-r from-[#613a36] to-[#302e2e]  shadow-md border border-[#895953ce] text-zinc-400 rounded-md absolute bottom-0 w-full h-full max-w-[600px] min-h-[23vh]  text-start items-start justify-between z-50">
            <form
              onSubmit={handleOnSubmit}
              className="w-full flex flex-col text-start items-start justify-between px-4 py-4 gap-x-2 h-full"
            >
              <span className="text-[20px] text-bold tracking-wide">
                Create a goal note for this day
              </span>
              <input
                className="rounded-md w-full bg-[#01000062] hover:bg-[#01000091] border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none shadow-md text-[13px] text-zinc-500 placeholder:text-zinc-500 h-10 mt-1"
                type="text"
                id="goalNote"
                {...register("goalNote")}
                placeholder="Inserte Note.."
              />
              <div className="">
                {errors.goalNote && (
                  <p className=" text-sm text-red-300 px-2 ">
                    {errors?.goalNote?.message?.toString()}
                  </p>
                )}
                {errors.goalNoteDate && (
                  <p className=" text-sm text-red-300 px-2">
                    {errors?.goalNoteDate?.message?.toString()}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col text-start items-center justify-center mt-auto">
                <button
                  type="submit"
                  className="bg-zinc-700 border border-zinc-800 hover:bg-zinc-600 shadow-md px-2 py-1 rounded-md w-fit"
                >
                  Create Note
                </button>
              </div>
            </form>
            <button onClick={handleAddButtonSwitch} className="mx-2 py-1 ">
              <GrFormClose
                style={{ pointerEvents: "none" }}
                className="w-5 h-5 "
              />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className={`"grid grid-flow-col-dense ${goalNotes?.length && goalNotes?.length > 15 ? "grid-rows-2" : ""}  overflow-x-auto customScrollbar  pb-2 overflow-y-hidden  h-fit gap-2 text-start items-center justify-start w-full my-2"`}>
        {goalNotes?.length ? (
          goalNotes?.map((item, index) => (
            <div key={index} className="flex flex-col w-fit  min-h-[50px] max-h-[50px] bg-gradient-to-r from-[#613a36] to-[#473a3a]  shadow-md border border-[#895953ce] px-2 py-1 rounded-md text-start items-center justify-center ">
              <span className="flex mb-auto ml-auto ">
                {dayjs(goalNotesDates?.[index]).format("MM/DD/YYYY")}
              </span>
              <span className="flex text-start items-center justify-start m-auto w-full truncate">
                {item}
              </span>
            </div>
          ))
        ) : (
          <span className="flex text-center items-center justify-center w-full ">
            Theres still no notes here, but you can add one!
          </span>
        )}
      </div>
    </div>
  );
};
export default AlarmNotes;
