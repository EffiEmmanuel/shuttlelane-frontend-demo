import React from "react";
import { Helmet } from "react-helmet";

// Images
import ShuttlelaneLogoWhite from "../../../assets/logos/shuttlelane-white.png";
import DriverSignupForm from "../../../forms/driver/SignupForm";

function DriverSignupPage() {
  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>
          Join Shuttlelane as a Driver: Unlock Opportunities and Drive Your
          Success
        </title>
      </Helmet>

      <div className="lg:w-[50vw] h-screen driverSignupBg fixed z-[40] lg:flex justify-center items-center hidden"></div>
      {/* Driver Signup Form */}
      <div className="lg:pl-[50%] w-full max-w-screen h-[89vh] overflow-x-hidden pb-16">
        <DriverSignupForm />
      </div>
    </div>
  );
}

export default DriverSignupPage;
