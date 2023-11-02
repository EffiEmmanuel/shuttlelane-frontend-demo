import React from "react";
import NavBar from "../../../components/ui/NavBar";
import { FiThumbsUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { TbTie } from "react-icons/tb";
import { MdLocationPin, MdLuggage, MdPeople, MdPerson } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// Images
import economy from "../../../assets/images/cars/economy.png";
import business from "../../../assets/images/cars/business.png";
import executive from "../../../assets/images/cars/executive.png";
import luxury from "../../../assets/images/cars/luxury.png";
import shuttle from "../../../assets/images/cars/shuttle.png";
import shuttleExtra from "../../../assets/images/cars/shuttleExtra.png";
import { IoCarSportSharp } from "react-icons/io5";

function ConfirmBookingPage() {
  return (
    <div className="relative bg-white text-shuttlelaneBlack">
      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={true} />
      </div>

      <div className="min-h-screen w-full bg-[#f1f1f1] flex justify-center">
        <div className="lg:px-24 px-7 py-32 w-full">
          <div className="bg-shuttlelanePurple p-7 w-full hidden lg:flex justify-between">
            <div className="w-[33.3%] flex items-center gap-x-2">
              <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
                <FiThumbsUp size={20} />
              </div>

              <div className="fle flex-col gap-y-1 text-white">
                <p className="font-semibold">Travellers rate us excellent</p>
                <small className="text-xs">
                  4.9 / 5 average{" "}
                  <Link
                    to="https://trustpilot.com"
                    className="text-white text-xs underline visited:text-white"
                  >
                    50 reviews
                  </Link>
                </small>
              </div>
            </div>
            <div className="w-[33.3%] flex items-center gap-x-2">
              <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
                <TbTie size={20} />
              </div>

              <div className="flex flex-col gap-y-1 text-white">
                <p className="font-semibold">Best drivers in Lagos</p>
                <small className="text-xs inline-block">
                  We handpick the friendliest, professional, english-speaking
                  drivers
                </small>
              </div>
            </div>
            <div className="w-[33.3%] flex items-center gap-x-2">
              <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
                <IoMdTime size={20} />
              </div>

              <div className="fle flex-col gap-y-1 text-white">
                <p className="font-semibold">Always on time</p>
                <small className="text-xs">
                  Our drivers monitor the flights in case of delays
                </small>
              </div>
            </div>
          </div>
          <div className="bg-shuttlelanePurple p-7 w-full h-auto flex-col lg:hidden justify-between">
            <Slide
              transitionDuration={500}
              arrows={false}
              pauseOnHover={false}
              duration={4000}
              canSwipe={true}
              indicators={true}
            >
              <div className="w-full flex items-center gap-x-2">
                <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
                  <FiThumbsUp size={20} />
                </div>

                <div className="fle flex-col gap-y-1 text-white">
                  <p className="font-semibold">Travellers rate us excellent</p>
                  <small className="text-xs">
                    4.9 / 5 average{" "}
                    <Link
                      to="https://trustpilot.com"
                      className="text-white text-xs underline visited:text-white"
                    >
                      50 reviews
                    </Link>
                  </small>
                </div>
              </div>
              <div className="w-full flex items-center gap-x-2">
                <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
                  <TbTie size={20} />
                </div>

                <div className="flex flex-col gap-y-1 text-white">
                  <p className="font-semibold">Best drivers in Lagos</p>
                  <small className="text-xs inline-block">
                    We handpick the friendliest, professional, english-speaking
                    drivers
                  </small>
                </div>
              </div>
              <div className="w-full flex items-center gap-x-2">
                <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
                  <IoMdTime size={20} />
                </div>

                <div className="fle flex-col gap-y-1 text-white">
                  <p className="font-semibold">Always on time</p>
                  <small className="text-xs">
                    Our drivers monitor the flights in case of delays
                  </small>
                </div>
              </div>
            </Slide>
          </div>

          <div className="mt-5 w-full flex lg:flex-row flex-col gap-x-4">
            <div className="lg:w-[65%] w-full">
              <div className="bg-white p-7">
                <p className="text-xl font-semibold">Pick Your Car</p>

                {/* Cars */}
                <div className="flex flex-col gap-y-14 mt-10">
                  <div className="w-full flex lg:flex-row flex-col lg:items-center gap-x-5 gap-y-4 pb-3">
                    <div className="lg:w-[20%] w-full">
                      <img
                        src={economy}
                        className="object-contain w-[170px]"
                        alt="Economy Class"
                      />
                    </div>

                    <div className="lg:w-[55%] w-full flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <p className="font-semibold text-lg">Economy</p>

                        <div className="flex items-center justify-center gap-x-2 p-1 border-[.3px] border-shuttlelaneBlack rounded-full min-w-[80px] border-dashed">
                          <div className="flex items-center">
                            <MdLuggage
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">4</span>
                          </div>
                          <div className="flex items-center">
                            <MdPerson
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">2</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        The most economic and popular class suitable for most
                        trips. Promises a smooth and convenient ride. Can
                        accommodate up to 4 passengers and 2 luggages.
                      </p>
                    </div>
                    <div className="lg:w-[25%] w-full flex flex-col text-left lg:text-right gap-y-1">
                      <p className="font-bold text-lg">₦25,000</p>
                      <button className="border-[.3px] border-shuttlelaneBlack text-sm rounded-lg p-2">
                        Select
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex lg:flex-row flex-col lg:items-center gap-x-5 gap-y-4 pb-3">
                    <div className="lg:w-[20%] w-full">
                      <img
                        src={business}
                        className="object-contain w-[170px]"
                        alt="Business Class"
                      />
                    </div>

                    <div className="lg:w-[55%] w-full flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <p className="font-semibold text-lg">Business</p>

                        <div className="flex items-center justify-center gap-x-2 p-1 border-[.3px] border-shuttlelaneBlack rounded-full min-w-[80px] border-dashed">
                          <div className="flex items-center">
                            <MdLuggage
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">4</span>
                          </div>
                          <div className="flex items-center">
                            <MdPerson
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">2</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        The most economic and popular class suitable for most
                        trips. Promises a smooth and convenient ride. Can
                        accommodate up to 4 passengers and 2 luggages.
                      </p>
                    </div>
                    <div className="lg:w-[25%] w-full flex flex-col text-left lg:text-right gap-y-1">
                      <p className="font-bold text-lg">₦25,000</p>
                      <button className="border-[.3px] border-shuttlelaneBlack text-sm rounded-lg p-2">
                        Select
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex lg:flex-row flex-col lg:items-center gap-x-5 gap-y-4 pb-3">
                    <div className="lg:w-[20%] w-full">
                      <img
                        src={executive}
                        className="object-contain w-[170px]"
                        alt="Executive Class"
                      />
                    </div>

                    <div className="lg:w-[55%] w-full flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <p className="font-semibold text-lg">Executive</p>

                        <div className="flex items-center justify-center gap-x-2 p-1 border-[.3px] border-shuttlelaneBlack rounded-full min-w-[80px] border-dashed">
                          <div className="flex items-center">
                            <MdLuggage
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">4</span>
                          </div>
                          <div className="flex items-center">
                            <MdPerson
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">2</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        The most economic and popular class suitable for most
                        trips. Promises a smooth and convenient ride. Can
                        accommodate up to 4 passengers and 2 luggages.
                      </p>
                    </div>
                    <div className="lg:w-[25%] w-full flex flex-col text-left lg:text-right gap-y-1">
                      <p className="font-bold text-lg">₦25,000</p>
                      <button className="border-[.3px] border-shuttlelaneBlack text-sm rounded-lg p-2">
                        Select
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex lg:flex-row flex-col lg:items-center gap-x-5 gap-y-4 pb-3">
                    <div className="lg:w-[20%] w-full">
                      <img
                        src={luxury}
                        className="object-contain w-[170px]"
                        alt="Luxury Class"
                      />
                    </div>

                    <div className="lg:w-[55%] w-full flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <p className="font-semibold text-lg">Luxury</p>

                        <div className="flex items-center justify-center gap-x-2 p-1 border-[.3px] border-shuttlelaneBlack rounded-full min-w-[80px] border-dashed">
                          <div className="flex items-center">
                            <MdLuggage
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">4</span>
                          </div>
                          <div className="flex items-center">
                            <MdPerson
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">2</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        The most economic and popular class suitable for most
                        trips. Promises a smooth and convenient ride. Can
                        accommodate up to 4 passengers and 2 luggages.
                      </p>
                    </div>
                    <div className="lg:w-[25%] w-full flex flex-col text-left lg:text-right gap-y-1">
                      <p className="font-bold text-lg">₦25,000</p>
                      <button className="border-[.3px] border-shuttlelaneBlack text-sm rounded-lg p-2">
                        Select
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex lg:flex-row flex-col lg:items-center gap-x-5 gap-y-4 pb-3">
                    <div className="lg:w-[20%] w-full">
                      <img
                        src={shuttle}
                        className="object-contain w-[170px]"
                        alt="Shuttle Class"
                      />
                    </div>

                    <div className="lg:w-[55%] w-full flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <p className="font-semibold text-lg">Shuttle</p>

                        <div className="flex items-center justify-center gap-x-2 p-1 border-[.3px] border-shuttlelaneBlack rounded-full min-w-[80px] border-dashed">
                          <div className="flex items-center">
                            <MdLuggage
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">4</span>
                          </div>
                          <div className="flex items-center">
                            <MdPerson
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">2</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        The most economic and popular class suitable for most
                        trips. Promises a smooth and convenient ride. Can
                        accommodate up to 4 passengers and 2 luggages.
                      </p>
                    </div>
                    <div className="lg:w-[25%] w-full flex flex-col text-left lg:text-right gap-y-1">
                      <p className="font-bold text-lg">₦25,000</p>
                      <button className="border-[.3px] border-shuttlelaneBlack text-sm rounded-lg p-2">
                        Select
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex lg:flex-row flex-col lg:items-center gap-x-5 gap-y-4 pb-3">
                    <div className="lg:w-[20%] w-full">
                      <img
                        src={shuttleExtra}
                        className="object-contain w-[170px]"
                        alt="Shuttle Extra Class"
                      />
                    </div>

                    <div className="lg:w-[55%] w-full flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <p className="font-semibold text-lg">Shuttle Extra</p>

                        <div className="flex items-center justify-center gap-x-2 p-1 border-[.3px] border-shuttlelaneBlack rounded-full min-w-[80px] border-dashed">
                          <div className="flex items-center">
                            <MdLuggage
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">4</span>
                          </div>
                          <div className="flex items-center">
                            <MdPerson
                              size={16}
                              className="text-shuttlelaneBlack"
                            />
                            <span className="text-xs">2</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        The most economic and popular class suitable for most
                        trips. Promises a smooth and convenient ride. Can
                        accommodate up to 4 passengers and 2 luggages.
                      </p>
                    </div>
                    <div className="lg:w-[25%] w-full flex flex-col text-left lg:text-right gap-y-1">
                      <p className="font-bold text-lg">₦25,000</p>
                      <button className="border-[.3px] border-shuttlelaneBlack text-sm rounded-lg p-2">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[35%] w-full mt-10 lg:mt-0">
              <div className="bg-white p-7">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">Booking Summary</p>
                  <button className="underline text-xs">Edit</button>
                </div>
                <div className="mt-10">
                  <div className="flex flex-col gap-y-4">
                    <div className="flex gap-x-1">
                      <MdLocationPin size={16} />
                      <div className="flex flex-col gap-y-1">
                        <span className="text-xs font-medium">
                          Murtala Mohammed International Airport, Lagos
                        </span>
                        <span className="text-xs">
                          19, October 2023. 9:30AM
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-x-1">
                      <MdLocationPin size={16} />
                      <div className="flex flex-col gap-y-1">
                        <span className="text-xs font-medium">
                          20 Odinaka Okonkwo Street, Lagos
                        </span>
                        <span className="text-xs">
                          24, October 2023. 10:00AM
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-x-1">
                      <div className="flex flex-row gap-x-2">
                        <div className="flex items-center text-shuttlelaneBlack gap-x-1">
                          <IoCarSportSharp size={18} className="" />
                          <span className="text-xs font-medium">Economy</span>
                        </div>
                        <div className="flex items-center text-shuttlelaneBlack gap-x-1">
                          <MdPeople size={18} className="" />
                          <span className="text-xs font-medium">3</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-[.3px] w-full bg-gray-300"></div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-y-1">
                        <span className="font-medium text-xs">Total price</span>
                        <span className="text-gray-400 text-xs">
                          Taxes & fees included
                        </span>
                      </div>

                      <h3 className="text-shuttlelanePurple font-bold">
                        ₦25,000
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-7 mt-10">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">Route</p>
                  <span className="text-xs">26 miles, 50 minutes</span>
                </div>
                <div className="mt-5">
                  <div className="w-full max-h-[250px] h-[250px] min-h-[250px] overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7928.243562265941!2d3.3680206!3d6.5062651!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c448e2f97c3%3A0xc95f24c00955aecc!2sShuttlelane!5e0!3m2!1sen!2sng!4v1698936776561!5m2!1sen!2sng"
                      width="100%"
                      height="100%"
                      //   style="border:0;"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBookingPage;
