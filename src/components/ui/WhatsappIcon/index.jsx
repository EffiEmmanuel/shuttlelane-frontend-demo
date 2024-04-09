import { useWindowScroll } from "@uidotdev/usehooks";
import React from "react";
import whatsappLogo from "../../../assets/logos/whatsapp-icon.png";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

export default function WhatsappIcon(props) {
  const [{ x, y }, scrollTo] = useWindowScroll();

  return (
    <div
      className={`fixed ${
        y > 5 && !props?.pageHasFloatingIcon
          ? "flex"
          : props?.pageHasFloatingIcon
          ? "flex"
          : "hidden"
      } p-5 justify-end items-end z-[75] ${
        props?.pageHasFloatingIcon ? "bottom-24" : "bottom-7"
      } right-7 h-auto`}
    >
      <Link to="https://wa.link/9patdd" target="_blank">
        <img
          src={whatsappLogo}
          alt="Send Shuttlelane a message on Whatsapp"
          className="max-w-[43px] w-[43px] min-w-[43px] object-contain"
        />
      </Link>
    </div>
  );
}
