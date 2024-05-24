import React, { useEffect, useRef, useState } from "react";
import {
  setBookingId,
  setPaymentGateway,
  setPaymentStatus,
} from "../../../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PayPal({ justCreatedBooking, bookingTotal }) {
  const [description, setDescription] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (justCreatedBooking) {
      const purchaseDescription = `${
        justCreatedBooking?.bookingReference?.split("-")[0] == "AT"
          ? "Airport Transfer Booking"
          : justCreatedBooking?.bookingReference?.split("-")[0] == "CR"
          ? "Car Rental Booking"
          : justCreatedBooking?.bookingReference?.split("-")[0] == "PP"
          ? "Priority Pass Booking"
          : "Visa On Arrival Booking"
      }`;

      setDescription(purchaseDescription);
    }
  }, [justCreatedBooking]);

  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, error) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: description,
                amount: {
                  currency: "GPB",
                  value: Math.round(Number(bookingTotal)),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Successful order:", order);
          dispatch(setPaymentStatus("Successful"));
          dispatch(setPaymentGateway("PayPal"));
          dispatch(setBookingId(justCreatedBooking?._id));
          console.log("HELLO FROM THE ON SUCCESS FUNCTION");
          navigate(
            `/booking/payment-status?bid=${justCreatedBooking?._id}&&status=success&&ch=PayPal`
          );
        },
        onError: async (error) => {
          dispatch(setPaymentStatus("Failed"));
          dispatch(setPaymentGateway("PayPal"));
          dispatch(setBookingId(justCreatedBooking?._id));
          navigate(
            `/booking/payment-status?bid=${justCreatedBooking?._id}&&status=failed&&ch=PayPal`
          );
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
