// @ts-nocheck
import React, { useEffect } from "react";
import NavBar from "../../../components/ui/NavBar";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import InfoSlide from "../../../components/ui/InfoSlide";
import AirportTransferBookingSummary from "../../../components/ui/BookingSummary/AirportTransferBookingSummary";
import CarRentalBookingSummary from "../../../components/ui/BookingSummary/CarRentalBookingSummary";
import PriorityPassBookingSummary from "../../../components/ui/BookingSummary/PriorityPassBookingSummary";
import VisaOnArrivalBookingSummary from "../../../components/ui/BookingSummary/VisaOnArrivalBooking";
import { useNavigate } from "react-router-dom";

function ConfirmBookingPage() {
  // Fetch states from redux slice
  const { bookingType } = useSelector((store) => store.user);

  const navigator = useNavigate();

  // Check if bookingType is undefined
  useEffect(() => {
    if (!bookingType) {
      navigator("/?redirectFrom=confirmBooking");
    }
  }, []);

  return (
    <div className="relative bg-white text-shuttlelaneBlack">
      <ToastContainer />
      <div className="fixed w-full z-20">
        <NavBar isPurpleLogo={true} />
      </div>

      <div className="min-h-screen w-full bg-[#f1f1f1] flex justify-center">
        <div className="lg:px-24 px-7 py-32 w-full">
          {bookingType !== "Visa" && <InfoSlide />}

          {bookingType == "Airport" && <AirportTransferBookingSummary />}
          {bookingType == "Car" && <CarRentalBookingSummary />}
          {bookingType == "Priority" && <PriorityPassBookingSummary />}
          {bookingType == "Visa" && <VisaOnArrivalBookingSummary />}
        </div>
      </div>
    </div>
  );
}

export default ConfirmBookingPage;
