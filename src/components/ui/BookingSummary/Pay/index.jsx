// @ts-nocheck
import React, { useState } from "react";
// Images
import paypal from "../../../../assets/logos/paypal.png";
import flutterwave from "../../../../assets/logos/flutterwave.png";
import stripe from "../../../../assets/logos/stripe.png";
import { ImSpinner2 } from "react-icons/im";
import { MdOutlineLock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

// Flutterwave payment
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { createBooking } from "../../../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";

export default function Pay(props) {
  // Button states
  const [isFlutterwave, setIsFlutterwave] = useState(false);
  const [isPaystack, setIsPaystack] = useState(false);
  const [isPaypal, setIsPaypal] = useState(false);
  const [isStripe, setIsStripe] = useState(false);

  // Fetch states from redux slice
  const { isLoading, bookingDetails, bookingType, userCurrency, bookingTotal } =
    useSelector((store) => store.user);
  const dispatch = useDispatch();

  // FLWPUBK-4e040f92b25e6e3615d680449918aeb5-X
  const [flutterwaveConfig, setFlutterwaveConfig] = useState();
  const handleFlutterPayment = useFlutterwave({
    public_key: process.env.REACT_APP_FLUTTERWAVE_KEY,
    tx_ref: Date.now(),
    amount: bookingTotal,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phone_number: "07029558155",
      name: "john doe",
    },
    meta: { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  });

  async function handleFlutterwavePayment() {
    // First of all create the booking then, proceed to make payment
    dispatch(
      createBooking({
        bookingType,
        bookingDetails: {
          ...bookingDetails,
          title: props?.selectedTitle,
          fullName: props?.fullName,
          mobile: props?.phoneNumber,
          email: props?.email,
          flightNumber: props?.flightNumber,
          airline: props?.airline,
        },
      })
    );

    // Handle Payment
    if (isFlutterwave) {
      // Pay with flutterwave here
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          closePaymentModal();
        },
        onClose: () => {
          toast.error("Payment was canceled");
        },
      });
    } else if (isPaystack) {
    } else if (isPaypal) {
    } else if (isStripe) {
    } else {
      toast.error("Please select a valid payment option");
    }
  }

  return (
    <div className="bg-white p-7 mt-4 relative">
      <ToastContainer />
      {props?.isPaymentDisabled && (
        <div className="flex text-shuttlelaneBlack flex-col gap-y-1 items-center justify-center p-3 absolute w-full h-full bg-white bg-opacity-20 backdrop-blur-sm top-0 left-0 z-10">
          <MdOutlineLock size={24} className="text-green-500" />
          <p className="lg:max-w-md text-center font-semibold">
            Payment is locked. Please fill in all required fields to unlock
            payment.
          </p>
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-xl font-semibold">Pay</p>
        <p className="text-sm -mt-1">
          Choose how to pay from our different payment providers
        </p>
      </div>

      <div
        className={`mt-5 flex flex-row ${
          !userCurrency || userCurrency == null
            ? "lg:justify-center"
            : "lg:justify-between"
        }  justify-center items-center gap-y-0 gap-5 flex-wrap`}
      >
        {!userCurrency || userCurrency == null ? (
          <>
            <button
              className={`border-dashed h-14 focus:outline-none p-3 flex items-center justify-center ${
                isFlutterwave && "border-shuttlelanePurple border-[2px]"
              }`}
              onClick={(e) => {
                setIsFlutterwave(true);
                setIsPaystack(false);
                setIsPaypal(false);
                setIsStripe(false);
              }}
            >
              <img
                src={flutterwave}
                alt=""
                className="object-contain lg:w-[140px] w-[140px]"
              />
            </button>

            <button
              className={`border-dashed h-14 focus:outline-none p-3 flex items-center justify-center ${
                isPaystack && "border-shuttlelanePurple border-[2px]"
              }`}
              onClick={(e) => {
                setIsFlutterwave(false);
                setIsPaystack(true);
                setIsPaypal(false);
                setIsStripe(false);
              }}
            >
              <img
                src={"https://www.cdnlogo.com/logos/p/27/paystack.svg"}
                alt=""
                className="object-contain lg:w-[140px] w-[140px]"
              />
            </button>
          </>
        ) : (
          <>
            <button
              className={`border-dashed h-14 focus:outline-none p-3 flex items-center justify-center ${
                isFlutterwave && "border-shuttlelanePurple border-[2px]"
              }`}
              onClick={(e) => {
                setIsFlutterwave(true);
                setIsPaystack(false);
                setIsPaypal(false);
                setIsStripe(false);
              }}
            >
              <img
                src={flutterwave}
                alt=""
                className="object-contain lg:w-[140px] w-[140px]"
              />
            </button>

            <button
              className={`border-dashed h-14 focus:outline-none p-3 flex items-center justify-center ${
                isPaystack && "border-shuttlelanePurple border-[2px]"
              }`}
              onClick={(e) => {
                setIsFlutterwave(false);
                setIsPaystack(true);
                setIsPaypal(false);
                setIsStripe(false);
              }}
            >
              <img
                src={"https://www.cdnlogo.com/logos/p/27/paystack.svg"}
                alt=""
                className="object-contain lg:w-[140px] w-[140px]"
              />
            </button>

            <button
              className={`border-dashed h-14 focus:outline-none p-3 flex items-center justify-center ${
                isPaypal && "border-shuttlelanePurple border-[2px]"
              }`}
              onClick={(e) => {
                setIsFlutterwave(false);
                setIsPaystack(false);
                setIsPaypal(true);
                setIsStripe(false);
              }}
            >
              <img
                src={paypal}
                alt=""
                className="object-contain lg:w-[90px] w-[90px]"
              />
            </button>

            <button
              className={`border-dashed h-14 focus:outline-none p-3 flex items-center justify-center ${
                isStripe && "border-shuttlelanePurple border-[2px]"
              }`}
              onClick={(e) => {
                setIsFlutterwave(false);
                setIsPaystack(false);
                setIsPaypal(false);
                setIsStripe(true);
              }}
            >
              <img
                src={stripe}
                alt=""
                className="object-contain lg:w-[80px] w-[80px]"
              />
            </button>
          </>
        )}
      </div>

      <div className="flex justify-center mt-10">
        {(isFlutterwave || isPaystack || isPaypal || isStripe) && (
          <button
            onClick={(e) => handleFlutterwavePayment(e)}
            className={`bg-green-500 lg:w-[40%] w-full text-white animate-pulse text-sm rounded-md p-2 flex justify-center items-center`}
          >
            {isLoading ? (
              <ImSpinner2 size={20} className="text-white animate-spin" />
            ) : (
              <span>Book Now</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
