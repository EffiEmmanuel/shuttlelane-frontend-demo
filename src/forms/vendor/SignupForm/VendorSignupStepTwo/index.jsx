import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import DatePicker from "rsuite/DatePicker";
import "rsuite/dist/rsuite.css";
import enGB from "date-fns/locale/en-GB";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { updateVendor } from "../../../../redux/slices/vendorSlice";
import { validateFields } from "../../../../util";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function VendorSignupStepTwo({
  isStepTwo,
  stepTwoStates,
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
  const maritalStatusOptions = [
    {
      value: "Married",
      label: "Married",
    },
    {
      value: "Single",
      label: "Single",
    },
    {
      value: "Divorced",
      label: "Divorced",
    },
    {
      value: "Prefer not to say",
      label: "Prefer not to say",
    },
  ];
  const educationOptions = [
    {
      value: "Primary",
      label: "Primary",
    },
    {
      value: "Secondary",
      label: "Secondary",
    },
    {
      value: "Polytechnic",
      label: "Polytechnic",
    },
    {
      value: "University",
      label: "University",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  // Scroll to top handler
  const scrollTopRef = useRef(null);
  useEffect(() => {
    if (!isUpdateVendorAccount) {
      scrollTopRef.current.scrollIntoView();
    }
  }, [isStepTwo]);

  // UPDATE VENDOR STATES
  const { isLoading, token, vendor } = useSelector((store) => store.vendor);
  const dispatch = useDispatch();

  // UPDATE VENDOR HANDLER
  async function handleUpdateVendor(e) {
    e.preventDefault();
    const areFieldsEmpty = validateFields([
      stepTwoStates?.contactName,
      stepTwoStates?.contactEmail,
      stepTwoStates?.contactMobile,
    ]);
    if (areFieldsEmpty) {
      toast.error(areFieldsEmpty?.message);
    } else {
      const values = {
        contactName: stepTwoStates?.contactName,
        contactEmail: stepTwoStates?.contactEmail,
        contactMobile: stepTwoStates?.contactMobile?.value,
      };

      dispatch(
        updateVendor({
          values: { ...values },
          token: token,
          vendorId: vendor?._id,
        })
      );
    }
  }

  return (
    <div
      className={`${!isUpdateVendorAccount && "px-10 pt-10"}`}
      ref={scrollTopRef}
    >
      {!isUpdateVendorAccount && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
              Contact Details
            </h2>

            {/* <button className="h-5 w-16 text-sm flex items-center justify-center border-[.3px] border-shuttlelaneBlack rounded-full p-2">
          Skip
        </button> */}
          </div>
          <p className="text-sm">
            Sign up as a vendor to start driving for Shuttlelane
          </p>
        </>
      )}

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* Contact Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="contactName" className="text-sm">
            Contact Name
          </label>
          <input
            type="text"
            name="contactName"
            value={stepTwoStates?.contactName}
            onChange={(e) => {
              stepTwoStates?.setContactName(e.target.value);
            }}
            placeholder="Contact Name"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Contact Email */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="contactEmail" className="text-sm">
            Contact Email
          </label>
          <input
            type="text"
            name="contactEmail"
            value={stepTwoStates?.contactEmail}
            onChange={(e) => {
              stepTwoStates?.setContactEmail(e.target.value);
            }}
            placeholder="Contact Email"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Contact Phone */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="contactMobile" className="text-sm">
            Contact Phone
          </label>
          <PhoneInput
            country={"us"}
            searchPlaceholder="Search"
            placeholder="---- --- ----"
            value={stepTwoStates?.contactMobile}
            onChange={(value) => stepTwoStates?.setContactMobile(`+${value}`)}
            containerClass="w-full h-12 p-3 border-[.5px] border-gray-400 outline-none focus:outline-none rounded-lg text-sm"
            inputClass="border-none h-full"
            buttonClass="bg-transparent"
          />
        </div>

        {/* Bank Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="bank" className="text-sm">
            Bank Name
          </label>
          <input
            type="text"
            name="bank"
            value={stepTwoStates?.bank}
            onChange={(e) => {
              stepTwoStates?.setBank(e.target.value);
            }}
            placeholder="UBA - United Bank for Africa"
            name="bank"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Account Number */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="accountNumber" className="text-sm">
            Account Number
          </label>
          <input
            type="tel"
            name="accountNumber"
            value={stepTwoStates?.accountNumber}
            onChange={(e) => {
              stepTwoStates?.setAccountNumber(e.target.value);
            }}
            placeholder="***********"
            name="accountNumber"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {/* Account Name */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="accountName" className="text-sm">
            Account Name
          </label>
          <input
            type="text"
            name="accountName"
            value={stepTwoStates?.accountName}
            onChange={(e) => {
              stepTwoStates?.setAccountName(e.target.value);
            }}
            placeholder="John Chidera Akube"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        {isUpdateVendorAccount && (
          <button
            //   type="submit"
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

export default VendorSignupStepTwo;
