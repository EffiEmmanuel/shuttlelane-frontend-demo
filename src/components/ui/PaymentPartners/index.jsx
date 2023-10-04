import { MdArrowRightAlt } from "react-icons/md";
import { Fade } from "react-reveal";

// Images
import paypal from "../../../assets/logos/paypal.svg";
import stripe from "../../../assets/logos/stripe.svg";
import flutterwave from "../../../assets/logos/flutterwave.png";

function PaymentPartners() {
  return (
    <div className="lg:px-24 px-7 bg-[#F7F6FF] flex lg:flex-row flex-col lg:items-center lg:justify-center gap-x-2">
      <Fade duration={800}>
        <div className="flex items-center justify-center lg:justify-normal gap-x-2 mt-10 lg:mt-0">
          <h4 className="text-sm font-semibold uppercase text-gray-500">
            OUR PAYMENT PARTNERS
          </h4>

          <MdArrowRightAlt size={16} className="text-gray-500" />
        </div>
      </Fade>

      <Fade duration={800}>
        <div className="mt-4 flex flex-row justify-center items-center gap-y-0 gap-x-10 -mt-5 lg:mt-0 flex-wrap">
          <img
            src={flutterwave}
            alt=""
            className="object-contain lg:w-[140px] w-[140px]"
          />
          <img
            src={"https://www.cdnlogo.com/logos/p/27/paystack.svg"}
            alt=""
            className="object-contain lg:w-[140px] w-[140px]"
          />
          <img
            src={paypal}
            alt=""
            className="object-contain lg:w-[90px] w-[90px]"
          />
          <img
            src={stripe}
            alt=""
            className="object-contain lg:w-[80px] w-[80px]"
          />
        </div>
      </Fade>
    </div>
  );
}

export default PaymentPartners;
