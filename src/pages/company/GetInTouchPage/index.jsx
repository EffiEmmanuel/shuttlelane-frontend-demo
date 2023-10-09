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

function GetInTouchPage() {
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
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
                Company
              </h2>
              <ul className="text-xs flex flex-col gap-y-1">
                <li className="py-3 px-5">
                  <Link
                    to="/company/about-shuttlelane"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    About Shuttlelane
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/company/who-we-are"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Who We Are
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/company/partnership"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Become A Partner
                  </Link>
                </li>
                <li className="py-3 px-5 bg-shuttlelanePurple text-white">
                  <Link
                    to="/company/get-in-touch"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
                  >
                    Get In Touch
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

      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={true} />
      </div>

      {/* Google Maps */}
      <div className="relative h-[70vh] w-full flex items-center justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.0243176254306!2d3.3665646283986717!3d6.5093706995909955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c448e2f97c3%3A0xc95f24c00955aecc!2sShuttlelane!5e0!3m2!1sen!2sng!4v1696553675843!5m2!1sen!2sng"
          width="800"
          height="600"
          style={{ border: 0, width: "100%", height: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-white">
                <h3 className="text-3xl lg:text-6xl text-center font-semibold mt-3 leading-[39px]">
                  Become A Partner
                </h3>
                <div className="flex flex-col text-center gap-y-3 leading-[22px] mt-3">
                  <p className="text-lg font-normal">
                    As a customer-oriented company constantly striving for
                    excellence, we are always on the lookout for opportunities
                    to expand our reach and more importantly, improving on the
                    quality of service rendered to our customers. We are open to
                    mutually beneficial partnerships in various capacities. If
                    you wish to partner with us, kindly choose the service that
                    applies to you below
                  </p>
                </div>

                <div
                  onClick={() => {
                      behaviour: "smooth",
                    });
                  }}
                  className="cursor-pointer flex flex-col items-center mt-20 justify-center w-full"
                >
                  <div className="h-7 w-7 p-1 rounded-full border-[.5px] border-white flex justify-center items-center animate-bounce-slow">
                    <FiArrowDown size={24} />
                  </div>
                  <p className="text-sm">Choose service</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Address info and "Get In Touch" form */}
      <div className="lg:min-h-[90vh] px-7 lg:px-24 py-20 pb-10 gap-x-10 flex lg:flex-row flex-col gap-y-20 justify-between bg-white">
        {/* Address info */}
        <div className="w-full lg:w-2/4 flex text-shuttlelaneBlack flex-col gap-y-7">
          <h4 className="text-sm font-normal">
            <span className="font-semibold">Address:</span> No. 2, Martins
            Street, Off Ojuelegba Road, Yaba, Lagos, Nigeria.
          </h4>
          <h4 className="text-sm font-normal">
            <span className="font-semibold">For General Enquiries:</span>{" "}
            <a
              className="text-shuttlelaneBlack hover:text-shuttlelanePurple"
              href="mailto:info@shuttlelane.com"
            >
              info@shuttlelane.com
            </a>
            ,{" "}
            <a
              className="text-shuttlelaneBlack hover:text-shuttlelanePurple"
              href="tel:+2349030009452"
            >
              +234 903 000 9452
            </a>
            , or{" "}
            <a
              className="text-shuttlelaneBlack hover:text-shuttlelanePurple"
              href="tel:+2349030009486"
            >
              +234 903 000 9486{" "}
            </a>
          </h4>
          <h4 className="text-sm font-normal">
            <span className="font-semibold">For Booking Enquiries:</span>{" "}
            <a
              className="text-shuttlelaneBlack hover:text-shuttlelanePurple"
              href="mailto:booking@shuttlelane.com"
            >
              booking@shuttlelane.com
            </a>
          </h4>
          <h4 className="text-sm font-normal">
            <span className="font-semibold">WhatsApp:</span>{" "}
            <a
              className="text-shuttlelaneBlack hover:text-shuttlelanePurple"
              href="tel:+2349030009108"
            >
              +234 903 000 9108
            </a>
          </h4>
        </div>

        {/* "Get In Touch" form */}
        <div className="w-full lg:w-2/4 flex text-shuttlelaneBlack flex-col gap-y-7">
          <div className="flex text-shuttlelaneBlack flex-col justify-center">
            <h2 className="text-3xl font-semibold leading-[39px]">
              Get in Touch
            </h2>
            <h4 className="text-sm font-normal">Send us a message</h4>
          </div>
          <form className="w-full flex flex-col gap-y-4">
            <div className="w-full flex flex-col gap-y-1">
              <label htmlFor="fullName" className="text-xs text-gray-500">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <label htmlFor="email" className="text-xs text-gray-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="abc@example.com"
                className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <label htmlFor="message" className="text-xs text-gray-500">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Type your message here..."
                className="w-full h-32 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
              >
                {" "}
              </textarea>
            </div>

            <input
              type="submit"
              className="w-full lg:w-32 h-12 p-3 hover:border-[.5px] transition-all hover:bg-transparent hover:border-shuttlelanePurple hover:text-shuttlelanePurple bg-shuttlelanePurple text-white outline-none focus:outline-none rounded-lg text-sm"
              value="Submit"
            />
          </form>
        </div>
      </div>

      {/* How To Reach Us */}
      <div className="bg-shuttlelaneLightPurple">
        <HowToReachUs />
      </div>
      <PaymentPartners />
      <Footer />
    </div>
  );
}

export default GetInTouchPage;
