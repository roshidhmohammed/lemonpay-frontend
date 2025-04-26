import React, { useEffect, useState } from "react";

// logos
import lemonpayLogo from "../assets/lemonpayLogo.svg";
import ellipse1 from "../assets/ellipse1.svg";
import ellipse2 from "../assets/ellipse2.svg";
import ellipse3 from "../assets/ellipse3.svg";
import lemonpayLogoMobile from "../assets/lemonpayLogoMobile.svg";
import ellipse1Mobile from "../assets/ellipse1Mobile.svg";
import ellipse3Mobile from "../assets/ellipse2Mobile.svg";

// components
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginSignupPageContainer = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [currentComponent, setCurrentComponent] = useState("Sign In");

  useEffect(() => {
    user?.userInfo && navigate("/view-task");
  }, []);
  return (
    <div
      className=" w-full h-screen  bg-cover relative "
      style={{
        background:
          "linear-gradient(169.08deg, #FFFFFF 10.71%, #183BA3 63.01%)",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="flex justify-center md:block">
        <img
          src={lemonpayLogo}
          alt="logo"
          className=" md:block hidden md:pt-[50px] md:pl-[27px]"
        />
        <img
          src={lemonpayLogoMobile}
          alt="mobile-logo"
          className="md:hidden block mt-5"
        />
      </div>
      <div>
        <img
          src={ellipse1}
          alt="bg-ellipse1"
          className=" absolute right-0 top-0 bg-cover opacity-20 md:block hidden"
        />
        <img
          src={ellipse1Mobile}
          alt="bg-ellipse1"
          className=" absolute right-0 top-20 h-60 bg-cover opacity-20 md:hidden block"
        />
        <img
          src={ellipse2}
          alt="bg-ellipse1"
          className=" absolute left-[35%] right-[35%] bottom-0 bg-cover opacity-20 md:block hidden"
        />
        <img
          src={ellipse3}
          alt="bg-ellipse1"
          className=" absolute left-0 bottom-0 bg-cover opacity-20 md:block hidden"
        />
        <img
          src={ellipse3Mobile}
          alt="bg-ellipse1"
          className=" absolute left-0 bottom-0 h-40 bg-cover opacity-20 md:hidden block"
        />
      </div>
      <div
        className={` flex md:justify-between justify-center md:mx-10  items-end ${
          currentComponent === "Sign In" ? "mt-10" : "mt-0"
        }`}
      >
        <div className="  font-[600] lg:text-5xl text-3xl md:block hidden pb-5 ">
          <h1 className="text-[#FFFFFF] mb-2 tracking-wider">
            Join 8 Million Business
          </h1>
          <h1 className=" text-[#DBD55B] mb-2">Powering Growth with</h1>
          <h1 className="text-[#FFFFFF] tracking-wider">Lemonpay!</h1>
        </div>
        {currentComponent === "Sign In" ? (
          <LoginPage setCurrentComponent={setCurrentComponent} />
        ) : (
          <SignupPage setCurrentComponent={setCurrentComponent} />
        )}
      </div>
    </div>
  );
};

export default LoginSignupPageContainer;
