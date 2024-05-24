// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
// Images
import paypal from "../../../../assets/logos/paypal.png";
import flutterwave from "../../../../assets/logos/flutterwave.png";
import stripe from "../../../../assets/logos/stripe.png";
import { ImSpinner2 } from "react-icons/im";
import { MdOutlineLock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

// Flutterwave payment
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
// Stripe payment
import { loadStripe } from "@stripe/stripe-js";

import {
  createBooking,
  fetchBookingByReference,
  setBookingId,
  setPaymentStatus,
  setPaymentGateway,
} from "../../../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import PayPal from "./PayPal";
import { PaystackButton } from "react-paystack";
import PaystackPop from "@paystack/inline-js";
import { useNavigate } from "react-router-dom";

export default function Pay(props) {
  const navigate = useNavigate();
  // Button states
  const [isFlutterwave, setIsFlutterwave] = useState(false);
  const [isPaystack, setIsPaystack] = useState(false);
  const [isPaypal, setIsPaypal] = useState(false);
  const [isStripe, setIsStripe] = useState(false);

  // PayPal button ref
  const paypalRef = useRef();

  // Fetch states from redux slice
  const {
    isLoading,
    bookingDetails,
    bookingType,
    userCurrency,
    bookingTotal,
    createBookingStatusCode,
    justCreatedBooking,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [flutterwaveConfig, setFlutterwaveConfig] = useState();
  const handleFlutterPayment = useFlutterwave({
    public_key: process.env.REACT_APP_FLUTTERWAVE_KEY,
    tx_ref: Date.now(),
    amount: bookingTotal,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: `${justCreatedBooking?.user?.email ?? justCreatedBooking?.email}`,
      phone_number: `${
        justCreatedBooking?.user?.mobile ?? justCreatedBooking?.mobile
      }`,
      name: `${
        justCreatedBooking?.user?.firstName ?? justCreatedBooking?.firstName
      } ${justCreatedBooking?.user?.lastName ?? justCreatedBooking?.lastName}`,
    },
    meta: { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" },
    customizations: {
      title: "Shuttlelane Limited",
      description: `Payment for ${justCreatedBooking?.bookingType} Booking`,
      logo: "https://res.cloudinary.com/shuttlelane/image/upload/v1711736954/jlkxdbklxpilwtriq14h.png",
    },
    callback: (response) => {
      console.log(response);
      dispatch(setPaymentStatus("Successful"));
      dispatch(setPaymentGateway("Flutterwave"));
      dispatch(setBookingId(justCreatedBooking?._id));
      navigate(
        `/booking/payment-status?bid=${justCreatedBooking?._id}&&status=success&&ch=Flutterwave`
      );
    },
    onClose: () => {
      dispatch(setPaymentStatus("Failed"));
      dispatch(setPaymentGateway("Flutterwave"));
      dispatch(setBookingId(justCreatedBooking?._id));
      navigate(
        `/booking/payment-status?bid=${justCreatedBooking?._id}&&status=failed&&ch=Flutterwave`
      );
    },
  });

  // Stripe payment handler
  async function handleStripePayment() {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

    console.log("JUST CREATED 2 BOOKING:::::", justCreatedBooking);

    const category = `${
      justCreatedBooking?.bookingReference?.split("-")[0] == "AT"
        ? "Airport Transfer Booking"
        : justCreatedBooking?.bookingReference?.split("-")[0] == "CR"
        ? "Car Rental Booking"
        : justCreatedBooking?.bookingReference?.split("-")[0] == "PP"
        ? "Priority Pass Booking"
        : "Visa On Arrival Booking"
    }`;

    console.log("CATEGORY:", category);

    const cart = [
      {
        id: justCreatedBooking?.bookingReference,
        category: category,
        image:
          justCreatedBooking?.bookingReference?.split("-")[0] == "AT"
            ? "https://res.cloudinary.com/shuttlelane/image/upload/v1711374305/oaze6ojhup0jxi7yuqng.svg"
            : justCreatedBooking?.bookingReference?.split("-")[0] == "CR"
            ? "https://res.cloudinary.com/shuttlelane/image/upload/v1711374637/gxcuakga3gznyrl7zdtd.svg"
            : justCreatedBooking?.bookingReference?.split("-")[0] == "PP"
            ? "https://res.cloudinary.com/shuttlelane/image/upload/v1711374598/dtopiaszjxldz365b8pq.svg"
            : "https://res.cloudinary.com/shuttlelane/image/upload/v1711374666/flaflpn6dai40jyupfop.svg",

        name: category,
        price: Number(props?.bookingTotal),
        quantity: 1,
      },
    ];

    console.log("CART:", cart);

    const body = {
      products: cart,
      bookingId: justCreatedBooking?.bookingReference,
    };
    console.log("PRODIUSTS:", body);

    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .post(
        "https://www.shuttlelane.com/api/v1/payments/stripe/create-intent",
        body
      )
      .then((res) => {
        console.log("RESPONSE FROM FRONTEND:", res.data);
        const result = stripe
          .redirectToCheckout({
            sessionId: res.data?.id,
          })
          .then((res) => {
            dispatch(setPaymentStatus("Successful"));
            dispatch(setPaymentGateway("Stripe"));
            dispatch(setBookingId(justCreatedBooking?._id));
            console.log("HELLO FROM THE ON SUCCESS FUNCTION");
            navigate(
              `/booking/payment-status?bid=${justCreatedBooking?._id}&&status=success`
            );
          })
          .catch((error) => {
            dispatch(setPaymentStatus("Failed"));
            dispatch(setPaymentGateway("Stripe"));
            dispatch(setBookingId(justCreatedBooking?._id));
            console.log("HELLO FROM THE ON FAILED FUNCTION");
            navigate(
              `/booking/payment-status?bid=${justCreatedBooking?._id}&&status=failed`
            );
          });
      })
      .catch((error) => {
        console.log("ERROR FROM FRONTEND:", error);
        dispatch(setPaymentStatus("Failed"));
        dispatch(setPaymentGateway("Stripe"));
        dispatch(setBookingId(justCreatedBooking?._id));
        console.log("HELLO FROM THE ON FAILED FUNCTION");
        navigate(
          `/booking/payment-status?bid=${justCreatedBooking?._id}&&status=failed`
        );
      });
  }

  // Paypal payment states
  const [isPayPalActive, setIsPaypalActive] = useState(false);

  // PayStack payment states
  const [isPayStackActive, setIsPayStackActive] = useState(false);

  async function payWithPayStack() {
    const payStack = new PaystackPop();
    console.log("HIIIIII");
    payStack.newTransaction({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      amount: Number(justCreatedBooking?.bookingTotal) * 100,
      email: justCreatedBooking?.email,
      firstName: `${
        justCreatedBooking?.firstName ?? justCreatedBooking?.user?.firstName
      }`,
      lastName: `${
        justCreatedBooking?.lastName ?? justCreatedBooking?.user?.lastName
      }`,
      phone: justCreatedBooking?.mobile ?? justCreatedBooking?.user?.mobile,
      onSuccess: (transaction) => {
        dispatch(setPaymentStatus("Successful"));
        dispatch(setPaymentGateway("PayStack"));
        dispatch(setBookingId(justCreatedBooking?._id));
        console.log("HELLO FROM THE ON SUCCESS FUNCTION");
        navigate(
          `/booking/payment-status?bid=${justCreatedBooking?._id}&&status=success&&ch=PayStack`
        );
      },

      onClose: () => {
        dispatch(setPaymentStatus("Failed"));
        dispatch(setPaymentGateway("PayStack"));
        dispatch(setBookingId(justCreatedBooking?._id));
        navigate(
          `/booking/payment-status?bid=${justCreatedBooking?._id}&&status=failed&&ch=PayStack`
        );
      },
    });
  }

  async function handlePayment() {
    console.log("the user currency:", userCurrency);
    console.log("booking total:", bookingTotal);
    console.log("booking type:", bookingType);
    // First of all create the booking then, proceed to make payment
    if (bookingType !== "Visa") {
      dispatch(
        createBooking({
          bookingType,
          bookingDetails: {
            ...bookingDetails,
            title: props?.selectedTitle,
            fullName: `${props?.firstName} ${props?.lastName}`,
            mobile: props?.phoneNumber,
            email: props?.email,
            flightNumber: props?.flightNumber,
            airline: props?.airline,
            bookingTotal: bookingTotal,
            bookingCurrency: userCurrency,
          },
        })
      );
    } else {
      dispatch(
        createBooking({
          bookingType,
          bookingDetails: {
            ...bookingDetails,
            bookingTotal: bookingTotal,
            bookingCurrency: userCurrency,
          },
        })
      );
    }
  }

  useEffect(() => {
    console.log("USER CURRENCT OVER HERE IS:", userCurrency);
  }, [userCurrency]);

  useEffect(() => {
    if (createBookingStatusCode == 201) {
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
        payWithPayStack();
        console.log("JUST CREATED BOOKING:", justCreatedBooking);
      } else if (isPaypal) {
        setIsPaypalActive(true);
      } else if (isStripe) {
        handleStripePayment();
      } else {
        toast.error("Please select a valid payment option");
      }
    }
  }, [createBookingStatusCode, justCreatedBooking]);

  return (
    <div className="bg-white p-7 mt-4 relative">
      {/* Render PayPal Component Here */}
      <ToastContainer />
      {props?.isPaymentDisabled && (
        <div className="flex text-shuttlelaneBlack flex-col gap-y-1 items-center justify-center p-3 absolute w-full h-full bg-white bg-opacity-20 backdrop-blur-sm top-0 left-0 z-10">
          <MdOutlineLock size={24} className="text-green-500" />
          {bookingType !== "Car" ? (
            <p className="lg:max-w-md text-center font-semibold">
              Payment is locked. Please fill in all required fields to unlock
              payment.
            </p>
          ) : (
            <p className="lg:max-w-md text-center font-semibold">
              Please fill in all required fields to proceed.
            </p>
          )}
        </div>
      )}
      <div className="flex flex-col">
        <>
          <p className="text-xl font-semibold">Select Payment Method</p>
          <p className="text-sm -mt-1">
            Choose how to pay from our different payment providers
          </p>
        </>
      </div>
      {bookingType !== "Visa" ? (
        <>
          <div
            className={`mt-5 flex flex-row ${
              !userCurrency ||
              userCurrency == null ||
              userCurrency?.currencyLabel == "Naira"
                ? "lg:justify-center"
                : ""
            }  justify-center items-center gap-y-0 gap-5 flex-wrap`}
          >
            {!userCurrency ||
            userCurrency == null ||
            userCurrency?.currencyLabel == "Naira" ? (
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
            ) : userCurrency?.currencyLabel == "Dollars" ? (
              <>
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
            ) : userCurrency?.currencyLabel == "Pounds" ? (
              <>
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
            ) : (
              <>
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
              </>
            )}
          </div>
        </>
      ) : (
        <div className="mt-5 flex flex-row lg:justify-center justify-center items-center gap-y-0 gap-5 flex-wrap">
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
        </div>
      )}

      <div className="flex justify-center mt-10">
        {(isFlutterwave || isPaystack || isPaypal || isStripe) && (
          <>
            {!isPayPalActive && (
              <button
                onClick={(e) => handlePayment(e)}
                className={`bg-green-500 lg:w-[40%] w-full text-white animate-pulse text-sm rounded-md p-2 flex justify-center items-center`}
              >
                {isLoading ? (
                  <ImSpinner2 size={20} className="text-white animate-spin" />
                ) : (
                  <span>Book Now</span>
                )}
              </button>
            )}
            {isPayPalActive && (
              <PayPal
                justCreatedBooking={justCreatedBooking}
                bookingTotal={bookingTotal}
              />
            )}
          </>
        )}
      </div>

      {/* // <div className="flex justify-center mt-10">
        //   <button
        //     onClick={(e) => handlePayment(e)}
        //     className={`bg-green-500 lg:w-[40%] w-full text-white animate-pulse text-sm rounded-md p-2 flex justify-center items-center`}
        //   >
        //     {isLoading ? (
        //       <ImSpinner2 size={20} className="text-white animate-spin" />
        //     ) : (
        //       <span>Book Now</span>
        //     )}
        //   </button>
        // </div> */}
    </div>
  );
}
