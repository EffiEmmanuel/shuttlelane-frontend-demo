// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import {
  IoCarSportOutline,
  IoCarSportSharp,
  IoLocationOutline,
} from "react-icons/io5";
import {
  MdCheck,
  MdLocationPin,
  MdLuggage,
  MdOutlineNordicWalking,
  MdPeople,
  MdPerson,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import {
  calculateTotal,
  fetchCars,
  fetchCities,
  fetchPasses,
  fetchVehicleClasses,
  setBookingDetails,
} from "../../../../redux/slices/userSlice";
import PersonalDetailsForm from "../../../../forms/PersonalDetailsForm";
import { BiMinus, BiSolidCity } from "react-icons/bi";
import { TbBrandDaysCounter } from "react-icons/tb";
import Pay from "../Pay";
import Modal from "react-modal";
import { FaPersonWalkingDashedLineArrowRight, FaXmark } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { PiCaretUpBold } from "react-icons/pi";
import LocationInput from "../../../../components/ui/Form/LocationInput";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { AiOutlinePlus } from "react-icons/ai";
import GeneralInformationForm from "../../../../forms/VisaOnArrival/GeneralInformationForm";
import BiodataForm from "../../../../forms/VisaOnArrival/BioDataForm";
import TravelInformationForm from "../../../../forms/VisaOnArrival/TravelInformationForm";
import ContactInformationForm from "../../../../forms/VisaOnArrival/ContactInformationForm";

export default function VisaOnArrivalBookingSummary() {
  // Fetch states from redux slice
  const {
    isLoading,
    bookingDetails,
    bookingType,
    userCurrency,
    bookingTotal,
    passes,
    cities,
    currentVisaFee,
    currentTransactionFee,
    currentProcessingFee,
    currentBiometricFee,
    currentVatFee,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // FORM FIELDS
  // General Information Form Fields
  const [nationality, setNationality] = useState();
  const [visaClass, setVisaClass] = useState();
  const [passportType, setPassportType] = useState();
  // Biodata Form Fields
  const [passportPhotograph, setPassportPhotograph] = useState(null);
  const [title, setTitle] = useState();
  const [surname, setSurname] = useState();
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [email, setEmail] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [placeOfBirth, setPlaceOfBirth] = useState();
  const [gender, setGender] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [passportNumber, setPassportNumber] = useState();
  const [passportExpiryDate, setPassportExpiryDate] = useState();
  // Travel Information Form Fields
  const [purposeOfJourney, setPurposeOfJourney] = useState();
  const [airline, setAirline] = useState();
  const [flightNumber, setFlightNumber] = useState();
  const [countryOfDeparture, setCountryOfDeparture] = useState();
  const [departureDate, setDepartureDate] = useState();
  const [arrivalDate, setArrivalDate] = useState();
  const [portOfEntry, setPortOfEntry] = useState();
  const [durationOfStay, setDurationOfStay] = useState(1);
  // Contact Details Form Fields
  const [contactName, setContactName] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [contactAddress, setContactAddress] = useState();
  const [contactCity, setContactCity] = useState();
  const [contactState, setContactState] = useState();
  const [contactEmail, setContactEmail] = useState();
  const [contactPostalCode, setContactPostalCode] = useState();

  // STEP STATES
  const [isGeneralInformation, setIsGeneralInformation] = useState(true);
  const [isBioData, setIsBioData] = useState(false);
  const [isTravelInformation, setIsTravelInformation] = useState(false);
  const [isContactDetails, setIsContactDetails] = useState(false);

  function handleNext(e, step) {
    e.preventDefault();
    switch (step) {
      case "step1":
        // Disable other steps and enable step 2
        setIsGeneralInformation(false);
        setIsBioData(true);
        setIsTravelInformation(false);
        setIsContactDetails(false);
        break;
      case "step2":
        // Disable other steps and enable step 3
        setIsGeneralInformation(false);
        setIsBioData(false);
        setIsTravelInformation(true);
        setIsContactDetails(false);
        break;
      case "step3":
        // Disable other steps and enable step 2
        setIsGeneralInformation(false);
        setIsBioData(false);
        setIsTravelInformation(false);
        setIsContactDetails(true);
        break;
      case "step4":
        // Disable akk steps
        setIsGeneralInformation(false);
        setIsBioData(false);
        setIsTravelInformation(false);
        setIsContactDetails(false);
        break;

      default:
        break;
    }
  }

  function handlePrev(e, step) {
    e.preventDefault();
    switch (step) {
      case "step1":
        // Disable other steps and enable step 2
        setIsGeneralInformation(false);
        setIsBioData(false);
        setIsTravelInformation(false);
        setIsContactDetails(false);
        break;
      case "step2":
        // Disable other steps and enable step 1
        setIsGeneralInformation(true);
        setIsBioData(false);
        setIsTravelInformation(false);
        setIsContactDetails(false);
        break;
      case "step3":
        // Disable other steps and enable step 2
        setIsGeneralInformation(false);
        setIsBioData(true);
        setIsTravelInformation(false);
        setIsContactDetails(false);
        break;
      case "step4":
        // Disable other steps and enable step 3
        setIsGeneralInformation(false);
        setIsBioData(false);
        setIsTravelInformation(true);
        setIsContactDetails(false);
        break;

      default:
        break;
    }
  }

  // UPDATE BOOKING DETAILS
  useEffect(() => {
    dispatch(
      setBookingDetails({
        bookingType: "Visa",
        bookingDetails: {
          visaClass,
          passportType,
          nationality,
          passportPhotograph,
          title,
          surname,
          firstName,
          middleName,
          email,
          dateOfBirth,
          placeOfBirth,
          gender,
          maritalStatus,
          passportNumber,
          passportExpiryDate,
          purposeOfJourney,
          airline,
          flightNumber,
          countryOfDeparture,
          departureDate,
          arrivalDate,
          portOfEntry,
          durationOfStay,
          contactName,
          contactNumber,
          contactAddress,
          contactCity,
          contactState,
          contactEmail,
          contactPostalCode,
        },
      })
    );
  }, [
    visaClass,
    passportType,
    nationality,
    passportPhotograph,
    title,
    surname,
    firstName,
    middleName,
    dateOfBirth,
    placeOfBirth,
    gender,
    maritalStatus,
    passportNumber,
    passportExpiryDate,
    purposeOfJourney,
    airline,
    flightNumber,
    countryOfDeparture,
    departureDate,
    arrivalDate,
    portOfEntry,
    durationOfStay,
    contactName,
    contactNumber,
    contactAddress,
    contactCity,
    contactState,
    contactEmail,
    contactPostalCode,
  ]);

  return (
    <div className="">
      <ToastContainer />
      <div className="mt-5 w-full flex lg:flex-row flex-col gap-x-4">
        <div className="lg:w-[65%] w-full">
          {/* General Information */}
          <div className="bg-white p-7 transition-all h-auto">
            <button
              onClick={(e) => {
                setIsGeneralInformation(!isGeneralInformation);
                setIsBioData(false);
                setIsTravelInformation(false);
                setIsContactDetails(false);
              }}
              className="flex flex-row w-full justify-between items-center outline-none focus:outline-none"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <span className="text-xl font-semibold">
                    1. General Information
                  </span>

                  <FaRegCheckCircle
                    size={20}
                    className={`${
                      visaClass && passportType && nationality
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <p className="text-sm -mt-1">
                  Please fill in all fields before proceeding to the next step
                </p>
              </div>

              <PiCaretUpBold
                size={20}
                className={`${
                  isGeneralInformation && "rotate-180"
                } transition-all`}
              />
            </button>

            <div
              className={`${
                !isGeneralInformation ? "h-[0px]" : "h-auto"
              } overflow-y-hidden`}
            >
              <GeneralInformationForm
                nationality={nationality}
                setNationality={setNationality}
                visaClass={visaClass}
                setVisaClass={setVisaClass}
                passportType={passportType}
                setPassportType={setPassportType}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            </div>
          </div>

          {/* Biodata */}
          <div className="bg-white p-7 transition-all h-auto mt-4">
            <button
              onClick={(e) => {
                if (!visaClass || !passportType || !nationality) {
                  toast.info(
                    "You must complete the General Information section before proceeding to this section"
                  );
                  return;
                } else {
                  setIsGeneralInformation(false);
                  setIsBioData(!isBioData);
                  setIsTravelInformation(false);
                  setIsContactDetails(false);
                }
              }}
              className="flex flex-row w-full justify-between items-center outline-none focus:outline-none"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <span className="text-xl font-semibold">2. Biodata</span>

                  <FaRegCheckCircle
                    size={20}
                    className={`${
                      passportPhotograph &&
                      title &&
                      surname &&
                      firstName &&
                      middleName &&
                      email &&
                      dateOfBirth &&
                      placeOfBirth &&
                      gender &&
                      maritalStatus &&
                      passportNumber &&
                      passportExpiryDate
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <p className="text-sm -mt-1">
                  Please fill in all fields before proceeding to the next step
                </p>
              </div>

              <PiCaretUpBold
                size={20}
                className={`${isBioData && "rotate-180"} transition-all`}
              />
            </button>

            <div
              className={`${
                !isBioData ? "h-[0px]" : "h-auto"
              } overflow-y-hidden`}
            >
              <BiodataForm
                passportPhotograph={passportPhotograph}
                setPassportPhotograph={setPassportPhotograph}
                title={title}
                setTitle={setTitle}
                surname={surname}
                setSurname={setSurname}
                firstName={firstName}
                setFirstName={setFirstName}
                middleName={middleName}
                setMiddleName={setMiddleName}
                email={email}
                setEmail={setEmail}
                dateOfBirth={dateOfBirth}
                setDateOfBirth={setDateOfBirth}
                placeOfBirth={placeOfBirth}
                setPlaceOfBirth={setPlaceOfBirth}
                gender={gender}
                setGender={setGender}
                maritalStatus={maritalStatus}
                setMaritalStatus={setMaritalStatus}
                passportNumber={passportNumber}
                setPassportNumber={setPassportNumber}
                passportExpiryDate={passportExpiryDate}
                setPassportExpiryDate={setPassportExpiryDate}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            </div>
          </div>

          {/* Travel Information */}
          <div className="bg-white p-7 transition-all h-auto mt-4">
            <button
              onClick={(e) => {
                if (
                  !passportPhotograph ||
                  !title ||
                  !surname ||
                  !firstName ||
                  !middleName ||
                  !email ||
                  !dateOfBirth ||
                  !placeOfBirth ||
                  !gender ||
                  !maritalStatus ||
                  !passportNumber ||
                  !passportExpiryDate
                ) {
                  toast.info(
                    "You must complete the Biodata section before proceeding to this section"
                  );
                  return;
                } else {
                  setIsGeneralInformation(false);
                  setIsBioData(false);
                  setIsTravelInformation(!isTravelInformation);
                  setIsContactDetails(false);
                }
              }}
              className="flex flex-row w-full justify-between items-center outline-none focus:outline-none"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <span className="text-xl font-semibold">
                    3. Travel Information
                  </span>

                  <FaRegCheckCircle
                    size={20}
                    className={`${
                      purposeOfJourney &&
                      airline &&
                      flightNumber &&
                      countryOfDeparture &&
                      departureDate &&
                      arrivalDate &&
                      portOfEntry &&
                      durationOfStay
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <p className="text-sm -mt-1">
                  Please fill in all fields before proceeding to the next step
                </p>
              </div>

              <PiCaretUpBold
                size={20}
                className={`${
                  isTravelInformation && "rotate-180"
                } transition-all`}
              />
            </button>

            <div
              className={`${
                !isTravelInformation ? "h-[0px]" : "h-auto"
              } overflow-y-hidden`}
            >
              <TravelInformationForm
                purposeOfJourney={purposeOfJourney}
                setPurposeOfJourney={setPurposeOfJourney}
                airline={airline}
                setAirline={setAirline}
                flightNumber={flightNumber}
                setFlightNumber={setFlightNumber}
                countryOfDeparture={countryOfDeparture}
                setCountryOfDeparture={setCountryOfDeparture}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                arrivalDate={arrivalDate}
                setArrivalDate={setArrivalDate}
                portOfEntry={portOfEntry}
                setPortOfEntry={setPortOfEntry}
                durationOfStay={durationOfStay}
                setDurationOfStay={setDurationOfStay}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-7 transition-all h-auto mt-4">
            <button
              onClick={(e) => {
                if (
                  !purposeOfJourney ||
                  !airline ||
                  !flightNumber ||
                  !countryOfDeparture ||
                  !departureDate ||
                  !arrivalDate ||
                  !portOfEntry ||
                  !durationOfStay
                ) {
                  toast.info(
                    "You must complete the Travel Information section before proceeding to this section"
                  );
                  return;
                } else {
                  setIsGeneralInformation(false);
                  setIsBioData(false);
                  setIsTravelInformation(false);
                  setIsContactDetails(!isContactDetails);
                }
              }}
              className="flex flex-row w-full justify-between items-center outline-none focus:outline-none"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <span className="text-xl font-semibold">
                    4. Contact / Hotel Details In Nigeria
                  </span>

                  <FaRegCheckCircle
                    size={20}
                    className={`${
                      contactName &&
                      contactNumber &&
                      contactAddress &&
                      contactCity &&
                      contactState &&
                      contactEmail &&
                      contactPostalCode
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <p className="text-sm -mt-1">
                  Please fill in all fields before proceeding to the next step
                </p>
              </div>

              <PiCaretUpBold
                size={20}
                className={`${isContactDetails && "rotate-180"} transition-all`}
              />
            </button>

            <div
              className={`${
                !isContactDetails ? "h-[0px]" : "h-auto"
              } overflow-y-hidden`}
            >
              <ContactInformationForm
                contactName={contactName}
                setContactName={setContactName}
                contactNumber={contactNumber}
                setContactNumber={setContactNumber}
                contactAddress={contactAddress}
                setContactAddress={setContactAddress}
                contactCity={contactCity}
                setContactCity={setContactCity}
                contactState={contactState}
                setContactState={setContactState}
                contactEmail={contactEmail}
                setContactEmail={setContactEmail}
                contactPostalCode={contactPostalCode}
                setContactPostalCode={setContactPostalCode}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            </div>
          </div>

          <Pay
            isPaymentDisabled={
              !visaClass ||
              !passportType ||
              !nationality ||
              !passportPhotograph ||
              !title ||
              !surname ||
              !firstName ||
              !middleName ||
              !email ||
              !dateOfBirth ||
              !placeOfBirth ||
              !gender ||
              !maritalStatus ||
              !passportNumber ||
              !passportExpiryDate ||
              !purposeOfJourney ||
              !airline ||
              !flightNumber ||
              !countryOfDeparture ||
              !departureDate ||
              !arrivalDate ||
              !portOfEntry ||
              !durationOfStay ||
              !contactName ||
              !contactNumber ||
              !contactAddress ||
              !contactCity ||
              !contactState ||
              !contactEmail ||
              !contactPostalCode
                ? true
                : false
            }
            isVisaOnArrival={true}
            bookingTotal={bookingTotal}
          />
        </div>
        <div className="lg:w-[35%] w-full mt-10 lg:mt-0">
          <div className="bg-white p-7 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">Booking Summary</p>
              <span className="text-xs">Visa On Arrival</span>
            </div>
            <div className="mt-10">
              <div className="flex flex-col gap-y-2">
                {isLoading && (
                  <div className="flex items-center justify-center">
                    <ImSpinner2
                      size={24}
                      className="text-shuttlelanePurple animate-spin"
                    />
                  </div>
                )}

                {!isLoading && (
                  <>
                    <p>
                      <span className="font-semibold">Visa Fee:</span> $
                      {currentVisaFee}
                    </p>
                    <p>
                      <span className="font-semibold">Transaction Fee:</span> $
                      {currentTransactionFee}
                    </p>
                    <p>
                      <span className="font-semibold">Processing Fee:</span> $
                      {currentProcessingFee}
                    </p>
                    <p>
                      <span className="font-semibold">Biometric Fee:</span> $
                      {currentBiometricFee}
                    </p>
                    <p>
                      <span className="font-semibold">VAT (7.5%): </span> $
                      {currentVatFee}
                    </p>
                  </>
                )}

                <div className="h-[.3px] w-full bg-gray-300"></div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-y-1">
                    <span className="font-medium text-xs">Total price</span>
                    <span className="text-gray-400 text-xs">
                      Taxes & fees included
                    </span>
                  </div>

                  <h3 className="text-shuttlelanePurple font-bold">
                    {isLoading && (
                      <div className="flex items-center justify-center">
                        <ImSpinner2
                          size={24}
                          className="text-shuttlelanePurple animate-spin"
                        />
                      </div>
                    )}

                    {!isLoading && (
                      <>
                        $
                        {isNaN(bookingTotal)
                          ? "0.00"
                          : Intl.NumberFormat("en-US", {}).format(bookingTotal)}
                      </>
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
