import React, { useState } from "react";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";

function NavLink(props) {
  const [isSubLinksOpen, setIsSubLinksOpen] = useState(false);

  return (
    <li className="relative">
      <div className="">
        <p
          onMouseOver={() => setIsSubLinksOpen(true)}
          onMouseOut={() => setIsSubLinksOpen(false)}
          className={`text-sm cursor-pointer hover:no-underline hover:text-gray-200 transition-colors ${
            props?.y > 5 || props?.isPurpleLogo
              ? "text-shuttlelaneBlack"
              : "text-white"
          }`}
        >
          {props?.title}
        </p>

        {isSubLinksOpen && (
          <div
            onMouseOver={() => setIsSubLinksOpen(true)}
            onMouseOut={() => setIsSubLinksOpen(false)}
            className="h-auto w-full absolute -top-1 left-0 pt-10"
          >
            <Fade up duration={300} distance={"10%"}>
              <div className="bg-white absolute right-0 top-8 h-auto w-auto min-w-[200px] rounded-md text-shuttlelaneBlack py-3 px-4 flex flex-col justify-center gap-y-3">
                {props?.subLinks?.map((link) => {
                  const linkLowerCase = link.toLowerCase();
                  const linkSlug = linkLowerCase.replace(/ /g, "-");
                  return (
                    <Link
                      to={`/${props?.linkHeading}/${linkSlug}`}
                      className="text-gray-500 text-sm hover:text-gray-500 visited:text-gray-500 hover:no-underline visited:no-underline"
                    >
                      {link}
                    </Link>
                  );
                })}
              </div>
            </Fade>
          </div>
        )}
      </div>
    </li>
  );
}

export default NavLink;
