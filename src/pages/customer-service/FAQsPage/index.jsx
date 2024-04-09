// @ts-nocheck
import React, { useRef, useState } from "react";
import NavBar from "../../../components/ui/NavBar";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import Footer from "../../../components/ui/Footer";
import PaymentPartners from "../../../components/ui/PaymentPartners";
import HowToReachUs from "../../../components/ui/HowToReachUs";
import { BiMenu } from "react-icons/bi";
import FAQs from "../../../components/ui/FAQSection/FAQs";
import { Helmet } from "react-helmet";
import WhatsappIcon from "../../../components/ui/WhatsappIcon";

function FAQsPage() {
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Frequently Asked Questions (FAQs) | Shuttlelane</title>
      </Helmet>

      {/* FLOATING MENU */}
      {isMenuHidden && (
        <Fade duration={300}>
          <div
            onMouseOver={() => setIsMenuHidden(true)}
            onMouseOut={() => setIsMenuHidden(false)}
            className="fixed flex p-5 justify-center items-center z-[80] bottom-7 right-7 h-auto lg:w-[25%] md:w-[50%] w-[70%]"
          >
            <div
              onMouseOver={() => setIsMenuHidden(true)}
              onMouseOut={() => setIsMenuHidden(false)}
              className="bg-white shadow-lg rounded-lg h-full w-full py-5"
            >
              <h2 className="text-xl font-medium px-5 mb-4 text-shuttlelanePurple">
                Customer Service
              </h2>
              <ul className="text-xs flex flex-col gap-y-1">
                <li className="py-3 px-5 bg-shuttlelanePurple">
                  <Link
                    to="/customer-service/faqs"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
                  >
                    Frequently Asked Questions (FAQs)
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/company/get-in-touch"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Report A Problem
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/customer-service/terms-of-use"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Terms Of Use
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/customer-service/privacy-policy"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Fade>
      )}

      {/* FLOATING MENU ICON */}
      <div
        onMouseOver={() => setIsMenuHidden(true)}
        onMouseOut={() => setIsMenuHidden(false)}
        onClick={() => setIsMenuHidden(!isMenuHidden)}
        className="fixed shadow-lg cursor-pointer hover:animate-spin-slow flex justify-center items-center z-[85] bottom-10 right-10 bg-shuttlelaneGold h-14 w-14 rounded-full"
      >
        <BiMenu
          size={28}
          className={`text-white transition-all ${
            isMenuHidden ? "hidden" : "inline-block"
          }`}
        />

        <AiOutlineClose
          size={28}
          className={`text-white transition-all ${
            !isMenuHidden ? "hidden" : "inline-block"
          }`}
        />
      </div>

      {/* Floating whatsapp icon */}
      <WhatsappIcon pageHasFloatingIcon={true} />

      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={true} />
      </div>

      {/* FAQs */}
      <div className="relative px-7 lg:px-24 pt-44 w-full flex items-center justify-center">
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-shuttlelaneBlack">
                <h3 className="text-3xl lg:text-6xl text-center font-semibold mt-3 leading-[39px]">
                  Frequently Asked Questions (FAQs)
                </h3>
                <div className="flex flex-col text-center gap-y-3 leading-[22px] mt-3">
                  <p className="text-lg font-normal">
                    Here are answers to questions we thought you might have
                  </p>
                </div>
              </div>
            </div>

            <FAQs />
          </div>
        </div>
      </div>

      <HowToReachUs differentHeading="Need Help With Something Else?" />
      <PaymentPartners />
      <Footer />
    </div>
  );
}

export default FAQsPage;
