import React from "react";
import VendorSignupForm from "../../../forms/vendor/SignupForm";
import NavBar from "../../../components/ui/NavBar";

// Images
import ShuttlelaneLogoWhite from "../../../assets/logos/shuttlelane-white.png";

function VendorSignupPage() {
  return (
    <div className="flex min-h-screen">
      <div className="lg:w-[50vw] h-screen overflow-hidden vendorSignupBg fixed z-[40] lg:flex justify-center items-center hidden">
        <div className="flex flex-col gapy-y-10">
          <h1 className="text-[17rem] spaceGroteskText text-white opacity-5">
            Vendor
          </h1>
        </div>
      </div>
      {/* Vendor Signup Form */}
      <div className="lg:pl-[50%] w-full max-w-screen h-[89vh] overflow-x-hidden pb-16">
        <VendorSignupForm />
      </div>
    </div>
  );
}

export default VendorSignupPage;
