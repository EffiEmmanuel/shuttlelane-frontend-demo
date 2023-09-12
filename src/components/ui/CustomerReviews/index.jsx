import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function CustomerReviews() {
  return (
    <div className="bg-white px-12 py-10 rounded-lg">
      <div className="w-full relative">
        <Slide
          transitionDuration={500}
          arrows={false}
          pauseOnHover={true}
          duration={4000}
          canSwipe={true}
          indicators
        >
          <div className="lg:max-w-[400px] text-shuttlelaneBlack flex flex-col gap-y-3">
            <p className="text-sm">
              This chauffeur service is deserving of five stars. The staff is so
              attentive and caring towards customers. The attended to me well
              and listened to my needs. The manager saw to it that my visit to
              Lagos was very comfortable. Their service is beyond chauffeuring
              alone. The manager got me a SIM card to make sure I wasn’t
              stranded. He tracked my flight online so that even when my flight
              was delayed, the taxi was still available waiting for me. I can’t
              thank you enough for making my life easier. You deserve more than
              five stars.
            </p>

            <div className="">
              <h4 className="font-semibold text-shuttlelanePurple text-lg">
                Ms ifunanya
              </h4>
              <h4 className="text-shuttlelaneBlack text-sm italic">
                Lagos, Nigeria
              </h4>
            </div>
          </div>

          <div className="lg:max-w-[400px] text-shuttlelaneBlack flex flex-col gap-y-3">
            <p className="text-sm">
              I haven't been to Lagos for years and was really skeptical of my
              next decision. Before now, I have tried all kinds of travel agents
              and companies until a friend told me about @shuttlelane He spoke
              highly of them so I gave it a try. I must confess to you all that
              @shuttlelane is the right link to Africa 🌍 A smooth drive from
              the airport to the hotel, tour guide to the beautiful locations,
              car services and great services. I had so much fun on trips. The
              only thing that was missing on this trip, was to stay for a few
              more days
            </p>

            <div className="">
              <h4 className="font-semibold text-shuttlelanePurple text-lg">
                C.L.A.P
              </h4>
              <h4 className="text-shuttlelaneBlack text-sm italic">
                Lagos, Nigeria
              </h4>
            </div>
          </div>
        </Slide>
        <p className="text-[23rem] hidden lg:inline-block text-shuttlelaneBlack absolute top-0 right-10 font-bold opacity-50">
          "
        </p>
      </div>
    </div>
  );
}

export default CustomerReviews;
