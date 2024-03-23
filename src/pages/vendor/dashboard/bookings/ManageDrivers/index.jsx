import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaPassport, FaUser } from "react-icons/fa";
import {
  MdAirplanemodeActive,
  MdLocationPin,
  MdLuggage,
  MdOutlineAddAPhoto,
  MdOutlineFlightTakeoff,
  MdOutlineSupport,
} from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { HiOutlineExternalLink, HiOutlineSupport } from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiKey, BiSearch, BiSolidBadgeCheck, BiSupport } from "react-icons/bi";
import { LuCopy } from "react-icons/lu";
import {
  AiFillDelete,
  AiOutlineCheckCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";
import { PiChat } from "react-icons/pi";
import {
  acceptBooking,
  createVendorDriver,
  declineBooking,
  endBooking,
  fetchBookingByReference,
  fetchCompletedJobs,
  fetchVendorDrivers,
  startBooking,
} from "../../../../../redux/slices/vendorSlice";
import GoogleMapsWithDirections from "../../../../../components/ui/GoogleMapsWithDirection";
import moment from "moment";
import Modal from "react-modal";
import { FaXmark } from "react-icons/fa6";
import SwipeButton from "../../../../../components/ui/SwipeButton";
import { ImSpinner2 } from "react-icons/im";
import VendorDashboardNavbar from "../../../../../components/ui/Vendor/VendorDashboardNavbar";
import VendorTopBar from "../../../../../components/ui/Vendor/VendorTopBar";
import PhoneInput from "react-phone-input-2";
import { ToastContainer, toast } from "react-toastify";

function VendorDashboardManageDriversPage() {
  // Redux setup
  const {
    isLoading,
    token,
    vendor,
    bookingFetchedByReference,
    isGetBookingByReferenceLoading,
    vendorDrivers,
  } = useSelector((store) => store.vendor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVendorDrivers(token));
  }, [token]);

  // Modal functionalities
  const [isDriverDetailsModalOpened, setIsDriverDetailsModalOpened] =
    useState(false);
  const [currentBooking, stCurrentDriver] = useState();

  // Create Driver Modal states
  const [isCreateDriverModalOpen, setIsCreateDriverModalOpen] = useState(false);

  // Fetch clicked booking (Booking opened in the modal)
  useEffect(() => {
    if (currentBooking)
      dispatch(fetchBookingByReference(currentBooking?.bookingReference));
  }, [currentBooking]);

  // FUNCTION: Handles accepting a booking
  async function handleAcceptBooking() {
    dispatch(
      acceptBooking({
        token,
        vendorId: vendor?._id,
        bookingId: bookingFetchedByReference?._id ?? currentBooking?._id,
      })
    );
    setIsDriverDetailsModalOpened(false);
  }

  // FUNCTION: Handles accepting a booking
  async function handleDeclineBooking() {
    dispatch(
      declineBooking({
        token,
        vendorId: vendor?._id,
        bookingId: bookingFetchedByReference?._id ?? currentBooking?._id,
      })
    );
    setIsDriverDetailsModalOpened(false);
  }

  // FUNCTION: Handles starting a booking
  async function handleStartBooking() {
    dispatch(
      startBooking({
        token,
        vendorId: vendor?._id,
        bookingId: bookingFetchedByReference?._id ?? currentBooking?._id,
      })
    );

    setTimeout(() => {
      setIsDriverDetailsModalOpened(false);
    }, 1500);
  }

  // FUNCTION: Handles ending a booking
  async function handleEndBooking() {
    dispatch(
      endBooking({
        token,
        vendorId: vendor?._id,
        bookingId: bookingFetchedByReference?._id ?? currentBooking?._id,
      })
    );

    setTimeout(() => {
      setIsDriverDetailsModalOpened(false);
    }, 1500);
  }

  // Create driver form fields
  const [image, setImage] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();

  // Handle image
  const [renderImage, setRenderImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    console.log("FILE:", file);
    setImage(file);

    reader.onloadend = () => {
      setRenderImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  async function handleCreateVendorDriver(e) {
    e.preventDefault();
    if(!image || !firstName || !lastName || !mobile || !email) {
        toast.error('Please fill in the missing fields!')
        return
    }
    dispatch(
      createVendorDriver({
        image: image,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        vendorId: vendor?._id,
        token,
      })
    );

    setIsCreateDriverModalOpen(false);
  }

  return (
    <div className="">
      <ToastContainer />

      {/* Create Driver Modal */}
      <Modal
        isOpen={isCreateDriverModalOpen}
        onRequestClose={() => setIsCreateDriverModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="overflow-y-scroll shuttlelaneScrollbar max-h-[90%] bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Create Driver</h4>

            <FaXmark
              size={20}
              onClick={() => setIsCreateDriverModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              {/* Image */}
              <div className="w-full flex flex-col">
                <label htmlFor="username" className="text-sm">
                  Profile Picture
                </label>
                <div className="w-full relative border-dashed border-[1px] border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center overflow-hidden">
                  <>
                    <MdOutlineAddAPhoto size={24} className="text-gray-300" />
                    <small className="text-gray-300 text-center">
                      Click to Insert Profile Picture
                    </small>
                    <input
                      className="absolute top-0 bg-transparent w-full h-full opacity-0 cursor-pointer"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </>

                  {renderImage && image && (
                    <div className="absolute w-full h-full top-0 flex justify-center items-center">
                      <FaXmark
                        onClick={() => {
                          setRenderImage(null);
                          setImage(null);
                        }}
                        size={16}
                        className="absolute top-3 right-3 cursor-pointer"
                      />
                      <img
                        src={renderImage}
                        alt="Uploaded"
                        className="object-cover h-full w-full z-10"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* First Name */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="firstName" className="text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Last Name */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="lastName" className="text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Email */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="email" className="text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="abc@example.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Mobile */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="contactMobile" className="text-sm">
                  Phone Number
                </label>
                <PhoneInput
                  country={"us"}
                  searchPlaceholder="Search"
                  placeholder="---- --- ----"
                  value={mobile}
                  onChange={(value) => setMobile(`+${value}`)}
                  containerClass="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  inputClass="border-none h-full"
                  buttonClass="bg-transparent"
                />
              </div>

              <button
                type="submit"
                onClick={(e) => handleCreateVendorDriver(e)}
                className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Navbar here */}
      <VendorDashboardNavbar link="bookings" sublink="manage-drivers" />

      {/* Main content goes here */}
      <div className="w-full min-h-screen pl-[6%] bg-[#fff] text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <VendorTopBar />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="flex xl:flex-row flex-col gap-x-5 gap-y-5">
              {/* Booking Summary - Total number of bookings */}
              <div className="w-full xl:w-[70%]">
                {/* Recent Bookings */}
                <div className="mt-11 w-full">
                  <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">
                          Drivers - {vendorDrivers?.length}
                        </p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>

                      {/* create driver button */}
                      <button
                        onClick={() => {
                          setIsCreateDriverModalOpen(true);
                        }}
                        className="w-auto border-dashed border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
                      >
                        <AiOutlinePlus size={16} />
                        <span className="text-xs">Create driver</span>
                      </button>
                    </div>

                    <div className="overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
                      {/* Table header */}
                      <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Profile Picture
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Full Name
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Email
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Phone Number
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                          Date Registered
                        </p>
                      </div>

                      {isLoading && (
                        <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                          <ImSpinner2
                            size={16}
                            className="text-shuttlelanePurple animate-spin"
                          />
                        </div>
                      )}

                      {vendorDrivers?.map((driver) => (
                        <div
                          onClick={(e) => {
                            // stCurrentDriver(driver);
                            // setIsDriverDetailsModalOpened(true);
                          }}
                          className="flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4"
                        >
                          <p
                            className={`min-w-[200px] w-[200px] lg:w-[20%] text-xs ${
                              isLoading && "text-gray-400"
                            }`}
                          >
                            <img
                              src={`${driver?.image}`}
                              alt={`${driver?.firstName} ${driver?.lastName}`}
                              className="h-[40px] max-h[40px] min-h-[40px] object-contain"
                            />
                          </p>

                          <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                            {driver?.firstName} {driver?.lastName}
                          </p>
                          <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                            {driver?.email}
                          </p>
                          <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                            {driver?.mobile}
                          </p>
                          <p className="min-w-[200px] w-[200px] lg:w-[20%] text-xs">
                            {moment(driver?.createdAt).format("MMM DD, YYYY")}
                          </p>
                        </div>
                      ))}

                      {(vendorDrivers?.length < 1 || !vendorDrivers) && (
                        <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                          <p className="w-full text-xs text-center">
                            You have not added any driver just yet...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-[30%] mt-10">
                <div className="w-full rounded-lg border-[.3px] p-4 border-gray-100 h-auto">
                  <div className="flex items-center gap-x-2">
                    <p className="font-semibold text-lg">How Can We Help?</p>
                  </div>

                  {/* Articles */}
                  <div className="flex flex-col gap-y-3 mt-5">
                    <div className="flex flex-col gap-y-3 gap-x-3 lg:flex-row lg:items-center">
                      <div className="p-4 shadow-sm w-full xl:w-[50%] bg-white allRoundBoxShadow rounded-lg">
                        <BiSolidBadgeCheck
                          size={24}
                          className="text-green-400"
                        />
                        <div className="flex flex-col gap-y-1">
                          <p className="font-semibold text-sm">
                            Account Verification
                          </p>
                          <Link
                            to="/"
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                          >
                            <span className="text-xs">Learn More</span>
                            <BsArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                      <div className="p-4 shadow-sm w-full xl:w-[50%] bg-white allRoundBoxShadow rounded-lg">
                        <BiSolidBadgeCheck
                          size={24}
                          className="text-green-400"
                        />
                        <div className="flex flex-col gap-y-1">
                          <p className="font-semibold text-sm">
                            Account Verification
                          </p>
                          <Link
                            to="/"
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                          >
                            <span className="text-xs">Learn More</span>
                            <BsArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-3 gap-x-3 lg:flex-row lg:items-center">
                      <div className="p-4 shadow-sm w-full xl:w-[50%] bg-white allRoundBoxShadow rounded-lg">
                        <BiSolidBadgeCheck
                          size={24}
                          className="text-green-400"
                        />
                        <div className="flex flex-col gap-y-1">
                          <p className="font-semibold text-sm">
                            Account Verification
                          </p>
                          <Link
                            to="/"
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                          >
                            <span className="text-xs">Learn More</span>
                            <BsArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                      <div className="p-4 shadow-sm w-full xl:w-[50%] bg-white allRoundBoxShadow rounded-lg">
                        <BiSolidBadgeCheck
                          size={24}
                          className="text-green-400"
                        />
                        <div className="flex flex-col gap-y-1">
                          <p className="font-semibold text-sm">
                            Account Verification
                          </p>
                          <Link
                            to="/"
                            className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                          >
                            <span className="text-xs">Learn More</span>
                            <BsArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 w-full rounded-lg border-[.3px] p-4 border-gray-100 h-auto">
                  <div className="flex items-center gap-x-1">
                    <HiOutlineSupport size={20} />
                    <p className="font-semibold text-lg">Contact and Support</p>
                  </div>

                  {/* Articles */}
                  <div className="flex flex-col gap-y-5 mt-5">
                    <Link
                      to="/"
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                    >
                      <div className="w-full flex flex-row justify-between items-center bg-white pb-3 border-b-[.3px] border-b-gray-300">
                        <div className="flex flex-row gap-x-2 items-center">
                          <BiKey size={32} className="" />
                          <div className="flex flex-col gap-y-1">
                            <p className="font-medium text-sm">
                              Find lost item
                            </p>
                            <span className="text-xs">
                              We can help you get in touch with the passenger
                            </span>
                          </div>
                        </div>
                        <BsArrowRight size={14} />
                      </div>
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                    >
                      <div className="w-full flex flex-row justify-between items-center bg-white pb-3 border-b-[.3px] border-b-gray-300">
                        <div className="flex flex-row gap-x-2 items-center">
                          <BiSupport size={24} className="" />
                          <div className="flex flex-col gap-y-1">
                            <p className="font-medium text-sm">
                              Report safety issue
                            </p>
                            <span className="text-xs">
                              Let us know if you have a safety related issue
                            </span>
                          </div>
                        </div>
                        <BsArrowRight size={14} />
                      </div>
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                    >
                      <div className="w-full flex flex-row justify-between items-center bg-white pb-3 border-b-[.3px] border-b-gray-300">
                        <div className="flex flex-row gap-x-2 items-center">
                          <PiChat size={24} className="" />
                          <div className="flex flex-col gap-y-1">
                            <p className="font-medium text-sm">
                              Give user feedback
                            </p>
                            <span className="text-xs">
                              For issues that are not safety related
                            </span>
                          </div>
                        </div>
                        <BsArrowRight size={14} />
                      </div>
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-x-1 transition-all hover:text-shuttlelanePurple visited:text-shuttlelaneBlack text-shuttlelaneBlack hover:no-underline visited:no-underline"
                    >
                      <div className="w-full flex flex-row justify-between items-center bg-white pb-3 border-b-[.3px] border-b-gray-300">
                        <div className="flex flex-row gap-x-2 items-center">
                          <MdOutlineSupport size={24} className="" />
                          <div className="flex flex-col gap-y-1">
                            <p className="font-medium text-sm">Get trip help</p>
                            <span className="text-xs">
                              Need help for something else? Find it here
                            </span>
                          </div>
                        </div>
                        <BsArrowRight size={14} />
                      </div>
                    </Link>
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

export default VendorDashboardManageDriversPage;
