// @ts-nocheck
import React, { useState } from "react";
import { BsAirplane } from "react-icons/bs";
import { MdOutlineLuggage } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";

// Images
import AdminAirportTransferForm from "./AdminAirportTransferForm";
import AdminCarRentalForm from "./AdminCarRentalForm";
import AdminPriorityPassForm from "./AdminPriorityPassForm";

function AdminAddBookingForm() {
  // Service options states
  const [isAirportTransfer, setIsAirportTransfer] = useState(true);
  const [isCarRental, setIsCarRental] = useState(false);
  const [isPriorityPass, setIsPriorityPass] = useState(false);
  const [isVisaOnArrival, setIsVisaOnArrival] = useState(false);
  // TOGGLE SERVICE STATE
  function toggleService(service) {
    switch (service) {
      case "airport":
        setIsAirportTransfer(true);
        setIsCarRental(false);
        setIsPriorityPass(false);
        setIsVisaOnArrival(false);
        break;

      case "carRental":
        setIsAirportTransfer(false);
        setIsCarRental(true);
        setIsPriorityPass(false);
        setIsVisaOnArrival(false);
        break;

      case "priorityPass":
        setIsAirportTransfer(false);
        setIsCarRental(false);
        setIsPriorityPass(true);
        setIsVisaOnArrival(false);
        break;

      case "visaOnArrival":
        setIsAirportTransfer(false);
        setIsCarRental(false);
        setIsPriorityPass(false);
        setIsVisaOnArrival(true);
        break;

      default:
        setIsAirportTransfer(true);
        setIsCarRental(false);
        setIsPriorityPass(false);
        setIsVisaOnArrival(false);
        break;
    }
  }

  return (
    <div className="">
      <h2 className="font-semibold text-xl text-shuttlelaneBlack">
        Add New Booking
      </h2>
      <p className="text-sm">Manually add a new booking</p>

      {/* SERVICE OPTIONS */}
      <div className="mt-5 h-auto gap-y-3 lg:w-3/4 w-full flex flex-wrap items-center lg:items-center py-2 gap-x-4 relative rounded-2xl">
        <button
          onClick={() => toggleService("airport")}
          className={`flex  items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
            isAirportTransfer
              ? "text-white bg-shuttlelanePurple border-white"
              : "text-shuttlelaneBlack bg-transparent border-shuttlelaneBlack"
          } transition-all border-dashed border-[1.2px] lg:border-[.5px]`}
        >
          <BsAirplane size={16} />
          <p className="text-sm">Airport Transfer</p>
        </button>
        <button
          onClick={() => toggleService("carRental")}
          className={`flex items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
            isCarRental
              ? "text-white bg-shuttlelanePurple border-white"
              : "text-shuttlelaneBlack bg-transparent border-shuttlelaneBlack"
          } transition-all border-dashed border-[1.2px] lg:border-[.5px]`}
        >
          <IoCarSportOutline size={18} />
          <p className="text-sm">Car Rental</p>
        </button>
        <button
          onClick={() => toggleService("priorityPass")}
          className={`flex items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
            isPriorityPass
              ? "text-white bg-shuttlelanePurple border-white"
              : "text-shuttlelaneBlack bg-transparent border-shuttlelaneBlack"
          } transition-all border-dashed border-[1.2px] lg:border-[.5px]`}
        >
          <MdOutlineLuggage size={18} />
          <p className="text-sm">Priority Pass</p>
        </button>
        <button
          //   onClick={() => toggleService("visaOnArrival")}
          onClick={() => {
            // toast.info("This service is under construction");
          }}
          className={`flex items-center gap-x-[5px] h-[30px] min-w-[60px] px-5 rounded-full ${
            isVisaOnArrival
              ? "text-white bg-shuttlelanePurple border-white"
              : "text-shuttlelaneBlack bg-transparent border-shuttlelaneBlack "
          } transition-all border-dashed border-[1.2px] lg:border-[.5px]`}
        >
          <BsAirplane size={16} />
          <p className="text-sm">Visa On Arrival</p>
        </button>
      </div>

      <div className="lg:w-2/4 w-full">
        {isAirportTransfer && <AdminAirportTransferForm />}
        {isCarRental && <AdminCarRentalForm />}
        {isPriorityPass && <AdminPriorityPassForm />}
      </div>
    </div>
  );
}

export default AdminAddBookingForm;
