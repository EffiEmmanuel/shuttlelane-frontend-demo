import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
import { useState } from "react";

// Logos
import ShuttlelaneLogoWhite from "../../../assets/logos/shuttlelane-white.png";
import ShuttlelaneLogoColored from "../../../assets/logos/logo.png";
import { Fade } from "react-awesome-reveal";
import { useWindowScroll } from "@uidotdev/usehooks";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navClass, setNavClass] = useState("");
  const [navClass2, setNavClass2] = useState("");

  const [{ x, y }, scrollTo] = useWindowScroll();

  return (
    <div className="relative z-30">
      <div className={`rec ${navClass} bg-shuttlelanePurple`}></div>
      <div className={`rec2 ${navClass2}`}>
        <nav className="lg:hidden relative z-40 w-full min-h-screen flex flex-col gap-y-12 items-start bg-white py-4 px-8 pl-14 drop-shadow-sm">
          <div className="flex justify-end w-full relative top-4 -right-5">
            <VscClose
              size={26}
              className="cursor-pointer"
              onClick={() => {
                setNavClass("animateFirstRecReverse");
                setNavClass2("animateSecondRecReverse");
              }}
            />
          </div>

          <ul className="flex flex-col w-full gap-y-7">
            <li className="w-full">
              <Link
                to=""
                className="text-xl w-full py-3 px-5 inline-block transition-all hover:text-2xl"
              >
                About Us
              </Link>
            </li>
            <li className="w-full">
              <Link
                to=""
                className="text-xl w-full py-3 px-5 inline-block transition-all hover:text-2xl"
              >
                Services
              </Link>
            </li>
            <li className="w-full">
              <Link
                to=""
                className="text-xl w-full py-3 px-5 inline-block transition-all hover:text-2xl"
              >
                Become a partner
              </Link>
            </li>
            <li className="w-full">
              <Link
                to=""
                className="text-xl w-full py-3 px-5 inline-block transition-all hover:text-2xl"
              >
                Track booking
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* NavBar */}
      <Fade duration={700} delay={300}>
        <nav
          className={`flex justify-between ${
            y > 5 ? "bg-white text-shuttlelaneBlack" : "text-white"
          } items-center transition-all duration-700 py-7 px-8 lg:px-24 drop-shadow-sm`}
        >
          <Link to="/" className="">
            {y > 5 ? (
              <img
                src={ShuttlelaneLogoColored}
                className="object-contain w-36"
              />
            ) : (
              <img src={ShuttlelaneLogoWhite} className="object-contain w-36" />
            )}
          </Link>
          <ul className="hidden lg:flex items-center md:gap-x-12">
            <li>
              <Link to="" className="text-sm">
                About Us
              </Link>
            </li>
            <li>
              <Link to="" className="text-sm">
                Services
              </Link>
            </li>
            <li>
              <Link to="" className="text-sm">
                Become a partner
              </Link>
            </li>
            <li>
              <Link to="" className="text-sm">
                Track booking
              </Link>
            </li>
          </ul>

          <div className="inline-block lg:hidden">
            {/* <IoMenuOutline
              size={26}
              className="cursor-pointer btn"
                onClick={() => setIsMenuOpen(true)}
            /> */}
            <IoMenuOutline
              size={26}
              className="cursor-pointer btn"
              onClick={() => {
                setNavClass("animateFirstRec");
                setNavClass2("animateSecondRec");
                console.log("Hi");
              }}
            />
          </div>
        </nav>
      </Fade>
    </div>
  );
}

export default NavBar;
