import { useState } from "react";

// Form
import { useForm } from "react-hook-form";

// Api
import { axisoInstance } from "../utils/axiosInstance";

// Alert
import {  toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userLoginSuccess } from "../features/user/userLoginSlice";
import { useDispatch } from "react-redux";

const LoginPage = ({ setCurrentComponent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSignUp = () => {
    setCurrentComponent("Sign Up");
  };

  const submitSignin = async (data) => {
    const email = data.email;
    const password = data.password;

    setLoading(true);

    await axisoInstance
      .post("/api/user/sign-in", { email: email, password: password })

      .then((res) => {
        setLoading(false);
        localStorage.setItem(
          "userInfo",
          JSON.stringify(res?.data?.user?.token)
        );
        dispatch(userLoginSuccess(localStorage.getItem("userInfo")));
        toast.success(`${res.data.message}`);

        setTimeout(() => {
          navigate("/view-task");
        }, 3000);

        if (data.rememberMe) {
          localStorage.setItem("userEmail", data.email);
        } else {
          sessionStorage.setItem("userEmail", data.email);
        }
      })

      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        setLoading(false);
        toast.error(`${errorMessage}`);
      });
  };
  return (
    <div className="  flex justify-center flex-col  font-semibold text-[#FFFFFF] md:mr-20 z-50 md:pt-0  pt-20  ">
      <h1 className=" tracking-wide lg:text-[36px] sm:text-[30px] text-[28px]  ">
        Welcome Login System
      </h1>
      <h1 className=" tracking-wide text-[20px]  mt-3 ">
        Your gateway to seamless
      </h1>
      <h1 className=" tracking-wide text-[20px]  ">
        transactions and easy payments
      </h1>

      <form
        onSubmit={handleSubmit(submitSignin)}
        className=" mt-5 text-lg tracking-wider h-60  flex flex-col"
      >
        <div className="">
          <label className=" text-sm font-medium "> Email</label>
          <input
            type="text"
            placeholder="mahadev@lemonpay.tech"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            defaultValue=""
            className=" p-2 my-2 border w-full rounded-lg  text-md font-normal bg-[#E6E1FAA3]"
          />
          {errors.email && (
            <p className=" text-red-700 text-sm font-bold brightness-200  ">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="">
          <label className=" text-sm font-medium "> Password</label>
          <input
            type="password"
            placeholder="Min 8 characters"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain uppercase, lowercase, number, and special character",
              },
            })}
            defaultValue=""
            className=" p-2 mt-2 w-full border rounded-lg text-md font-normal  bg-[#E6E1FAA3]"
          />
          {errors.password && (
            <p className=" text-red-700 font-bold text-sm  brightness-200 text-wrap max-w-[400px]">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className=" flex justify-between my-2 ">
          <div className=" flex gap-2 items-center">
            <input
              type="checkbox"
              size={50}
              {...register("rememberMe")}
              className=""
            />
            <p>Remember me</p>
          </div>
          <button className=" text-sm" onClick={() => handleSignUp()}>
            Sign up
          </button>
        </div>
        <button
          type="Submit"
          disabled={loading}
          className=" w-full mt-3 bg-[#FFFFFF] text-gray-800 py-3 text-sm font-bold hover:cursor-pointer rounded-lg"
        >
          {loading ? "Sign In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
