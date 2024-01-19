import React, { useState } from "react";
// Images
import paypal from "../../../../assets/logos/paypal.png";
import flutterwave from "../../../../assets/logos/flutterwave.png";
import stripe from "../../../../assets/logos/stripe.png";

export default function Pay() {
  // Button states
  const [isFlutterwave, setIsFlutterwave] = useState(false);
  const [isPaystack, setIsPaystack] = useState(false);
  const [isPaypal, setIsPaypal] = useState(false);
  const [isStripe, setIsStripe] = useState(false);

  return (
    <div className="bg-white p-7 mt-10">
      <div className="flex flex-col">
        <p className="text-xl font-semibold">Pay</p>
        <p className="text-sm -mt-1">
          Choose how to pay from our different payment providers
        </p>
      </div>

      <div className="mt-5 flex flex-row lg:justify-between justify-center items-center gap-y-0 gap-5 flex-wrap">
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
      </div>

      <div className="flex justify-center mt-10">
        {(isFlutterwave || isPaystack || isPaypal || isStripe) && (
          <button
            // onClick={() => handleSetVehicleClass(vehicleClass)}
            className={`bg-green-500 lg:w-[40%] w-full text-white animate-pulse text-sm rounded-md p-2 flex justify-center items-center`}
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}
