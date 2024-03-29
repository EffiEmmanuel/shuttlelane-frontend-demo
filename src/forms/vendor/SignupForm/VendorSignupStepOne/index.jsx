import React, { useEffect, useRef, useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
// import ReacrSele from "react-select";
import CountryData from "country-codes-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { validateFields } from "../../../../util";
import {
  fetchCities,
  updateVendor,
} from "../../../../redux/slices/vendorSlice";
import { ToastContainer, toast } from "react-toastify";
import ReactSelect from "react-select";
import ReactSelectOption from "../../../../components/ui/Form/ReactSelectOption";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";

function VendorSignupStepOne({
  isStepOne,
  stepOneStates,
  isUpdateVendorAccount,
}) {
  const genderOptions = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Prefer not to say",
      label: "Prefer not to say",
    },
  ];
  const fleetSizeOptions = [
    {
      value: "1-5",
      label: "1-5",
    },
    {
      value: "6-10",
      label: "6-10",
    },
    {
      value: "11-20",
      label: "11-20",
    },
    {
      value: "21-50",
      label: "21-50",
    },
    {
      value: "50-100",
      label: "50-100",
    },
  ];
  const fleetTypeOptions = [
    {
      value: "Toyota Corolla or Similar",
      label: "Toyota Corolla or Similar",
    },
    {
      value: "Toyota Rav 4 or Similar",
      label: "Toyota Rav 4 or Similar",
    },
    {
      value: "Toyota Prado or Similar",
      label: "Toyota Prado or Similar",
    },
    {
      value: "Mercedes E-Class or Similar",
      label: "Mercedes E-Class or Similar",
    },
    {
      value: "Toyota Hiace or Similar",
      label: "Toyota Hiace or Similar",
    },
  ];

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    console.log("HELLO FROM THIS COMPONENT");
    if (!isUpdateVendorAccount) {
      scrollTopRef.current.scrollIntoView();
    }
  }, [isStepOne]);

  // UPDATE DRIVER STATES
  const { isLoading, token, vendor, cities } = useSelector(
    (store) => store.vendor
  );
  const dispatch = useDispatch();
  // UPDATE DRIVER HANDLER
  async function handleUpdateVendor(e) {
    console.log("HELLO");
    e.preventDefault();
    const areFieldsEmpty = validateFields([
      stepOneStates?.firstName,
      stepOneStates?.middleName,
      stepOneStates?.lastName,
      stepOneStates?.email,
      stepOneStates?.gender,
      stepOneStates?.mobile,
      stepOneStates?.alternateMobile,
      stepOneStates?.education,
    ]);
    if (areFieldsEmpty) {
      console.log("HELLO 2");
      toast.error(areFieldsEmpty?.message);
    } else {
      console.log("HELLO 3");
      const values = {
        firstName: stepOneStates?.firstName,
        middleName: stepOneStates?.middleName,
        lastName: stepOneStates?.lastName,
        email: stepOneStates?.email,
        gender: stepOneStates?.gender?.value,
        mobile: stepOneStates?.mobile,
        alternateMobile: stepOneStates?.alternateMobile,
        education: stepOneStates?.education?.value,
      };

      console.log("HELLO 4");

      dispatch(
        updateVendor({
          values: { ...values },
          token: token,
          vendorId: vendor?._id,
        })
      );
    }
  }

  useEffect(() => {
    dispatch(fetchCities());
  }, []);

  // Format cities
  const [citiesData, setCitiesData] = useState();
  useEffect(() => {
    let updatedCityData = [];
    cities?.forEach((city) => {
      updatedCityData.push({
        value: city?._id,
        label: city?.cityName,
      });
    });

    setCitiesData(updatedCityData);
  }, [cities]);

  return (
    <div
      className={`${!isUpdateVendorAccount && "px-10 pt-10"}`}
      ref={scrollTopRef}
    >
      <ToastContainer />
      {!isUpdateVendorAccount && (
        <>
          <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
            Create an account
          </h2>
          <p className="text-sm">
            Sign up as a vendor to start driving for Shuttlelane
          </p>
        </>
      )}

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* Company Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="companyName" className="text-sm">
            Company Name
          </label>
          <input
            placeholder="Company Name"
            type="text"
            name="companyName"
            value={stepOneStates?.companyName}
            onChange={(e) => {
              console.log("state:", e.target.value);
              stepOneStates?.setCompanyName(e.target.value);
            }}
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Open 24 hours */}
        <div className="flex flex-row items-center gap-x-1">
          <input
            id="open24Hours"
            name="open24Hours"
            className=""
            type="checkbox"
            value={stepOneStates?.isOpen24Hours == true ? true : false}
            onChange={(e) => {
              console.log("ISOPEN24HOURS:", e.target.value);
              stepOneStates?.setIsOpen24Hours(!stepOneStates?.isOpen24Hours);
            }}
          />
          <label htmlFor="open24Hours" className="text-sm">
            Opens 24 Hours
          </label>
        </div>

        {/* Opening Hours */}
        {stepOneStates?.isOpen24Hours == false && (
          <div className="flex flex-col gap-y-1">
            <label htmlFor="alternateMobile" className="text-sm">
              Opening Hours
            </label>

            <DatePicker
              format="H:mm"
              hideSeconds={true}
              locale={enGB}
              value={stepOneStates?.openingHours}
              onChange={(time) => {
                console.log("DATE:", time);
                stepOneStates?.setOpeningHours(time);
              }}
              appearance="subtle"
              placeholder="Opening Hours"
              style={{
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                position: "relative",
                outline: "none",
                color: "black",
              }}
              className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
            />
          </div>
        )}

        {/* Closing Hours */}
        {stepOneStates?.isOpen24Hours == false && (
          <div className="flex flex-col gap-y-1">
            <label htmlFor="closingHours" className="text-sm">
              Closing Hours
            </label>

            <DatePicker
              format="H:mm"
              hideSeconds={true}
              locale={enGB}
              value={stepOneStates?.closingHours}
              onChange={(date) => {
                console.log("DATE:", date);
                stepOneStates?.setClosingHours(date);
              }}
              appearance="subtle"
              placeholder="Closing Hours"
              style={{
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                position: "relative",
                outline: "none",
                color: "black",
              }}
              className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
            />
          </div>
        )}

        {/* Company Email and address */}
        <div className="flex flex-col w-full lg:flex-row items-center gap-x-3 gap-y-3">
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="companyEmail" className="text-sm">
              Company Email
            </label>
            <input
              placeholder="abc@example.com"
              type="email"
              name="companyEmail"
              value={stepOneStates?.companyEmail}
              onChange={(e) => {
                console.log("state:", e.target.value);
                stepOneStates?.setCompanyEmail(e.target.value);
              }}
              className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
            />
          </div>
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <input
              placeholder="Office address"
              type="text"
              name="address"
              value={stepOneStates?.address}
              onChange={(e) => {
                console.log("state:", e.target.value);
                stepOneStates?.setAddress(e.target.value);
              }}
              className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
            />
          </div>
        </div>

        {/* City and Country */}
        <div className="flex flex-col w-full lg:flex-row items-center gap-x-3 gap-y-3">
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="city" className="text-sm">
              City
            </label>
            <input
              placeholder="Lagos"
              type="text"
              name="city"
              value={stepOneStates?.citySelected}
              onChange={(e) => {
                console.log("state:", e.target.value);
                stepOneStates?.setCitySelected(e.target.value);
              }}
              className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
            />
          </div>
          <div className="flex w-full flex-col gap-y-1">
            <label htmlFor="country" className="text-sm">
              Country
            </label>
            <input
              placeholder="Nigeria"
              type="text"
              name="country"
              value={stepOneStates?.country}
              onChange={(e) => {
                console.log("state:", e.target.value);
                stepOneStates?.setCountry(e.target.value);
              }}
              className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
            />
          </div>
        </div>

        {/* Operating Cities */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="emailAddress" className="text-sm">
            Operating Cities
          </label>

          <ReactSelect
            value={stepOneStates?.operatingCities}
            onChange={(value) => {
              console.log("OPERATING CITIES:", value);
              stepOneStates?.setOperatingCities(value);
            }}
            options={citiesData}
            isMulti
            allowSelectAll={true}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              ReactSelectOption,
            }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "transparent" : "transparent",
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
            placeholder="Operating Cities"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Fleet Size */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="fleetSize" className="text-sm">
            Fleet Size
          </label>

          <ReactSelect
            value={stepOneStates?.fleetSize}
            onChange={(value) => {
              stepOneStates?.setFleetSize(value);
            }}
            options={fleetSizeOptions}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "transparent" : "transparent",
                borderWidth: state.isFocused ? "0" : "0",
                backgroundColor: "transparent",
                position: "relative",
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
            placeholder="Fleet Size"
            className="w-full h-12 flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Fleet Type */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="fleetType" className="text-sm">
            Fleet Type
          </label>
          <ReactSelect
            value={stepOneStates?.fleetType}
            onChange={(value) => {
              stepOneStates?.setFleetType(value);
            }}
            options={fleetTypeOptions}
            isMulti
            allowSelectAll={true}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              ReactSelectOption,
            }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "transparent" : "transparent",
                borderWidth: state.isFocused ? "0" : "0",
                backgroundColor: "transparent",
                position: "relative",
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
            placeholder="Fleet Type"
            className={`w-full h-auto min-h-[14px] flex items-center border-[0.3px] focus:outline-none border-gray-400 rounded-lg`}
          />
        </div>

        {isUpdateVendorAccount && (
          <button
            type="submit"
            onClick={(e) => handleUpdateVendor(e)}
            className="lg:w-1/4 w-full h-13 p-3 focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
          >
            {isLoading ? (
              <ImSpinner2 size={21} className="text-white animate-spin" />
            ) : (
              "Save changes"
            )}
          </button>
        )}
      </form>
    </div>
  );
}

export default VendorSignupStepOne;
