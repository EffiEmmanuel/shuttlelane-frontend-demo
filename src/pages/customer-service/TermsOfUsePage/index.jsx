// @ts-nocheck
import React, { useRef, useState } from "react";
import NavBar from "../../../components/ui/NavBar";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import Footer from "../../../components/ui/Footer";
import PaymentPartners from "../../../components/ui/PaymentPartners";
import HowToReachUs from "../../../components/ui/HowToReachUs";
import { BiArrowBack, BiMenu } from "react-icons/bi";
import FAQs from "../../../components/ui/FAQSection/FAQs";
import { Helmet } from "react-helmet";

function TermsOfUsePage() {
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Terms of Service | Shuttlelane</title>
      </Helmet>

      {/* FLOATING MENU */}
      {isMenuHidden && (
        <Fade duration={300}>
          <div
            onMouseOver={() => setIsMenuHidden(true)}
            onMouseOut={() => setIsMenuHidden(false)}
            className="fixed flex p-5 justify-center items-center z-[80] bottom-7 right-7 h-auto lg:w-[25%] md:w-[50%] w-[70%]"
          >
            <div
              onMouseOver={() => setIsMenuHidden(true)}
              onMouseOut={() => setIsMenuHidden(false)}
              className="bg-white shadow-lg rounded-lg h-full w-full py-5"
            >
              <h2 className="text-xl font-medium px-5 mb-4 text-shuttlelanePurple">
                Customer Service
              </h2>
              <ul className="text-xs flex flex-col gap-y-1">
                <li className="py-3 px-5">
                  <Link
                    to="/customer-service/faqs"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Frequently Asked Questions (FAQs)
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/company/get-in-touch"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Report A Problem
                  </Link>
                </li>
                <li className="py-3 px-5 bg-shuttlelanePurple">
                  <Link
                    to="/customer-service/terms-of-use"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-white visited:text-white text-white"
                  >
                    Terms Of Use
                  </Link>
                </li>
                <li className="py-3 px-5">
                  <Link
                    to="/customer-service/privacy-policy"
                    className="inline-block w-full hover:no-underline visited:no-underline hover:text-shuttlelaneBlack visited:text-shuttlelaneBlack text-shuttlelaneBlack"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Fade>
      )}

      {/* FLOATING MENU ICON */}
      <div
        onMouseOver={() => setIsMenuHidden(true)}
        onMouseOut={() => setIsMenuHidden(false)}
        onClick={() => setIsMenuHidden(!isMenuHidden)}
        className="fixed shadow-lg cursor-pointer hover:animate-spin-slow flex justify-center items-center z-[85] bottom-10 right-10 bg-shuttlelaneGold h-14 w-14 rounded-full"
      >
        <BiMenu
          size={28}
          className={`text-white transition-all ${
            isMenuHidden ? "hidden" : "inline-block"
          }`}
        />

        <AiOutlineClose
          size={28}
          className={`text-white transition-all ${
            !isMenuHidden ? "hidden" : "inline-block"
          }`}
        />
      </div>

      {/* Back to homepage button */}
      <div className="bg-white h-32 w-full px-7 py-14 lg:px-24">
        <Link
          to="/"
          className="h-12 transition-all flex items-center gap-x-1 p-3 bg-transparent text-shuttlelaneBlack border-[.5px] border-shuttlelaneBlack transition-all hover:bg-shuttlelaneLightPurple visited:text-shuttlelaneBlack hover:no-underline visited:no-underline text-shuttlelaneBlack text-sm w-64 inline-block flex justify-center items-center "
        >
          <BiArrowBack size={16} />
          <span className="text-sm">Back to Homepage</span>
        </Link>
      </div>

      {/* TERMS OF USE */}
      <div className="relative bg-shuttlelaneLightPurple px-7 lg:px-24 py-10 w-full">
        <div className="text-shuttlelaneBlack">
          <h3 className="text-3xl text-left font-semibold mt-3 leading-[39px]">
            TERMS OF USE
          </h3>
          <div className="flex flex-col text-left gap-y-2 leading-[22px] mt-5">
            <p className="text-[1rem] font-normal">
              Shuttlelane is a limited company registered in Nigeria, whose
              registered Address is at 2 Martins Street, Yaba, Lagos, Nigeria.
            </p>
            <p className="text-[1rem] font-normal">
              The terms and conditions regard Shuttlelane, the Customer and the
              Passenger. The Customer is a party who makes the booking. The
              Passenger is a party who travels with Shuttlelane. A pick-up shall
              be understood as a moment of entering a pre-booked taxi of
              Shuttlelane. A drop off shall be considered as a time of leaving
              pre-booked vehicle by the Passenger. Journey is a trip between
              pick up and drop off.
            </p>
            <p className="text-[1rem] font-normal">
              Shuttlelane reserves its rights to amend the Terms and Conditions
              at any time. All Customers and Passengers are advised to read the
              Terms and Conditions. It is a Customer’s/ Passenger’s
              responsibility to inquire about the most recent version of the
              document.
            </p>
          </div>

          <div className="flex text-[1rem] flex-col text-left gap-y-2 leading-[26px] mt-5">
            <ol className="list-disc pl-14 flex flex-col gap-y-3">
              <li>
                Shuttlelane reserves its exclusive right to amend Passenger’s
                booking if the situation requires. If the trip cannot happen,
                Shuttlelane shall inform its Passengers.
              </li>
              <li>
                Pre-booking shall be required from all Customers wishing to
                travel with Shuttlelane. The pre-booking shall always include
                following information: Passenger’s name, Flight Number, time and
                place of pick-up and drop off, a valid telephone number of head
                Passenger.
              </li>
              <li>
                A confirmation shall be received by the Customer in a form of
                text message and email as soon as you book. If you have not
                received your email confirmation, please check SPAM in your
                email box before requesting a new confirmation
              </li>
              <li>
                The time presented on the route’s map is to inform about average
                time required to reach the destination. Please bear in mind that
                the journey can be longer due to external factors such as
                weather and traffic. All Customers are advised to wisely plan
                their journeys by adding spare time to their trips.
              </li>
              <li>
                You must allow sufficient time when booking your taxi to allow
                for the check-in times required by your airline and for any
                delays caused by traffic or weather conditions.
              </li>
              <li>
                Shuttlelane shall not be responsible for any delay caused by
                your failure to allow enough time to reach your destination or
                if the passengers are not ready.
              </li>
              <li>
                You must order a suitable car size for the number of passengers
                and luggage. Shuttlelane cannot guarantee to carry excessive
                amounts of luggage. Please note that a child, no matter what
                age, counts as one passenger.
              </li>
              <li>
                Booking fare shall be the only fare for the booked journey,
                unless the Customer makes changes in his/ her booking. There are
                no hidden or additional costs to the booking alone. Shuttlelane
                bears operational costs of all finalized journeys.
              </li>
              <li>
                Shuttlelane only offers e-payment as a payment method. This
                means that you can use all major cards to pay for your
                reservation or Bank Transfer.
              </li>
              <li>
                The charge on your Credit/Debit card statement will be shown as
                Shuttlelane Limited.
              </li>
              <li>
                Prices for Services are calculated automatically using the
                detail that you provide to us for the pick-up and destination
                addresses.
              </li>
              <li>
                Amendments to bookings should be reported to Shuttlelane
                Customer Service by phone or by email. In case of email
                amendments, the Customer shall receive response and confirmation
                emails in next 24 hours.
              </li>
              <li>
                A cancellation fee shall apply in cases of cancellation. For
                early cancellations (minimum 24 hours prior to the trip) you
                will be credited back in Full. Any cancellation made within less
                than 4 hours of the journey’s start time will not be refunded.
                If you requested your refund and your request has been accepted,
                you would receive a confirmation email that the refund has been
                made. Each refund query shall take 3 working days to be
                processed. The time when the refund shall be credited to your
                card depends on your card provider.
              </li>
              <li>
                In these terms and conditions amendment does not concern
                changing both pick up and drop off locations. If you want to
                change both pick up and drop off locations you will have to
                cancel your booking.
              </li>
              <li>
                Shuttlelane offers pre-booked taxi services and with moment of
                booking arranges the trip. Individual Customers are informed
                that after the booking has been made only basic amendments or
                cancellations are possible.
              </li>
              <li>
                Shuttlelane shall reserve its rights to reject its service to
                Passengers under influence of alcohol, drugs or who are
                offensive and violent towards their chauffeurs or Customer
                Service. Shuttlelane Customer Service will contact the Passenger
                and Customer to announce it. A simultaneous email will be send
                to the email address that was provided during the booking.
              </li>
              <li>
                Shuttlelane chauffeurs shall drive according to the speed
                requirements, safety measures and weather conditions.
              </li>
              <li>
                Shuttlelane chauffeurs shall not follow Passengers’ instructions
                regarding the speed of driving and route.
              </li>
              <li>
                Shuttlelane chauffeurs willingly offer a helpful hand to
                Passengers with heavy luggage or mobility problems. All
                Passengers willing to travel with us, and who request more help
                and attention, shall inform us about it prior to their journey.
              </li>
              <li>
                Running late? We will wait for you! Your booking includes 20
                minutes of waiting time - or 60 minutes if your pick-up point is
                at an airport. As long as we know your flight details, we will
                adjust your pick-up time to factor in any delays.
              </li>
              <li>
                Shuttlelane shall apply a non-smoking policy in all its
                vehicles.
              </li>
              <li>
                Shuttlelane shall reassure a guarantee of timely, safe and
                comfortable delivery of goods and persons.
              </li>
              <li>
                Passengers’ belongings found in vehicles shall remain in
                Shuttlelane office for 12 months. After this time, if there is
                no claim from the side of Passenger or Customer, the property
                shall be destroyed. Shuttlelane drivers are not obliged to
                deliver any found goods to their owners.
              </li>
              <li>
                Shuttlelane chauffeurs are to deliver safe and on time service
                to their Passengers. Thus, it is forbidden to misbehave towards
                them or disturb them during the journey. A legal action shall be
                taken against any action of violence or unjustified misbehaviour
                towards our drivers. In case of concerns related to our
                chauffeurs, the Passenger is obliged to inform our Customer
                Service as soon as possible.
              </li>
              <li>
                In the event that a larger vehicle is required to transport the
                excess/oversize luggage the passenger will be required to cover
                the additional cost.
              </li>
              <li>
                The company accepts no responsibility for any adverse weather
                conditions (i.e.Flooding) or traffic accidents which may
                inconvenience, delay and/or cancellation of a booking by the
                company.
              </li>
              <li>
                The Customer shall be liable for any damage caused by Passengers
                to any Passenger Vehicle.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfUsePage;
