import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getUserData } from "../../../../redux/userSlice/userAction";
import EnableAvatarVideo from "./SettingsAssets/EnableAvatarVideo";

const UserSettings = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <div className="flex flex-col h-full w-full text-start items-center justify-start px-2 fh:px-4 my-4">
      <h1 className="font-bold tracking-wider">Settings</h1>
      <main className="flex flex-col w-full h-fit text-start items-start justify-center  border border-[#231e1a] bg-[#1c1a18] py-4 max-w-[500px] rounded-md ">
        <h2 className="font-bold tracking-wider px-4">User Information</h2>
        <aside className="flex flex-col py-4 gap-4 border-t border-zinc-800 w-full mt-2 px-6">
          <label className="font-bold tracking-wider flex-col">
            <h3>Username</h3>
            <small className="px-2">{user?.username}</small>
          </label>

          <label className="font-bold tracking-wider flex-col">
            <h3>Email</h3>
            <small className="px-2">{user?.email}</small>
          </label>
        </aside>

        <div className="w-full">
       
          <EnableAvatarVideo user={user} />
        </div>
      </main>
    </div>
  );
};
export default UserSettings;
