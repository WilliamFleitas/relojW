import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppDispatch } from "../../hooks";
import { BiLogoFacebook, BiLogoGooglePlus } from "react-icons/bi";
const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u);

const logSchema = z.object({
  username: z.preprocess(trimString, z.string()),
  password: z.preprocess(
    trimString,
    z.string().min(5, { message: "Enter a valid password" })
  ),
});
type logType = z.infer<typeof logSchema>;
const BackUrl = import.meta.env.VITE_BACK_URL as string;

interface SignInTypeProps {
  changeViewFunction: (value: boolean) => void;
}
const SignIn = ({ changeViewFunction }: SignInTypeProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginErrors, setLoginErrors] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<logType>({
    resolver: zodResolver(logSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    setLoginErrors("");
    axios
      .post(`${BackUrl}/api/auth/signin`, formData)
      .then(({ data }) => {
        localStorage.setItem("userSession", JSON.stringify(data.token));
        navigate("/dashboard");
      })
      .catch((e: any) => {
        setLoginErrors(
          e.response?.data?.errors?.[0]
            ? e.response?.data?.errors?.[0].msg.toString()
            : e.response?.data
        );
      });
  });
  return (
    <div className="flex flex-col text-start items-center h-full w-full justify-center  text-zinc-300 px-14">
      <form
        className="flex flex-col text-start items-center h-full w-full justify-center"
        onSubmit={onSubmit}
      >
        <div className="w-fit h-fit text-center mt-auto my-10" >
          <h2 className="text-[35px] font-bold ">Sign In</h2>
        </div>
        <div className=" gap-x-10  flex  flex-row w-full text-start items-center justify-center h-fit  mb-10">
          <button className="w-10 h-10 shadow-md rounded-full">
            {
              <BiLogoFacebook className="bg-[#01000062] hover:bg-[#01000091] rounded-full p-[6px]  w-full h-full " />
            }
          </button>
          <button className=" w-10 h-10 shadow-md rounded-full">
            {
              <BiLogoGooglePlus className="bg-[#01000062] hover:bg-[#01000091]  rounded-full p-[6px]  w-full h-full " />
            }
          </button>
        </div>

        <div className="flex flex-col w-full h-fit text-start items-center mb-10 gap-y-4">
          <span className="w-full text-[15px] ">or use your account</span>

              <input
                className="rounded-md w-full bg-[#01000062] hover:bg-[#01000091] border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none shadow-md text-[13px] text-zinc-500 placeholder:text-zinc-500"
                placeholder="Username"
                type={"text"}
                id="username"
                {...register("username")}
              />
              <input
                className="rounded-md w-full bg-[#01000062] hover:bg-[#01000091] border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none shadow-md text-[13px] text-zinc-500 placeholder:text-zinc-500"
                placeholder="Password"
                type={"password"}
                id="password"
                {...register("password")}
              />
                {errors?.password && (
                  <p className=" text-red-400 text-[13px]">
                    {errors.password.message}
                  </p>
                )}
            <button
              className="bg-[#01000062] hover:bg-[#2201016f] px-4 py-2 w-fit h-fit rounded-full shadow-md text-[15px] font-bold"
              type="submit"
            >
              Sign In
            </button>
            {loginErrors && (
              <div>
                <p className=" text-red-400 text-[13px]">{loginErrors}</p>
              </div>
            ) }
            <button className="text-[13px] hover:text-zinc-600" type="button">
            Forgot your password?
          </button>
        </div>

        <div className="flex flex-col text-start items-center my-10 justify-center text-[13px] mt-auto gap-y-4">
          
          <span className="">
            You do not have an account?{"  "}
            <button className="font-bold hover:text-zinc-600" onClick={() => changeViewFunction(true)} type="button">
              Register
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
