import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useWindowSize from "../utils/useWindowSize";

interface UserAlarmsSkeletonTypeProps {
  count: number;
}
const UserAlarmsSkeleton: React.FC<UserAlarmsSkeletonTypeProps> = ({
  count,
}) => {
    const {width} = useWindowSize();
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array(count)
        .fill(0)
        .map((item) => (
          <div
            className={`flex flex-col relative w-full  h-fit  text-start items-center justify-between rounded-md  border border-[#2713095e] overflow-hidden animate-pulse`}
          >
            <div className="flex flex-col   w-full h-full">
              <div className="flex flex-row  text-start items-center justify-between h-fit w-full px-6 py-4 gap-2">
                <Skeleton
                  baseColor="#01000062"
                  highlightColor="#01000091"
                  direction="ltr"
                  duration={1.5}
                  height={20}
                  width={width < 340 ? 50 : width < 400 ? 100 : 150}
                />
                <Skeleton
                  baseColor="#01000062"
                  highlightColor="#01000091"
                  direction="ltr"
                  duration={1.5}
                  height={45}
                  width={width < 400 ? 80 : 120}
                />
              </div>

              <div
                className={`flex flex-row h-fit min-h-[5vh]  bg-[#01000062]  w-full text-start items-center justify-between p-2 gap-x-2 rounded-bl-md border border-r-0  text-[13px] border-[#2713095e] mb-auto`}
              >
                <Skeleton
                  className="rounded-md"
                  baseColor="#01000062"
                  highlightColor="#01000091"
                  direction="ltr"
                  duration={1.5}
                  height={20}
                  width={80}
                />

                <div className="flex flex-row gap-x-4">
                  <Skeleton
                    className="rounded-md"
                    baseColor="#01000062"
                    highlightColor="#01000091"
                    direction="ltr"
                    duration={1.5}
                    height={20}
                    width={80}
                  />

                  <label className="relative inline-flex items-center cursor-pointer animate-pulse">
                    <input
                      checked={true}
                      type="checkbox"
                      disabled
                      className="sr-only peer focus:outline-none focus:border-none border-none outline-none "
                    />
                    <div className="w-8 h-4 border border-[#121614]  bg-[#121614] focus:outline-none  rounded-full peer   peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:right-[3px]  after:rounded-full after:h-4  after:shadow-sm  after:w-4 after:transition-all after:bg-zinc-800   peer-checked:bg-[#0a120c] peer-checked:after:border  after:border-zinc-800 peer-checked:border-[#0a120c] peer-checked:after:border-green-900 after:border peer-checked:after:bg-green-900 ">
                      {" "}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserAlarmsSkeleton;
