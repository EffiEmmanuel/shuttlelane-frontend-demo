import React from "react";
import { Link } from "react-router-dom";

function FooterLinks(props) {
  const linkHeadingLowerCase = props.linkHeading.toLowerCase();
  const linkHeadingSlug = linkHeadingLowerCase.replace(/ /g, "-");
  return (
    <div
      className={`lg:w-1/4 w-full my-5 mx-auto ${
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
                <Link to={linkHeadingSlug + "/" + linkSlug}>{link}</Link>
              ) : (
                <Link to={linkSlug}>{link}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FooterLinks;
