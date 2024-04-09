import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaPassport, FaUser, FaTrash } from "react-icons/fa";
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
  createVendorCar,
  declineBooking,
  deleteVendorFleet,
  endBooking,
  fetchBookingByReference,
  fetchCompletedJobs,
  fetchVendorFleet,
  startBooking,
  updateVendorFleet,
} from "../../../../../redux/slices/vendorSlice";
import moment from "moment";
import Modal from "react-modal";
import { FaXmark } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import VendorDashboardNavbar from "../../../../../components/ui/Vendor/VendorDashboardNavbar";
import VendorTopBar from "../../../../../components/ui/Vendor/VendorTopBar";
import PhoneInput from "react-phone-input-2";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { Modal as RsuiteModal, Button } from "rsuite";
import { Helmet } from "react-helmet";

function VendorDashboardManageFleetPage() {
  // Redux setup
  const {
    isLoading,
    token,
    vendor,
    bookingFetchedByReference,
    isGetBookingByReferenceLoading,
    vendorFleet,
  } = useSelector((store) => store.vendor);
  const dispatch = useDispatch();

  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchVendorFleet({ token, vendorId: vendor?._id }));
  }, [token]);

  // Modal functionalities
  const [isFleetDetailsModalOpened, setIsFleetDetailsModalOpened] =
    useState(false);
  const [currentFleet, setCurrentFleet] = useState();

  // Create Fleet Modal states
  const [isCreateFleetModalOpen, setIsCreateFleetModalOpen] = useState(false);

  // Create driver form fields
  const [carName, setCarName] = useState();
  const [carModel, setCarModel] = useState();
  const [carType, setCarType] = useState();
  const [carYear, setCarYear] = useState();
  const [carColor, setCarColor] = useState();
  const [carPlateNumber, setCarPlateNumber] = useState();

  async function handleCreateVendorFleet(e) {
    e.preventDefault();
    if (
      !carName ||
      !carModel ||
      !carType ||
      !carColor ||
      !carYear ||
      !carPlateNumber
    ) {
      toast.error("Please fill in the missing fields!");
      return;
    }
    dispatch(
      createVendorCar({
        carName: carName,
        carModel: carModel,
        carType: carType?.value,
        carColor: carColor,
        carYear: carYear,
        carPlateNumber: carPlateNumber,
        vendor: vendor?._id,
        token,
      })
    );

    setIsCreateFleetModalOpen(false);
  }

  const carTypeOptions = [
    {
      value: "Salon",
      label: "Salon",
    },
    {
      value: "SUV",
      label: "SUV",
    },
    {
      value: "Mini Bus",
      label: "Mini Bus",
    },
  ];

  // Handle deleting a fleet
  const [isDeleteFleetDialogOpen, setIsDeleteFleetDialogOpen] = useState(false);
  async function handleDeleteFleet() {
    dispatch(
      deleteVendorFleet({
        vendorId: vendor?._id,
        fleetId: currentFleet?._id,
        token: token,
      })
    );

    setIsDeleteFleetDialogOpen(false);
  }

  // Handle updating a fleet
  const [isUpdateFleetModalOpen, setIsUpdateFleetModalOpen] = useState(false);
  const [updatedCarName, setUpdatedCarName] = useState();
  const [updatedCarModel, setUpdatedCarModel] = useState();
  const [updatedCarType, setUpdatedCarType] = useState();
  const [updatedCarYear, setUpdatedCarYear] = useState();
  const [updatedCarColor, setUpdatedCarColor] = useState();
  const [updatedCarPlateNumber, setUpdatedCarPlateNumber] = useState();
  async function handleUpdateVendorFleet(e) {
    e.preventDefault();
    if (
      !updatedCarName ||
      !updatedCarModel ||
      !updatedCarType ||
      !updatedCarColor ||
      !updatedCarYear ||
      !updatedCarPlateNumber
    ) {
      toast.error("Please fill in the missing fields");
      return;
    }

    dispatch(
      updateVendorFleet({
        fleetId: currentFleet?._id,
        token,
        values: {
          carName: updatedCarName,
          carModel: updatedCarModel,
          carType: updatedCarType?.value,
          carColor: updatedCarColor,
          carYear: updatedCarYear,
          carPlateNumber: updatedCarPlateNumber,
          vendor: vendor?._id,
        },
      })
    );

    setIsUpdateFleetModalOpen(false);
  }

  useEffect(() => {
    if (isUpdateFleetModalOpen == true) {
      setUpdatedCarName(currentFleet?.carName);
      setUpdatedCarModel(currentFleet?.carModel);
      setUpdatedCarType({
        value: currentFleet?.carType,
        label: currentFleet?.carType,
      });
      setUpdatedCarYear(currentFleet?.carYear);
      setUpdatedCarColor(currentFleet?.carColor);
      setUpdatedCarPlateNumber(currentFleet?.carPlateNumber);
    }
  }, [isUpdateFleetModalOpen]);

  return (
    <div className="">
      <Helmet>
        <title>Manage Fleet - Shuttlelane Portal Vendor Dashboard</title>
      </Helmet>

      <ToastContainer />

      {/* Delete Booking dialog */}
      <RsuiteModal
        backdrop="static"
        role="alertdialog"
        open={isDeleteFleetDialogOpen}
        onClose={() => setIsDeleteFleetDialogOpen(false)}
        size="xs"
      >
        <RsuiteModal.Body>
          {/* <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} /> */}
          This booking will be permanently deleted from the database. This
          action is irreversible. Are you sure you want to proceed ?
        </RsuiteModal.Body>
        <RsuiteModal.Footer>
          <Button onClick={() => handleDeleteFleet()} appearance="primary">
            Ok
          </Button>
          <Button
            onClick={() => setIsDeleteFleetDialogOpen(false)}
            appearance="subtle"
          >
            Cancel
          </Button>
        </RsuiteModal.Footer>
      </RsuiteModal>

      {/* Create Fleet Modal */}
      <Modal
        isOpen={isCreateFleetModalOpen}
        onRequestClose={() => setIsCreateFleetModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="overflow-y-scroll shuttlelaneScrollbar max-h-[90%] bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Create Car</h4>
              <small>Add a car to your fleet</small>
            </div>
            <FaXmark
              size={20}
              onClick={() => setIsCreateFleetModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              {/* Type */}
              <div className="flex flex-col gap-y-1 w-full">
                <label htmlFor="carType" className="text-sm">
                  Car Type
                </label>
                <Select
                  value={carType}
                  onChange={(value) => {
                    setCarType(value);
                  }}
                  options={carTypeOptions}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused
                        ? "transparent"
                        : "transparent",
                      borderWidth: state.isFocused ? "0" : "0",
                      backgroundColor: "transparent",
                      position: "relative",
                      zIndex: 80,
                      width: "100%",
                      height: "100%",
                    }),

                    placeholder: (baseStyles, state) => ({
                      ...baseStyles,
                      // fontSize: ".75rem",
                    }),

                    menuList: (baseStyles, state) => ({
                      ...baseStyles,
                      // fontSize: ".75rem",
                    }),

                    input: (baseStyles, state) => ({
                      ...baseStyles,
                      // fontSize: ".75rem",
                    }),
                  }}
                  placeholder="Car Type"
                  className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Car Name */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="carName" className="text-sm">
                  Car Name
                </label>
                <input
                  type="text"
                  placeholder="Car Name"
                  name="carName"
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Car Model */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="carModel" className="text-sm">
                  Car Model
                </label>
                <input
                  type="text"
                  placeholder="Car Model"
                  name="carModel"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Car Year */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="carYear" className="text-sm">
                  Car Year
                </label>
                <input
                  type="carYear"
                  placeholder="Car Year"
                  name="carYear"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Car Color */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="carColor" className="text-sm">
                  Car Color
                </label>
                <input
                  type="carColor"
                  placeholder="Car Color"
                  name="carColor"
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Car Plate Number */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="carPlateNumber" className="text-sm">
                  Car Plate Number
                </label>
                <input
                  type="carPlateNumber"
                  placeholder="Car Plate Number"
                  name="carPlateNumber"
                  value={carPlateNumber}
                  onChange={(e) => setCarPlateNumber(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              <button
                type="submit"
                onClick={(e) => handleCreateVendorFleet(e)}
                className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Create Car"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Update Fleet Modal */}
      <Modal
        isOpen={isUpdateFleetModalOpen}
        onRequestClose={() => setIsUpdateFleetModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="overflow-y-scroll shuttlelaneScrollbar max-h-[90%] bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Update Car</h4>
              <small>
                {currentFleet?.carName} {currentFleet?.carModel}
              </small>
            </div>
            <FaXmark
              size={20}
              onClick={() => setIsUpdateFleetModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              {/* Type */}
              <div className="flex flex-col gap-y-1 w-full">
                <label htmlFor="updatedCarType" className="text-sm">
                  Car Type
                </label>
                <Select
                  value={updatedCarType}
                  onChange={(value) => {
                    setUpdatedCarType(value);
                  }}
                  options={carTypeOptions}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused
                        ? "transparent"
                        : "transparent",
                      borderWidth: state.isFocused ? "0" : "0",
                      backgroundColor: "transparent",
                      position: "relative",
                      zIndex: 80,
                      width: "100%",
                      height: "100%",
                    }),

                    placeholder: (baseStyles, state) => ({
                      ...baseStyles,
                      // fontSize: ".75rem",
                    }),

                    menuList: (baseStyles, state) => ({
                      ...baseStyles,
                      // fontSize: ".75rem",
                    }),

                    input: (baseStyles, state) => ({
                      ...baseStyles,
                      // fontSize: ".75rem",
                    }),
                  }}
                  placeholder="Car Type"
                  className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Car Name */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="updatedCarName" className="text-sm">
                  Car Name
                </label>
                <input
                  type="text"
                  placeholder="Car Name"
                  name="updatedCarName"
                  value={updatedCarName}
                  onChange={(e) => setUpdatedCarName(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Car Model */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="updatedCarModel" className="text-sm">
                  Car Model
                </label>
                <input
                  type="text"
                  placeholder="Car Model"
                  name="updatedCarModel"
                  value={updatedCarModel}
                  onChange={(e) => setUpdatedCarModel(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Car Year */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="updatedCarYear" className="text-sm">
                  Car Year
                </label>
                <input
                  type="updatedCarYear"
                  placeholder="Car Year"
                  name="updatedCarYear"
                  value={updatedCarYear}
                  onChange={(e) => setUpdatedCarYear(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Car Color */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="updatedCarColor" className="text-sm">
                  Car Color
                </label>
                <input
                  type="updatedCarColor"
                  placeholder="Car Color"
                  name="updatedCarColor"
                  value={updatedCarColor}
                  onChange={(e) => setUpdatedCarColor(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Car Plate Number */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="updatedCarPlateNumber" className="text-sm">
                  Car Plate Number
                </label>
                <input
                  type="updatedCarPlateNumber"
                  placeholder="Car Plate Number"
                  name="updatedCarPlateNumber"
                  value={updatedCarPlateNumber}
                  onChange={(e) => setUpdatedCarPlateNumber(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              <button
                type="submit"
                onClick={(e) => handleUpdateVendorFleet(e)}
                className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Navbar here */}
      <VendorDashboardNavbar
        link="bookings"
        sublink="manage-fleet"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-[#fff] text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <VendorTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="flex xl:flex-row flex-col gap-x-5 gap-y-5">
              {/* Booking Summary - Total number of bookings */}
              <div className="w-full xl:w-[70%]">
                {/* Fleets */}
                <div className="mt-11 w-full">
                  <div className="w-full rounded-lg border-[1px] lg:border-[.3px] p-3 border-gray-100 h-auto">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">
                          Fleet - {vendorFleet?.length}
                        </p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>

                      {/* create driver button */}
                      <button
                        onClick={() => {
                          setIsCreateFleetModalOpen(true);
                        }}
                        className="w-auto border-dashed border-[1px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
                      >
                        <AiOutlinePlus size={16} />
                        <span className="text-xs">Add new car</span>
                      </button>
                    </div>

                    <div className="overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
                      {/* Table header */}
                      <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                        <p className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs">
                          Type
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs">
                          Name & Model
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs">
                          Year
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs">
                          Color
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs">
                          Plate Number
                        </p>
                        <p className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs">
                          Actions
                        </p>
                      </div>

                      {isLoading && (
                        <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                          <ImSpinner2
                            size={18}
                            className="text-shuttlelanePurple animate-spin"
                          />
                        </div>
                      )}

                      {!isLoading && (
                        <>
                          {vendorFleet?.map((car) => (
                            <div className="cursor-pointer flex justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                              <p
                                onClick={(e) => {
                                  setCurrentFleet(car);
                                  setIsUpdateFleetModalOpen(true);
                                }}
                                className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs"
                              >
                                {car?.carType}
                              </p>
                              <p
                                onClick={(e) => {
                                  setCurrentFleet(car);
                                  setIsUpdateFleetModalOpen(true);
                                }}
                                className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs"
                              >
                                {car?.carName} {car?.carModel}
                              </p>
                              <p
                                onClick={(e) => {
                                  setCurrentFleet(car);
                                  setIsUpdateFleetModalOpen(true);
                                }}
                                className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs"
                              >
                                {car?.carYear}
                              </p>
                              <p
                                onClick={(e) => {
                                  setCurrentFleet(car);
                                  setIsUpdateFleetModalOpen(true);
                                }}
                                className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs"
                              >
                                {car?.carColor}
                              </p>
                              <p
                                onClick={(e) => {
                                  setCurrentFleet(car);
                                  setIsUpdateFleetModalOpen(true);
                                }}
                                className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs"
                              >
                                {car?.carPlateNumber}
                              </p>
                              <p className="min-w-[200px] w-[200px] lg:w-[16.6%] text-xs">
                                <FaTrash
                                  onClick={() => {
                                    setCurrentFleet(car);
                                    setIsDeleteFleetDialogOpen(true);
                                  }}
                                  size={13}
                                  className="text-red-400 cursor-pointer"
                                />
                              </p>
                            </div>
                          ))}
                        </>
                      )}

                      {(vendorFleet?.length < 1 || !vendorFleet) &&
                        !isLoading && (
                          <div className="flex justify-center items-center h-full w-full mb-2 pb-2 text-shuttlelaneBlack mt-4">
                            <p className="w-full text-xs text-center">
                              You have not added any cars to your fleet just
                              yet...
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-[30%] mt-10">
                <div className="w-full rounded-lg border-[1px] lg:border-[.3px] p-4 border-gray-100 h-auto">
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

                <div className="mt-10 w-full rounded-lg border-[1px] lg:border-[.3px] p-4 border-gray-100 h-auto">
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

export default VendorDashboardManageFleetPage;
