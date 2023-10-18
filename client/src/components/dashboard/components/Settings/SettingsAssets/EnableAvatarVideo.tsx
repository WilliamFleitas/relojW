import { useState } from "react";
import { IUserType } from "../../../../../redux/userSlice";
import { AiTwotoneEdit, AiOutlineCheck } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useAppDispatch } from "../../../../../hooks";
import { getUserData } from "../../../../../redux/userSlice/userAction";

interface EnableAvatarVideoTypeProps {
  user: IUserType | null;
}
const EnableAvatarVideo: React.FC<EnableAvatarVideoTypeProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const BackUrl = import.meta.env.VITE_BACK_URL as string;
  const avatarVideoBoolean =
    window.localStorage.getItem("avatarVideo") === "true" ? true : false;
  const didKey = window.localStorage.getItem("didKey");
  const [showDidkeyInput, setShowDidKeyInput] =
    useState<boolean>(avatarVideoBoolean);
  const [editDidKey, setEditDidKey] = useState<boolean>(false);
  const [userKeyInput, setUserKeyInput] = useState<string | null>(didKey);
  const [keyInputError, setKeyInputError] = useState<string | null>(null);

  const handleAvatarEnableChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target;
    if (user && user.id && target.checked === false) {
        axios
          .put(`${BackUrl}/api/user/enableAvatar/${user.id}`, {
            avatarVideo: false,
          })
          .then((result) => {
            dispatch(getUserData());
            setShowDidKeyInput(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }else if(user && user.id && target.checked === true) {
        setShowDidKeyInput(true);

        if(!userKeyInput){
            setEditDidKey(true);
        }else if (userKeyInput){
          handleSendUserDidKeyClick();
        }
      }
  };
  const handleEditDidKeyClick = () => {
    if (editDidKey && !didKey) {
      setShowDidKeyInput(false);
      setEditDidKey(false);
      return;
    }
    else if(!editDidKey){
        setEditDidKey(true);
    }else {
        setEditDidKey(false); 
    }
  };

  const handleUserKeyInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target;
    setUserKeyInput(target.value);
  };

  const handleSendUserDidKeyClick = () => {
    
    if (
      user &&
      user.id !== null &&
      userKeyInput &&
      userKeyInput.trim().length > 5
    ) {
      axios
        .put(`${BackUrl}/api/user/enableAvatar/${user.id}`, {
          avatarVideo: true,
          didKey: userKeyInput,
        })
        .then((result) => {
          dispatch(getUserData());
          setEditDidKey(false);
        })
        .catch((err) => {
          console.log( err);
        });
    } else {
      setKeyInputError("Insert a valid key");
    }
  };

  return (
    <aside className="flex flex-col w-full h-full text-start items-start justify-center ">
       <h2 className="font-bold tracking-wider px-4">Alarm Widgets</h2>
      <section className="flex flex-row w-full h-fit text-start items-center justify-between py-4 gap-4 border-t border-zinc-800 mt-2 px-6">
        <h3 className="font-bold tracking-wider">Enable Avatar Video</h3>
        <label className="relative inline-flex items-center cursor-pointer ">
          <input
            type="checkbox"
            value={user?.id}
            checked={showDidkeyInput}
            className="sr-only peer focus:outline-none focus:border-none border-none outline-none "
            onChange={(event) => handleAvatarEnableChange(event)}
          />
          <div className="w-8 h-4 border border-[#121614]  bg-[#121614] focus:outline-none  rounded-full peer   peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:right-[3px]  after:rounded-full after:h-4  after:shadow-sm  after:w-4 after:transition-all after:bg-zinc-800   peer-checked:bg-[#0a120c] peer-checked:after:border  after:border-zinc-800 peer-checked:border-[#0a120c] peer-checked:after:border-green-900 after:border peer-checked:after:bg-green-900 ">
            {" "}
          </div>
        </label>
      </section>

      {showDidkeyInput ? (
        <section className="flex flex-col w-full h-fit text-start items-start justify-between  font-bold tracking-wider pt-2 px-6">
          <h3>D-id Key</h3>
          <div className="flex flex-row w-full text-start items-center justify-between gap-2">
            {editDidKey || !didKey ? (
              <>
                <input
                  className="px-2 rounded-md w-full bg-[#01000062] hover:bg-[#01000091] border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none shadow-md text-[13px] text-zinc-500 placeholder:text-zinc-500 h-8"
                  type="text"
                  defaultValue={userKeyInput ? userKeyInput : ""}
                  placeholder="Insert key..."
                  onChange={handleUserKeyInputChange}
                />
                
              </>
            ) : (
              <small className="px-2 truncate">
                {didKey ? didKey : "Insert Key..."}
              </small>
            )}
            {editDidKey || !didKey ? (
              <button
                className="text-green-600 border-green-600 border rounded-md hover:bg-opacity-[40%] bg-black bg-opacity-[10%]  p-1"
                type="button"
              >
                <AiOutlineCheck
                  className="w-5 h-5"
                  onClick={handleSendUserDidKeyClick}
                />
              </button>
            ) : (
              <></>
            )}
            <button
              className="text-zinc-400 hover:text-zinc-600"
              type="button"
              onClick={handleEditDidKeyClick}
            >
              {editDidKey || !didKey ? (
                <IoClose className="w-5 h-5" />
              ) : (
                <AiTwotoneEdit className="w-5 h-5" />
              )}
            </button>
          </div>
          {keyInputError ? <span>{keyInputError}</span> : <></>}
        </section>
      ) : (
        <></>
      )}
    </aside>
  );
};

export default EnableAvatarVideo;
