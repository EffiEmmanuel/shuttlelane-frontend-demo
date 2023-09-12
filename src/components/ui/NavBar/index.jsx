import React from "react";
import { Link } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
import { useState } from "react";

// Logos
import ShuttlelaneLogo from "../../../assets/logos/logo.png";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="">
      {/* NavBar */}
      <nav className="flex justify-between items-center bg-opacity-[96%] bg-white py-4 px-8 lg:px-24 drop-shadow-sm">
        <Link to="/" className="">
          <img src={ShuttlelaneLogo} className="object-contain w-36" />
        </Link>
        <ul className="hidden lg:flex items-center md:gap-x-12">
          <li>
            <Link to="" className="text-sm">
              How it works
            </Link>
          </li>
          <li>
            <Link to="" className="text-sm">
              Discover
            </Link>
          </li>
          <li>
            <Link to="" className="text-sm">
              Sign in
            </Link>
          </li>
          <li>
            <Link to="" className="text-sm">
              Start a BoomRang
            </Link>
          </li>
        </ul>

        <div className="inline-block lg:hidden">
          <IoMenuOutline size={26} />
          <VscClose size={26} />
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
