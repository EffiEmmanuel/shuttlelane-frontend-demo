import React, { useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { createShuttlelanePayment } from "../../../redux/slices/userSlice";
import { Helmet } from "react-helmet";

export default function PaymentStatus() {
  const { isLoading, paymentStatus, paymentGateway, bookingId } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (paymentStatus && bookingId) {
      dispatch(
        createShuttlelanePayment({
          paymentStatus: paymentStatus,
          booking: bookingId,
          gateway: paymentGateway,
        })
      );
    }
  }, [paymentStatus, bookingId]);

  return (
    <div className="min-h-screen w-full flex flex-row items-center justify-center bg-white text-white">
      <Helmet>
        <title>Payment {paymentStatus} | Shuttlelane</title>
      </Helmet>

      {paymentStatus === "Successful" && !isLoading && (
        <div className="h-64 w-54 p-8 bg-green-500 rounded-lg flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center gap-y-1">
            <MdCheckCircleOutline size={60} className="text-white" />
            <p className="text-xl font-semi-semibold">Payment Successful</p>
          </div>

          <div className="">
            <p className="text-sm">Thank you for booking with Shuttlelane!</p>
            <p className="mt-10 text-xs">
              <Link
                className="text-xs text-white visited:text-white hover:text-shuttlelanePurple"
                to="/"
              >
                Go back to homepage
              </Link>
            </p>
          </div>
        </div>
      )}
      {paymentStatus === "Failed" && !isLoading && (
        <div className="h-64 w-54 p-8 bg-red-500 rounded-lg flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center gap-y-1">
            <MdCheckCircleOutline size={60} className="text-white" />
            <p className="text-xl font-semi-semibold">Payment Failed</p>
          </div>

          <div className="">
            <p className="text-sm">Having trouble making payment?</p>
            <p className="mt-10 text-xs">
              <Link
                className="text-xs text-white visited:text-white hover:text-shuttlelanePurple"
                to="/"
              >
                Contact info@shuttlelane.com immediately, to lay a complaint
              </Link>
            </p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="h-64 w-54 p-8 rounded-lg flex flex-col items-center justify-center text-center">
          <ImSpinner2
            size={40}
            className="text-shuttlelanePurple animate-spin"
          />
        </div>
      )}
    </div>
  );
}
