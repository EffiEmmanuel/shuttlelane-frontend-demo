import React from "react";
import FooterLinks from "./FooterLinks";
import shuttlelaneLogo from "../../../assets/logos/shuttlelane-white.png";
import arrowAsset from "../../../assets/images/arrow-asset.svg";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail, BiSolidPhone } from "react-icons/bi";
import downloadFromPlaystore from "../../../assets/logos/downloadPlaystore.svg";
import downloadFromAppstore from "../../../assets/logos/downloadAppstore.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white py-10 px-10 relative bg-[#343A40]">
      <div className="absolute overflow-hidden top-0 left-0 w-full h-full">
        <img
          src={arrowAsset}
          className="object-cover w-full h-full opacity-30"
        />
      </div>

      <div className="lg:flex lg:justify-between w-full relative">
        <div className="px-5 flex flex-col lg:flex-row lg:px-0 align-start justify-between w-full flex-wrap">
          <div className="w-full lg:w-1/4 lg:ml-0">
            <div className="w-36">
              <img
                src={shuttlelaneLogo}
                alt="Shuttlelane Limited"
                className="w-full"
              />
            </div>

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

          <div className={`lg:w-1/4 w-full my-5 lg:my-0 mx-auto inline-block`}>
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
      </div>
      {/* <div className="lg:mt-10 px-5 flex-col lg:flex-row lg:px-0 flex justify-between w-full relative z-30">
        <FooterLinks linkHeading="" links={[""]} />
        <FooterLinks
          linkHeading="About"
          links={["About BluPay", "How it works", "Why use Blupay"]}
        />

        <FooterLinks
          linkHeading="Use Cases"
          links={[
            "Individuals",
            "Creators",
            "Businesses",
            "Freelancers",
            "Digital Platforms",
          ]}
          isInnerLink={true}
        />

        <div className="lg:w-1/4 w-full my-5 mx-auto">
          <h4 className="font-semibold text-lg">For Developers</h4>
          <ul>
            <li className="mt-3 font-light italic">
              <a href="/about">Coming Soon!</a>
            </li>
          </ul>
        </div>
      </div> */}

      {/* <div className="flex pt-10 mt-10 lg:flex-row lg:items-center lg:justify-between flex-col" */}
      <div className="flex flex-col mt-10 gap-y-2 justify-center text-center w-full">
        <p className="text-xs w-full">
          All rights Reserved. © 2023 Shuttlelane Limited.
        </p>
        <p className="text-xs w-full">
          Designed & Developed by Gethsemane Tech
        </p>
      </div>
    </footer>
  );
}

export default Footer;
