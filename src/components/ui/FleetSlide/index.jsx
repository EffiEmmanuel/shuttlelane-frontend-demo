import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// Images
import economy from "../../../assets/images/cars/economy.png";
import business from "../../../assets/images/cars/business.png";
import executive from "../../../assets/images/cars/executive.png";
import luxury from "../../../assets/images/cars/luxury.png";
import shuttle from "../../../assets/images/cars/shuttle.png";
import shuttleExtra from "../../../assets/images/cars/shuttleExtra.png";
import { MdOutlineLuggage, MdPersonOutline } from "react-icons/md";
import { LuLuggage } from "react-icons/lu";

function FleetSlide() {
  return (
    <div className="overflow-x-hidden">
      <div className="">
        <Slide
          transitionDuration={500}
          arrows={false}
          pauseOnHover={false}
          duration={4000}
          canSwipe={true}
          indicators={true}
        >
          <div className="flex items-center justify-center text-center flex-col-reverse gap-y-7">
            <div className="lg:max-w-[40%] flex flex-col gap-y-3">
              <h4 className="font-bold text-shuttlelanePurple text-2xl">
                Economy
              </h4>

              <p className="text-sm">
                The most economic and popular class suitable for most trips.
                Promises a smooth and convenient ride. Can accommodate up to 4
                passengers and 2 luggages. Select from our available services
                and make a booking by specifying your travel date, pickup
                location, destination, and other required information.
              </p>

              <div className="flex justify-center lg:justify-center">
                <div className="flex item-center gap-x-3 border-dashed border-[0.5px] border-shuttlelaneBlack w-[100px] justify-center p-1 rounded-full">
                  <div className="flex item-center gap-x-1">
                    <LuLuggage size={20} className="text-shuttlelaneBlack" />
                    <p className="text-sm">2</p>
                  </div>
                  <div className="flex item-center gap-x-1">
                    <MdPersonOutline
                      size={20}
                      className="text-shuttlelaneBlack"
                    />
                    <p className="text-sm">4</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <img src={economy} alt="" className="object-contain w-full" />
            </div>
          </div>

          <div className="flex items-center text-center justify-center flex-col-reverse gap-y-7">
            <div className="lg:max-w-[40%] flex flex-col gap-y-3">
              <h4 className="font-bold text-shuttlelanePurple text-2xl">
                Business
              </h4>

              <p className="text-sm">
                Can accommodate up to 4 passengers and comes with extra space
                for luggages. It also promises a smooth and convenient ride.
              </p>

              <div className="flex justify-center lg:justify-center">
                <div className="flex item-center gap-x-3 border-dashed border-[0.5px] border-shuttlelaneBlack w-[100px] justify-center p-1 rounded-full">
                  <div className="flex item-center gap-x-1">
                    <LuLuggage size={20} className="text-shuttlelaneBlack" />
                    <p className="text-sm">3</p>
                  </div>
                  <div className="flex item-center gap-x-1">
                    <MdPersonOutline
                      size={20}
                      className="text-shuttlelaneBlack"
                    />
                    <p className="text-sm">4</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <img src={business} alt="" className="object-contain w-full" />
            </div>
          </div>

          <div className="flex text-center items-center justify-center flex-col-reverse gap-y-7">
            <div className="lg:max-w-[40%] flex flex-col gap-y-3">
              <h4 className="font-bold text-shuttlelanePurple text-2xl">
                Executive
              </h4>

              <p className="text-sm">
                A step closer to luxury. Comfort and convenience is guaranteed.
                Can accommodate up to 4 passengers and 2 luggages.
              </p>

              <div className="flex justify-center lg:justify-center">
                <div className="flex item-center gap-x-3 border-dashed border-[0.5px] border-shuttlelaneBlack w-[100px] justify-center p-1 rounded-full">
                  <div className="flex item-center gap-x-1">
                    <LuLuggage size={20} className="text-shuttlelaneBlack" />
                    <p className="text-sm">2</p>
                  </div>
                  <div className="flex item-center gap-x-1">
                    <MdPersonOutline
                      size={20}
                      className="text-shuttlelaneBlack"
                    />
                    <p className="text-sm">4</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <img src={executive} alt="" className="object-contain w-full" />
            </div>
          </div>

          <div className="flex text-center items-center justify-center flex-col-reverse gap-y-7">
            <div className="lg:max-w-[40%] flex flex-col gap-y-3">
              <h4 className="font-bold text-shuttlelanePurple text-2xl">
                Luxury
              </h4>

              <p className="text-sm">
                The most prestigious vehicles in our fleet. It is for those who
                love luxury and comfort. Takes you on your trip in elegance and
                style.
              </p>

              <div className="flex justify-center lg:justify-center">
                <div className="flex item-center gap-x-3 border-dashed border-[0.5px] border-shuttlelaneBlack w-[100px] justify-center p-1 rounded-full">
                  <div className="flex item-center gap-x-1">
                    <LuLuggage size={20} className="text-shuttlelaneBlack" />
                    <p className="text-sm">3</p>
                  </div>
                  <div className="flex item-center gap-x-1">
                    <MdPersonOutline
                      size={20}
                      className="text-shuttlelaneBlack"
                    />
                    <p className="text-sm">4</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <img src={luxury} alt="" className="object-contain w-full" />
            </div>
          </div>

          <div className="flex text-center items-center justify-center flex-col-reverse gap-y-7">
            <div className="lg:max-w-[40%] flex flex-col gap-y-3">
              <h4 className="font-bold text-shuttlelanePurple text-2xl">
                Shuttle
              </h4>

              <p className="text-sm">
                One of the most spacious vehicles in our fleet. It is for those
                who love to travel in numbers and comfort. Can accommodate up to
                10 passengers and 6 luggages. It also promises a smooth and
                convenient ride.
              </p>

              <div className="flex justify-center lg:justify-center">
                <div className="flex item-center gap-x-3 border-dashed border-[0.5px] border-shuttlelaneBlack w-[100px] justify-center p-1 rounded-full">
                  <div className="flex item-center gap-x-1">
                    <LuLuggage size={20} className="text-shuttlelaneBlack" />
                    <p className="text-sm">6</p>
                  </div>
                  <div className="flex item-center gap-x-1">
                    <MdPersonOutline
                      size={20}
                      className="text-shuttlelaneBlack"
                    />
                    <p className="text-sm">10</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <img src={shuttle} alt="" className="object-contain w-full" />
            </div>
          </div>

          <div className="flex text-center items-center justify-center flex-col-reverse gap-y-7">
            <div className="lg:max-w-[40%] flex flex-col gap-y-3">
              <h4 className="font-bold text-shuttlelanePurple text-2xl">
                Shuttle Extra
              </h4>

              <p className="text-sm">
                The most spacious vehicles in our fleet. It is for those who
                love to travel in numbers and comfort. Can accommodate up to 10
                passengers and 7 luggages. It also promises a smooth and
                convenient ride.
              </p>

              <div className="flex justify-center lg:justify-center">
                <div className="flex item-center gap-x-3 border-dashed border-[0.5px] border-shuttlelaneBlack w-[100px] justify-center p-1 rounded-full">
                  <div className="flex item-center gap-x-1">
                    <LuLuggage size={20} className="text-shuttlelaneBlack" />
                    <p className="text-sm">7</p>
                  </div>
                  <div className="flex item-center gap-x-1">
                    <MdPersonOutline
                      size={20}
                      className="text-shuttlelaneBlack"
                    />
                    <p className="text-sm">10</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <img
                src={shuttleExtra}
                alt=""
                className="object-contain w-full"
              />
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
}

export default FleetSlide;
