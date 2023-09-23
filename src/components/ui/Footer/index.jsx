import React from "react";
import FooterLinks from "./FooterLinks";
import shuttlelaneLogo from "../../../assets/logos/shuttlelane-white.png";
import arrowAsset from "../../../assets/images/arrow-asset.svg";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail, BiSolidPhone } from "react-icons/bi";
import downloadFromPlaystore from "../../../assets/logos/downloadPlaystore.svg";
import downloadFromAppstore from "../../../assets/logos/downloadAppstore.svg";
// import facebookLogo from "../../../public/images/social-icons/facebook.webp";
// import linkedinLogo from "../../../public/images/social-icons/linkedin.webp";
// import instagramLogo from "../../../public/images/social-icons/instagram.webp";

function Footer() {
  return (
    <footer className="text-white py-10 px-10 relative arrowAssetBg">
      <div className="lg:flex lg:justify-between w-full relative">
        <div className="px-5 flex flex-col lg:flex-row lg:px-0 align-start justify-between w-full flex-wrap">
          <div className="w-full lg:w-1/4 lg:ml-5 lg:ml-0">
            <div className="w-36">
              <img
                src={shuttlelaneLogo}
                alt="Shuttlelane Limited"
                className="w-full"
              />
            </div>

            {/* <div className="flex gap-x-3 items-center lg:items-start lg:flex-row gap-y-3 mt-10 mb-5">
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
          </div> */}

            <div className="flex flex-col gap-y-2 mt-5">
              <div className="flex items-center gap-x-2">
                <BiLogoGmail size={14} className="text-white" />
                <a
                  href="mailto:@blupayfinance@gmail.com"
                  className="font-light text-sm"
                >
                  info@shuttlelane.com
                </a>
              </div>

              <div className="flex items-center gap-x-2">
                <BiSolidPhone size={14} className="text-white" />
                <a href="tel:+2349030009452" className="font-light text-sm">
                  +234 903 000 9452
                </a>
              </div>

              <div className="flex items-center gap-x-2">
                <IoLogoWhatsapp size={14} className="text-white" />
                <a href="tel:+2349030009108" className="font-light text-sm">
                  +234 903 000 9108
                </a>
              </div>
            </div>
          </div>

          <FooterLinks
            linkHeading="Services"
            links={[
              "Airport Transfer",
              "Car Rental",
              "Priority Pass",
              "Visa on Arrival",
              "Corporate Travel",
              "Wedding Services",
            ]}
            isInnerLink={true}
          />

          <FooterLinks
            linkHeading="Company"
            links={["About Us", "FAQs", "Blog", "Partnership", "Contact Us"]}
            isInnerLink={true}
          />

          <FooterLinks
            linkHeading="Legal"
            links={["Privacy Policy", "Terms of Use"]}
            isInnerLink={true}
          />
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
