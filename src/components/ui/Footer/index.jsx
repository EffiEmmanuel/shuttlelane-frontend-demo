import React from "react";
import FooterLinks from "./FooterLinks";
import shuttlelaneLogo from "../../../assets/logos/shuttlelane-white.png";
import arrowAsset from "../../../assets/images/arrow-asset.svg";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import downloadFromPlaystore from "../../../assets/logos/downloadPlaystore.svg";
import downloadFromAppstore from "../../../assets/logos/downloadAppstore.svg";
// import facebookLogo from "../../../public/images/social-icons/facebook.webp";
// import linkedinLogo from "../../../public/images/social-icons/linkedin.webp";
// import instagramLogo from "../../../public/images/social-icons/instagram.webp";

function Footer() {
  return (
    <footer className="text-white py-20 px-10 relative arrowAssetBg">
      <div className="my-auto lg:flex lg:justify-between w-full relative z-30">
        <div className="w-full lg:w-1/4 ml-5 lg:ml-0">
          <div className="w-36">
            <img
              src={shuttlelaneLogo}
              alt="Shuttlelane Limited"
              className="w-full"
            />
          </div>

          <div className="flex gap-x-3 items-center lg:items-start lg:flex-col gap-y-3 mt-10 mb-5">
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

          <a href="mailto:@blupayfinance@gmail.com" className="font-light">
            info@shuttlelane.com
          </a>

          <p className="font-light w-full mt-10">
            All rights Reserved. © 2023 Shuttlelane Limited.
          </p>
        </div>

        <div className="my-auto px-5 flex flex-col lg:flex-row lg:px-0 align-start justify-between w-full mt-10 flex-wrap">
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
            links={["FAQs", "Blog", "Partnership", "Contact Us"]}
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

      <div className="flex justify-center w-full">
        <p className="text-center text-sm w-full mt-10">
          Designed & Developed by Gethsemane Tech
        </p>
      </div>
    </footer>
  );
}

export default Footer;
