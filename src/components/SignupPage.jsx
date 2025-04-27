import React, { useState } from "react";

// Form
import { useForm } from "react-hook-form";

// Alert
import { Bounce, toast } from "react-toastify";

// Axios
import { axisoInstance } from "../utils/axiosInstance";

const SignupPage = ({ setCurrentComponent }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

  const handleSignIn = () => {
    setCurrentComponent("Sign In");
  };

  const submitSignUp = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
    }
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    setLoading(true);

    await axisoInstance
      .post("/api/user/sign-up", {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          toast.success(`${res.data.message}`);
          if (data.rememberMe) {
            localStorage.setItem("userEmail", data.email);
          } else {
            sessionStorage.setItem("userEmail", data.email);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data) {
          toast.error(`${error.response.data.message}`);
        } else {
          toast.error("Something went wrong");
        }
      });
  };
  return (
    <div className="  flex justify-center flex-col  font-semibold text-[#FFFFFF] md:mr-20 z-50 md:pt-0  pt-32  ">
      <h1 className=" tracking-wide lg:text-[36px] sm:text-[30px] text-[28px]  ">
        Welcome Sign Up System
      </h1>
      <h1 className=" tracking-wide text-[20px]  mt-3 ">
        Your gateway to seamless
      </h1>
      <h1 className=" tracking-wide text-[20px]  ">
        transactions and easy payments
      </h1>

      <form
        onSubmit={handleSubmit(submitSignUp)}
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
            className=" p-2 my-2 border w-full rounded-lg text-md font-normal bg-[#E6E1FAA3]"
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
            className=" p-2 mt-2 w-full border rounded-lg font-normal text-md text-gray-600 bg-[#E6E1FAA3]"
          />
          {errors.password && (
            <p className=" text-red-700  text-sm font-bold brightness-200  text-wrap max-w-[400px]">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="">
          <label className=" text-sm font-medium "> Password</label>
          <input
            type="password"
            placeholder="Min 8 characters"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            defaultValue=""
            className=" p-2 mt-2 w-full border rounded-lg font-normal text-md text-gray-600 bg-[#E6E1FAA3]"
          />
          {errors.password && (
            <p className=" text-red-700  text-sm font-bold brightness-200  text-wrap max-w-[400px]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className=" flex justify-between my-2 ">
          <div className=" flex gap-2 items-center">
            <input
              type="checkbox"
              {...register("rememberMe")}
              size={50}
              className=""
            />
            <p>Remember me</p>
          </div>
          <button className=" text-sm" onClick={() => handleSignIn()}>
            Sign In
          </button>
        </div>
        <button
          type="Submit"
          disabled={loading}
          className=" w-full mt-3 bg-[#FFFFFF] text-gray-800 py-3 text-sm font-bold hover:cursor-pointer rounded-lg"
        >
          {loading ? " Sign Up..." : " Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
