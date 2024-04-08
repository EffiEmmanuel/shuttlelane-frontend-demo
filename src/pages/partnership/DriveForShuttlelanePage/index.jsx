// @ts-nocheck
import React, { useRef, useState } from "react";
import NavBar from "../../../components/ui/NavBar";
import { MdOutlinePayments } from "react-icons/md";
import { AiOutlineCreditCard } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import Footer from "../../../components/ui/Footer";
import PaymentPartners from "../../../components/ui/PaymentPartners";
import HowToReachUs from "../../../components/ui/HowToReachUs";
import { Helmet } from "react-helmet";

function DriveForShuttlelanePage() {
  const howItWorksRef = useRef(null);
  const moreAboutUsRef = useRef(null);

  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>
          Drive for Shuttlelane: Join Our Team of Professional Drivers
        </title>
      </Helmet>

      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={false} />
      </div>

      {/* Drive For Shuttlelane */}
      <div
        className="px-8 relative lg:px-24 py-32 pt-44 min-h-screen flex items-center justify-center driveForShuttlelaneBg"
        ref={howItWorksRef}
      >
        <div className="flex relative z-10 lg:flex-row flex-col lg:justify-between lg:items-center">
          <div className="flex flex-col gap-y-5 lg:w-[100%] w-full">
            <div className="">
              <div className="text-white">
                <h3 className="text-3xl lg:text-6xl text-center font-semibold mt-3 leading-[39px]">
                  Drive For Shuttlelane
                </h3>
                <div className="flex flex-col text-center gap-y-2 leading-[22px] mt-3 lg:max-w-3xl">
                  <p className="text-lg font-normal">
                    Welcome to shuttlelane! You're on the road to success We are
                    proud to be widely regarded as the best in the business and
                    we’re always on the lookout for new driving talent to join
                    our team. We demand a very high standard of service from our
                    drivers, but in return we offer flexibility and great rates.
                  </p>
                </div>

                <div className="w-full flex md:flex-row flex-col items-center justify-center gap-x-4 gap-y-3 mt-5">
                  <button
                    onClick={() => {
                      moreAboutUsRef.current.scrollIntoView({
                        behaviour: "smooth",
                      });
                    }}
                    className="h-12 p-3 bg-transparent hover:text-shuttlelaneBlack border-[.5px] border-white transition-all hover:bg-shuttlelaneLightPurple visited:text-white hover:no-underline visited:no-underline text-white rounded-lg text-sm w-44 inline-block flex justify-center items-center "
                  >
                    Learn More
                  </button>
                  <Link
                    to="/driver/signup"
                    className="flex justify-center items-center gap-x-2 h-12 p-3 bg-shuttlelaneLightPurple hover:text-white border-[.5px] hover:border-white transition-all hover:bg-transparent visited:text-shuttlelaneBlack hover:no-underline visited:no-underline text-shuttlelaneBlack rounded-lg text-sm w-44 inline-block flex justify-center items-center "
                  >
                    <span>Become a driver</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Shuttlelane? */}
      <div
        ref={moreAboutUsRef}
        className="px-8 lg:px-24 overflow-hidden text-white bg-white min-h-[70vh] py-20 relative"
      >
        <Fade direction="up" duration={800}>
          <div className="w-full flex flex-col items-center justify-center text-shuttlelaneBlack text-center">
            <h2 className="text-3xl font-semibold mt-3 max-w-xl leading-[39px]">
              Why Shuttlelane?
            </h2>
            <p className="text-shuttlelaneBlack text-sm">
              Reasons to drive with Shuttlelane
            </p>
          </div>
        </Fade>

        <div className="mt-5 flex justify-center gap-x-5 items-center flex-wrap gap-y-14 py-8">
          <div className="flex flex-col gap-x-6 items-center min-w-[450px] w-[450px]">
            <div className="h-16 w-16 rounded-full bg-shuttlelanePurple flex justify-center items-center">
              <MdOutlinePayments size={25} className="text-white" />
            </div>

            <div className="flex flex-col gap-y-1 text-center mt-3">
              <h1 className="text-2xl text-shuttlelanePurple">Earn Good</h1>
              <p className="text-shuttlelaneBlack">
                Get paid for each job you complete.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-x-6 items-center min-w-[450px] w-[450px]">
            <div className="h-16 w-16 rounded-full bg-shuttlelanePurple flex justify-center items-center">
              <AiOutlineCreditCard size={25} className="text-white" />
            </div>

            <div className="flex flex-col gap-y-1 text-center mt-3">
              <h1 className="text-2xl text-shuttlelanePurple">
                Be your own boss
              </h1>
              <p className="text-shuttlelaneBlack">
                Control which jobs you accept or decline.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-x-5 items-center flex-wrap gap-y-14 py-8">
          <div className="flex flex-col gap-x-6 items-center min-w-[450px] w-[450px]">
            <div className="h-16 w-16 rounded-full bg-shuttlelanePurple flex justify-center items-center">
              <MdOutlinePayments size={25} className="text-white" />
            </div>

            <div className="flex flex-col gap-y-1 text-center mt-3">
              <h1 className="text-2xl text-shuttlelanePurple">
                Meet interesting people
              </h1>
              <p className="text-shuttlelaneBlack">
                Get paid for each job you complete.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-x-6 items-center min-w-[450px] w-[450px]">
            <div className="h-16 w-16 rounded-full bg-shuttlelanePurple flex justify-center items-center">
              <AiOutlineCreditCard size={25} className="text-white" />
            </div>

            <div className="flex flex-col gap-y-1 text-center mt-3">
              <h1 className="text-2xl text-shuttlelanePurple">
                Weekly Payment
              </h1>
              <p className="text-shuttlelaneBlack">
                Control which jobs you accept or decline.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-x-5 items-center flex-wrap gap-y-14 py-8">
          <div className="flex flex-col gap-x-6 items-center min-w-[450px] w-[450px]">
            <div className="h-16 w-16 rounded-full bg-shuttlelanePurple flex justify-center items-center">
              <MdOutlinePayments size={25} className="text-white" />
            </div>

            <div className="flex flex-col gap-y-1 text-center mt-3">
              <h1 className="text-2xl text-shuttlelanePurple">
                Flexible working hours
              </h1>
              <p className="text-shuttlelaneBlack">
                Get paid for each job you complete.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Shuttlelane Selection Process */}
      <div
        ref={moreAboutUsRef}
        className="px-8 lg:px-24 overflow-hidden text-white bg-shuttlelaneLightPurple py-20 relative"
      >
        <Fade direction="up" duration={800}>
          <div className="w-full flex flex-col items-center justify-center text-shuttlelaneBlack text-center">
            <h2 className="text-3xl font-semibold mt-3 max-w-xl leading-[39px]">
              Shuttlelane Selection Process
            </h2>
            <p className="text-shuttlelaneBlack">
              Every driver is carefully handpicked and assessed by the
              Shuttlelane team.
            </p>
          </div>
        </Fade>

        <div className="w-full flex md:flex-row flex-col items-center justify-center gap-x-4 gap-y-3 mt-5">
          <Link
            to="/driver/signup"
            className="h-12 p-3 bg-transparent hover:text-gray-400 border-[.5px] hover:border-gray-400 border-shuttlelaneBlack transition-all visited:text-shuttlelaneBlack hover:no-underline visited:no-underline text-shuttlelaneBlack rounded-lg text-sm w-44 inline-block flex justify-center items-center "
          >
            Become a driver
          </Link>
        </div>
      </div>

      {/* How To Reach Us */}
      <HowToReachUs />
      <PaymentPartners />
      <Footer />
    </div>
  );
}

export default DriveForShuttlelanePage;
