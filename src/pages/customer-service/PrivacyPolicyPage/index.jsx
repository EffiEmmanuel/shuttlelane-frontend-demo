// @ts-nocheck
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import { BiArrowBack, BiMenu } from "react-icons/bi";
import { Helmet } from "react-helmet";
import WhatsappIcon from "../../../components/ui/WhatsappIcon";

function PrivacyPolicyPage() {
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Privacy Policy | Shuttlelane</title>
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
                <li className="py-3 px-5">
                  <Link
                    to="/customer-service/faqs"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
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
                <li className="py-3 px-5 bg-shuttlelanePurple">
                  <Link
                    to="/customer-service/privacy-policy"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
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
      {isMenuHidden === true && <WhatsappIcon pageHasFloatingIcon={true} />}

      {/* Back to homepage button */}
      <div className="bg-white h-32 w-full px-7 py-14 lg:px-24">
        <Link
          to="/"
          className="h-12 transition-all flex items-center gap-x-1 p-3 bg-transparent text-shuttlelaneBlack border-[.5px] border-shuttlelaneBlack transition-all hover:bg-shuttlelaneLightPurple visited:text-shuttlelaneBlack hover:no-underline visited:no-underline text-shuttlelaneBlack text-sm w-64 inline-block flex justify-center items-center "
        >
          <BiArrowBack size={16} />
          <span className="text-sm">Back to Homepage</span>
        </Link>
      </div>

      {/* PRIVACY POLICY */}
      <div className="relative bg-shuttlelaneLightPurple px-7 lg:px-24 py-10 w-full">
        <div className="text-shuttlelaneBlack">
          <h3 className="text-3xl text-left font-semibold mt-3 leading-[39px]">
            PRIVACY POLICY
          </h3>
          <div className="flex flex-col text-left gap-y-2 leading-[22px] mt-5">
            <p className="text-[1rem] font-normal">
              Shuttlelane is committed to protecting your privacy and takes the
              responsibility regarding the security of our customers'
              information very seriously.
            </p>
          </div>

          <div className="flex text-[1rem] flex-col text-left gap-y-2 leading-[26px] mt-5">
            <ol className="list-disc pl-14 flex flex-col gap-y-3">
              <li>
                Shuttlelane collates your information solely for the purpose of
                making your booking. Information “Phone Number Only” is
                necessarily passed on to the chauffeur or service partner
                responsible for fulfilling your journey.
              </li>
              <li>
                Shuttlelane does not share, sell, trade or rent your personal
                information with any other parties.
              </li>
              <li>
                Shuttlelane is committed to protecting your privacy and takes
                the responsibility regarding the security of our customers'
                information very seriously.
              </li>
              <li>
                Shuttlelane collects information required to manage your airport
                transfer booking and for improving the service provided to
                customers. The information includes the name, email, mobile
                phone number, pick up and drop off information, times and dates
                of the journeys carried out and flight information.
              </li>
              <li>
                Payment card details are not retained by Shuttlelane as payments
                are processed directly by our payment partners (Stripe, PayPal
                and Flutterwave) via the payment portal.
              </li>
              <li>
                The user must provide a valid and correct passenger name,
                telephone number and email address when placing a booking.
              </li>
              <li>
                Shuttlelane does not accept any responsibility for any errors
                and subsequent miscommunication as a result.
              </li>
              <li>
                You will not be sent marketing messages or e-mails from third
                parties.
              </li>
              <li>
                Shuttlelane needs the email address and phone number in other to
                send confirmation of the booking. Shuttlelane may send updates
                regarding any changes to Shuttlelane services in the future.
              </li>
              <li>
                Shuttlelane needs the email address and phone number in order to
                send confirmation of the booking. Shuttlelane may send updates
                regarding any changes to Shuttlelane services in the future.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
