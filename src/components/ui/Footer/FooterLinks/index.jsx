import React from "react";
import { Link } from "react-router-dom";

function FooterLinks(props) {
  const linkHeadingLowerCase = props.linkHeading.toLowerCase();
  const linkHeadingSlug = linkHeadingLowerCase.replace(/ /g, "-");

  return (
    <div
      className={`lg:w-auto w-full my-5 lg:my-0 mx-auto ${
        props.linkHeading === "" ? "hidden lg:inline-block" : "inline-block"
      }`}
    >
      <h4 className="font-semibold text-lg">{props.linkHeading}</h4>
      <ul>
        {props.links.map((link) => {
          const linkLowerCase = link.toLowerCase();
          const linkSlug = linkLowerCase.replace(/ /g, "-");

          return (
            <li key={linkSlug} className="mt-3 font-light">
              {props.isInnerLink ? (
                <Link
                  className="text-white visited:text-white visited:no-underline hover:no-underline hover:text-gray-200"
                  to={"/" + linkHeadingSlug + "/" + linkSlug}
                >
                  {link}
                </Link>
              ) : (
                <Link
                  className="text-white visited:text-white visited:no-underline hover:no-underline hover:text-gray-200"
                  to={linkSlug}
                >
                  {link}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FooterLinks;
