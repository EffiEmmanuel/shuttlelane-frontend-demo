import React from "react";
// images
import shuttlelaneSLogo from "../../../assets/logos/icon.png";

function Preloader() {
  return (
    <div className="fixed top-0 left-0 w-[100%] h-screen bg-white flex justify-center items-center z-[100]">
      <div className="h-20 w-20 bg-white  shadow-lg rounded-full flex items-center justify-center p-1 animate-pulse">
        <img
          src={shuttlelaneSLogo}
          alt=""
          className="h-14 w-14 object-contain"
        />
      </div>
    </div>
  );
}

export default Preloader;
