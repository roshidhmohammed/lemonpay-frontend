import { useState } from "react";

// Form
import { useForm } from "react-hook-form";

// Api
import { axisoInstance } from "../utils/axiosInstance";

// Alert
import { Bounce, toast } from "react-toastify";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitSignin = async (data) => {
    console.log(data.email);
    console.log(data.password);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    setLoading(true);

    await axisoInstance
      .post("/api/user/sign-in", formData)

      .then((res) => {
        setLoading(false);
        console.log(res.data.message);
        setSuccessMessage(res.data.message);
        toast.success(successMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })

      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        setErrorMessage(error.message);
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
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
              minLength: 8,
              validate: {
                longEnough: (value) =>
                  value.length >= 8 ||
                  "Password must be at least 8 characters long.",
                containsSymbol: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Password must contain at least one special character.",
              },
            })}
            defaultValue=""
            className=" p-2 my-2 border w-full rounded-lg  font-normal bg-[#E6E1FAA3]"
          />
          {errors.email && (
            <p className=" text-red-700 text-sm font-bold brightness-200  ">
              Email is required
            </p>
          )}
        </div>
        <div className="">
          <label className=" text-sm font-medium "> Password</label>
          <input
            type="password"
            placeholder="Min 8 characters"
            {...register("password", {
              required: "Passowrd is Required",
              minLength: 8,
            })}
            defaultValue=""
            className=" p-2 mt-2 w-full border rounded-lg font-normal text-gray-600 bg-[#E6E1FAA3]"
          />
          {errors.password && (
            <p className=" text-red-700  text-sm font-bold brightness-200 ">
              Password is required
            </p>
          )}
        </div>
        <div className=" flex justify-between my-2 ">
          <div className=" flex gap-2 items-center">
            <input type="checkbox" size={50} className="" />
            <p>Remember me</p>
          </div>
          <button className=" text-sm">Sign up</button>
        </div>
        <button
          type="Submit"
          disabled={loading}
          className=" w-full mt-3 bg-[#FFFFFF] text-gray-800 py-3 text-sm font-bold hover:cursor-pointer rounded-lg"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
