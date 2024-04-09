import React from "react";
import { Link } from "react-router-dom";
import pageNotFoundImage from "../../assets/images/404.svg";
import NavBar from "../../components/ui/NavBar";

export default function PageNotFound() {
  return (
    <div>
      <div className="w-full">
        <NavBar isPurpleLogo={true} />
      </div>
      <div className="px-8 relative bg-white lg:px-24 py-10 min-h-screen flex items-center justify-center">
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-shuttlelaneBlack">
                <div className="flex flex-col text-center justify-center -mt-16">
                  <div className="w-full flex flex-row justify-center">
                    <img
                      src={pageNotFoundImage}
                      alt="Page not found"
                      className="w-[140px] object-contain"
                    />
                  </div>

                  <h1 className="text-3xl lg:text-6xl text-center font-bold mt-7 mb-4 leading-[39px]">
                    Page Not Found
                  </h1>
                  <p className="">
                    The page you are looking for does not exist
                  </p>
                </div>
                <div className="flex flex-col text-center gap-y-3 leading-[22px] mt-3">
                  <Link to="/" className="text-lg font-normal">
                    Go back to homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
