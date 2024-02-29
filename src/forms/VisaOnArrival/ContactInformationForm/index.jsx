import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import "rsuite/dist/rsuite.css";

export default function ContactInformationForm({
  contactName,
  setContactName,
  contactNumber,
  setContactNumber,
  contactAddress,
  setContactAddress,
  contactCity,
  setContactCity,
  contactState,
  setContactState,
  contactEmail,
  setContactEmail,
  contactPostalCode,
  setContactPostalCode,
  handleNext,
  handlePrev,
}) {
  // TO-DO: Add "Select" options for "Port of entry"
  //   const maritalStatusData = [
  //     { value: "Single", label: "Single" },
  //     { value: "Married", label: "Married" },
  //     { value: "Divorced", label: "Divorced" },
  //     { value: "Prefer not to say", label: "Prefer not to say" },
  //   ];

  const { isLoading, voaRates, bookingDetails, bookingType } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  return (
    <form className="my-5 w-full flex flex-col gap-y-4">
      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="contactName" className="text-xs text-gray-500">
            Contact Name / Hotel Name
          </label>
          <input
            type="text"
            name="contactName"
            placeholder="Contact Name Or Hotel Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>

        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="contactNumber" className="text-xs text-gray-500">
            Contact Number
          </label>
          <PhoneInput
            country={"us"}
            searchPlaceholder="Search"
            placeholder="---- --- ----"
            value={contactNumber}
            onChange={(value) => setContactNumber(`+${value}`)}
            containerClass="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
            inputClass="border-none h-full"
            buttonClass="bg-transparent"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="contactAddress" className="text-xs text-gray-500">
            Address
          </label>
          <textarea
            type="text"
            name="address"
            placeholder="123 John Doe Street"
            value={contactAddress}
            onChange={(e) => setContactAddress(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          ></textarea>
        </div>

        <div className="w-full flex flex-col gap-y-4 lg:w-[50%]">
          <div className="w-full flex flex-col gap-y-1">
            <label htmlFor="contactCity" className="text-xs text-gray-500">
              City / Town
            </label>
            <input
              type="text"
              name="contactCity"
              placeholder="Lagos Island"
              value={contactCity}
              onChange={(e) => setContactCity(e.target.value)}
              className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-4 lg:w-[50%]">
          <div className="w-full flex flex-col gap-y-1">
            <label htmlFor="contactState" className="text-xs text-gray-500">
              State
            </label>
            <input
              type="text"
              name="contactState"
              placeholder="Lagos"
              value={contactState}
              onChange={(e) => setContactState(e.target.value)}
              className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="contactEmail" className="text-xs text-gray-500">
            Contact Email Address
          </label>
          <input
            type="email"
            name="contactEmail"
            placeholder="abc@example.com"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
        <div className="w-full flex flex-col gap-y-1 lg:w-[50%]">
          <label htmlFor="postalCode" className="text-xs text-gray-500">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            placeholder="102101"
            value={contactPostalCode}
            onChange={(e) => setContactPostalCode(e.target.value)}
            className="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex flex-row gap-4 lg:items-center">
        {/* Prev */}
        <div className="flex flex-col gap-y-1 w-32">
          <button
            type="submit"
            className="bg-shuttlelaneGold disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 disabled:cursor-not-allowed text-white h-10 rounded-lg mt-3 flex items-center gap-x-3 p-3 w-32 justify-center"
            onClick={(e) => handlePrev(e, "step4")}
          >
            <span className="text-sm">Go back</span>
          </button>
        </div>
        {/* Next */}
        <div className="flex flex-col gap-y-1 w-32">
          <button
            type="submit"
            className="bg-shuttlelanePurple disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 disabled:cursor-not-allowed text-white h-10 rounded-lg mt-3 flex items-center gap-x-3 p-3 w-32 justify-center"
            disabled={
              !contactName ||
              !contactNumber ||
              !contactAddress ||
              !contactCity ||
              !contactState ||
              !contactEmail ||
              !contactPostalCode
            }
            onClick={(e) => handleNext(e, "step4")}
          >
            <span className="text-sm">Confirm</span>
          </button>
        </div>
      </div>
    </form>
  );
}
