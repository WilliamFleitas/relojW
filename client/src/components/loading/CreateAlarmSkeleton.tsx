import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


interface UserAlarmsSekeletonPropsType {
    goalTypeSwitch: boolean;
}
const CreateAlarmSkeleton: React.FC<UserAlarmsSekeletonPropsType> = ({goalTypeSwitch}) => {

    return (
        <div className="card-skeleton animate-pulse bg-[#673115] bg-opacity-[5%]  shadow-md border border-[#2713095e] text-start items-start flex flex-col md:flex-row h-fit  w-full  rounded-md relative ">
     
        <div className="flex flex-col text-start items-center justify-start w-full p-4 gap-2 ">

          <div className="flex flex-row w-full h-fit gap-x-4 mt-4">
            <div className="flex flex-col  w-full gap-1">
              <Skeleton baseColor="#01000062" highlightColor="#01000091" direction="ltr" duration={1.5} height={20} width={100}  />
              <Skeleton baseColor="#01000062" highlightColor="#01000091" direction="ltr" duration={1.5} height={30} 
                className=""
              />
            </div>
            <div className="flex flex-col w-fit text-start gap-1">
            <Skeleton baseColor="#01000062" highlightColor="#01000091" direction="ltr" duration={1.5} height={20} width={80}  />
              <Skeleton baseColor="#01000062" highlightColor="#01000091" direction="ltr" duration={1.5} height={30} width={120} 
              />
            </div>
          </div>

          <div className="flex flex-row  w-full h-fit text-start items-center justify-between  relative ">
          <div className="flex flex-col w-fit text-start gap-1">
            <Skeleton baseColor="#01000062" highlightColor="#01000091" direction="ltr" duration={1.5} height={20} width={80}  />
              <Skeleton baseColor="#01000062" highlightColor="#01000091" direction="ltr" duration={1.5} height={30} width={120} 
              />
            </div>
            
            {goalTypeSwitch ? (
              <div className="flex flex-col w-fit text-start gap-1">
              <Skeleton baseColor="#01000062" highlightColor="#01000091" direction="ltr" duration={1.5} height={20} width={80}  />
                <Skeleton baseColor="#01000062" highlightColor="#01000091" direction="ltr" duration={1.5} height={30} width={120} 
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        
        <div className="hidden md:block h-full">
          <Skeleton baseColor="#01000062" highlightColor="#01000091" direction="ltr" duration={1.5} width={35} 
            className=" flex flex-col text-start items-center justify-center h-8 md:h-full w-full md:w-[50px] text-[50px] rounded-b-md md:rounded-r md:rounded-l-none text-amber-700 bg-[#01000062] hover:bg-[#01000091] md:border-l border-[#2713095e] hover:text-amber-800    "/>
        </div>
        <div className=" md:hidden h-full  w-full">
          <Skeleton height={35} baseColor="#01000062" highlightColor="#01000091" direction="ltr" duration={1.5}/>
        </div>
      
    </div>
    )
};

export default CreateAlarmSkeleton;