import { AlarmType } from "../../../../../redux/alarmSlice";
import { IoClose } from "react-icons/io5";
import {
  deleteAlarm,
  updateEnableAlarm,
} from "../../../../../redux/alarmSlice/alarmAction";
import { useAppDispatch } from "../../../../../hooks";
import { REPEAT_ALARM_OPTIONS } from "../AlarmLayout";
interface UserAlarmCardTypeProps {
  data: AlarmType;
  userId: string | number;
  alarmEnable: boolean;
  alarmEnableOnChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
const UserAlarmCard = ({
  data,
  userId,
  alarmEnable,
  alarmEnableOnChange,
}: UserAlarmCardTypeProps) => {
  const dispatch = useAppDispatch();

  const handleAlarmEnableChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target;
    dispatch(updateEnableAlarm(target.value, !alarmEnable));
    alarmEnableOnChange(!alarmEnable);
  };
  const handleDeleteAlarmClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLInputElement;
    dispatch(deleteAlarm(target.value, userId.toString()));
  };
  return (
    <div className="flex flex-col   w-full h-full">
      <div className="flex flex-row h-full w-full text-start items-start justify-between px-1 py-1 gap-x-2">
        <div className="flex flex-row gap-x-6  text-start items-start justify-between h-full w-full p-3">
          <h2 className=" font-bold text-[15px]  w-full h-full max-h-14  no-scrollbar mt-4">
            "{data.description}"
          </h2>
          <h3 className="font-bold text-[35px] text-zinc-500">
            {data.hour.slice(0, 5)}
          </h3>
        </div>
        <button
          className="hover:text-zinc-500 hover:bg-zinc-900 hover:rounded-full"
          value={data.id}
          type="button"
          onClick={handleDeleteAlarmClick}
        >
          <IoClose
            style={{ pointerEvents: "none" }}
            className="w-5 h-5 text-zinc-700 "
          />
        </button>
      </div>

      <div
        className={`flex flex-row h-fit min-h-[5vh]  bg-[#01000062]  w-full text-start items-center justify-between p-2 gap-x-2 rounded-bl-md border border-r-0  text-[13px] border-[#2713095e] mb-auto`}
      >
        {data.alarmType === REPEAT_ALARM_OPTIONS.once ? (
          <h3 className="font-bold tracking-wider">ONCE</h3>
        ) : data.alarmType === REPEAT_ALARM_OPTIONS.custom ? (
          daysOfWeek.map((days, index) => {
            return (
              <h3
                className={` font-bold tracking-wider ${
                  data.alarmDays.includes(index) ? "text-green-700" : ""
                }`}
                key={days + index}
              >
                {days.toUpperCase()}
              </h3>
            );
          })
        ) : (
          <h3 className="font-bold tracking-wider">DAILY</h3>
        )}

        <div className="flex flex-row gap-x-4">
          <p className=" text-zinc-500 font-medium flex flex-row gap-x-1">
            <span className="hidden fh:flex ">SOUNDS IN: </span> 4H 20M
          </p>

          <label className="relative inline-flex items-center cursor-pointer ">
            <input
              type="checkbox"
              value={data.id}
              defaultChecked={data.enable}
              className="sr-only peer focus:outline-none focus:border-none border-none outline-none "
              onChange={(event) => handleAlarmEnableChange(event)}
            />
            <div className="w-8 h-4 border border-[#121614]  bg-[#121614] focus:outline-none  rounded-full peer   peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:right-[3px]  after:rounded-full after:h-4  after:shadow-sm  after:w-4 after:transition-all after:bg-zinc-800   peer-checked:bg-[#0a120c] peer-checked:after:border  after:border-zinc-800 peer-checked:border-[#0a120c] peer-checked:after:border-green-900 after:border peer-checked:after:bg-green-900 ">
              {" "}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
export default UserAlarmCard;
