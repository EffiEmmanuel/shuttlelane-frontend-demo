import React from "react";
import FooterLinks from "./FooterLinks";
import shuttlelaneLogo from "../../../assets/logos/shuttlelane-white.png";
import arrowAsset from "../../../assets/images/arrow-asset.svg";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import downloadFromPlaystore from "../../../assets/logos/downloadPlaystore.svg";
import downloadFromAppstore from "../../../assets/logos/downloadAppstore.svg";
import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

function Footer() {
  return (
    <footer className="text-white py-10 px-10 relative bg-[#343A40]">
      <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
        <img
          src={arrowAsset}
          className="object-cover w-full h-full opacity-30 z-0"
        />
      </div>

      <div className="lg:flex lg:pl-14 lg:justify-between w-full relative">
        <div className="px-5 flex flex-col lg:flex-row lg:px-0 align-start justify-between w-full flex-wrap">
          <FooterLinks
            linkHeading="Company"
            links={[
              "About Shuttlelane",
              "Who We Are",
              "Become A Partner",
              "Get In Touch",
            ]}
            isInnerLink={true}
          />

          <div className="lg:w-1/4 w-full lg:flex lg:flex-row lg:justify-end">
            <FooterLinks
              linkHeading="Services"
              links={[
                "Airport Transfer",
                "Car Rental",
                "Priority Pass",
                "Visa on Arrival",
                "Shuttlelane Concierge",
                "Corporate Travel",
                "Wedding Services",
              ]}
              isInnerLink={true}
            />
          </div>

          <div className="lg:w-1/4 w-full lg:flex lg:flex-row lg:justify-end">
            <div className={`my-5 lg:my-0 inline-block`}>
              <h4 className="font-semibold text-lg">Customer Service</h4>
              <ul>
                <li className="mt-3 font-light">
                  <Link
                    className="text-white visited:text-white visited:no-underline hover:no-underline hover:text-gray-200"
                    to={"/customer-service/faqs"}
                  >
                    Frequently Asked Questions (FAQs)
                  </Link>
                </li>
                <li className="mt-3 font-light">
                  <Link
                    className="text-white visited:text-white visited:no-underline hover:no-underline hover:text-gray-200"
                    to={"/customer-service/terms-of-use"}
                  >
                    Terms Of Use
                  </Link>
                </li>
                <li className="mt-3 font-light">
                  <Link
                    className="text-white visited:text-white visited:no-underline hover:no-underline hover:text-gray-200"
                    to={"/customer-service/privacy-policy"}
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/4 w-full lg:flex lg:flex-row lg:justify-center">
            <div className={`my-5 lg:my-0 inline-block`}>
              <h4 className="font-semibold text-lg">Make Booking</h4>
              <ul>
                <li className="mt-3 font-light">
                  <Link
                    className="text-white visited:text-white visited:no-underline hover:no-underline hover:text-gray-200"
                    to={"/"}
                  >
                    Airport Transfer
                  </Link>
                </li>
                <li className="mt-3 font-light">
                  <Link
                    className="text-white visited:text-white visited:no-underline hover:no-underline hover:text-gray-200"
                    to={"/"}
                  >
                    Car Rental
                  </Link>
                </li>
                <li className="mt-3 font-light">
                  <Link
                    className="text-white visited:text-white visited:no-underline hover:no-underline hover:text-gray-200"
                    to={"/"}
                  >
                    Priority Pass
                  </Link>
                </li>
                <li className="mt-3 font-light">
                  <Link
                    className="text-white visited:text-white visited:no-underline hover:no-underline hover:text-gray-200"
                    to={"/"}
                  >
                    Visa On Arrival
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:px-14 px-4 w-full flex lg:justify-end lg:ml-0">
        <div className="flex gap-x-3 items-center lg:items-start lg:flex-row gap-y-3 mt-10 mb-5">
          <img
            src={downloadFromPlaystore}
            alt="Download the Shuttlelane app from the Google Play Store"
            className="w-[130px]"
          />
          <img
            src={downloadFromAppstore}
            alt="Download the Shuttlelane app from the Apple App Store"
            className="w-[130px]"
          />
        </div>
      </div>

      <div className="lg:px-14 px-4">
        <hr className="bg-gray-600" />
      </div>

      <div className="lg:px-14 px-4 flex lg:justify-between lg:flex-row relative z-20">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-3">
            <Link to="https://www.instagram.com/shuttlelane/" target="_blank">
              <AiFillInstagram size={20} className="text-gray-300" />
            </Link>
            <Link to="https://www.facebook.com/shuttlelane1" target="_blank">
              <AiFillFacebook size={20} className="text-gray-300" />
            </Link>
            <Link to="https://www.twitter.com/shuttlelane" target="_blank">
              <FaXTwitter size={20} className="text-gray-300" />
            </Link>
            <Link
              to="https://api.whatsapp.com/send?phone=2349030009108&text=Hello%20Shuttlelane"
              target="_blank"
            >
              <RiWhatsappFill size={20} className="text-gray-300" />
            </Link>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-xs w-full">
              All rights Reserved. © 2023 Shuttlelane Limited.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex pt-10 mt-10 lg:flex-row lg:items-center lg:justify-between flex-col" */}
    </footer>
  );
}

export default Footer;
