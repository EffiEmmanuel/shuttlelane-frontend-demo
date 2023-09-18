import React from "react";
import { Link } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
import { useState } from "react";

// Logos
import ShuttlelaneLogo from "../../../assets/logos/logo.png";
import { Fade } from "react-awesome-reveal";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="relative z-30">
      {/* NavBar */}
      <Fade duration={700} delay={300}>
        <nav className="flex justify-between items-center bg-opacity-[96%] bg-white py-4 px-8 lg:px-24 drop-shadow-sm">
          <Link to="/" className="">
            <img src={ShuttlelaneLogo} className="object-contain w-36" />
          </Link>
          <ul className="hidden lg:flex items-center md:gap-x-12">
            <li>
              <Link to="/company/about-us" className="text-sm">
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
            <IoMenuOutline
              size={26}
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          </div>
        </nav>
      </Fade>

      {isMenuOpen && (
        <Fade duration={700}>
          <nav className="lg:hidden fixed top-0 w-full min-h-screen flex flex-col gap-y-12 items-start bg-white py-4 px-8 drop-shadow-sm">
            <div className="flex justify-end w-full">
              <VscClose
                size={26}
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>

            <ul className="flex flex-col w-full gap-y-7">
              <li className="w-full">
                <Link
                  to="/company/about-us"
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
        </Fade>
      )}
    </div>
  );
}

export default NavBar;
