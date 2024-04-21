import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FiThumbsUp } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { TbTie } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function InfoSlide() {
  return (
    <>
      <div className="bg-shuttlelanePurple p-7 w-full hidden lg:flex justify-between">
        <div className="w-[33.3%] flex items-center gap-x-2">
          <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
            <FiThumbsUp size={20} />
          </div>

          <div className="fle flex-col gap-y-1 text-white">
            <p className="font-semibold">Travellers rate us excellent</p>
            <small className="text-xs">
              4.9 / 5 average{" "}
              <Link
                to="https://www.google.com/search?q=shuttlelane+limited&sca_esv=635483f0705dd420&ei=3OQUZqFe2beFsg-vojc&udm=&oq=shuttlelane+lim&gs_lp=Egxnd3Mtd2l6LXNlcnAiD3NodXR0bGVsYW5lIGxpbSoCCAAyBRAhGKABMgUQIRigATIFECEYoAEyBRAhGKABSOFiUABY405wBHgAkAEAmAH0AaAB6RyqAQYwLjEyLje4AQHIAQD4AQGYAhegArQdwgIIEAAYgAQYsQPCAgsQABiABBixAxiDAcICBBAAGAPCAgUQABiABMICChAAGIAEGIoFGEPCAgcQABiABBgTwgIJEAAYgAQYExgKwgIIEAAYHhgTGArCAgYQABgeGBPCAgoQABgWGB4YExgKmAMAkgcGNC4xMC45oAfISA&sclient=gws-wiz-serp#lrd=0x103b8c448e2f97c3:0xc95f24c00955aecc,1"
                className="text-white text-xs underline visited:text-white"
              >
                50 reviews
              </Link>
            </small>
          </div>
        </div>
        <div className="w-[33.3%] flex items-center gap-x-2">
          <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
            <TbTie size={20} />
          </div>

          <div className="flex flex-col gap-y-1 text-white">
            <p className="font-semibold">Best drivers in Lagos</p>
            <small className="text-xs inline-block">
              We handpick the friendliest, professional, english-speaking
              drivers
            </small>
          </div>
        </div>
        <div className="w-[33.3%] flex items-center gap-x-2">
          <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
            <IoMdTime size={20} />
          </div>

          <div className="fle flex-col gap-y-1 text-white">
            <p className="font-semibold">Always on time</p>
            <small className="text-xs">
              Our drivers monitor the flights in case of delays
            </small>
          </div>
        </div>
      </div>
      <div className="bg-shuttlelanePurple p-7 w-full h-auto lg:hidden">
        <Slide
          transitionDuration={500}
          arrows={false}
          pauseOnHover={false}
          duration={4000}
          canSwipe={true}
          indicators={true}
        >
          <div className="w-full flex items-center gap-x-2">
            <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
              <FiThumbsUp size={20} />
            </div>

            <div className="fle flex-col gap-y-1 text-white">
              <p className="font-semibold">Travellers rate us excellent</p>
              <small className="text-xs">
                4.9 / 5 average{" "}
                <Link
                  to="https://www.google.com/search?q=shuttlelane+limited&sca_esv=635483f0705dd420&ei=3OQUZqFe2beFsg-vojc&udm=&oq=shuttlelane+lim&gs_lp=Egxnd3Mtd2l6LXNlcnAiD3NodXR0bGVsYW5lIGxpbSoCCAAyBRAhGKABMgUQIRigATIFECEYoAEyBRAhGKABSOFiUABY405wBHgAkAEAmAH0AaAB6RyqAQYwLjEyLje4AQHIAQD4AQGYAhegArQdwgIIEAAYgAQYsQPCAgsQABiABBixAxiDAcICBBAAGAPCAgUQABiABMICChAAGIAEGIoFGEPCAgcQABiABBgTwgIJEAAYgAQYExgKwgIIEAAYHhgTGArCAgYQABgeGBPCAgoQABgWGB4YExgKmAMAkgcGNC4xMC45oAfISA&sclient=gws-wiz-serp#lrd=0x103b8c448e2f97c3:0xc95f24c00955aecc,1"
                  className="text-white text-xs underline visited:text-white"
                >
                  50 reviews
                </Link>
              </small>
            </div>
          </div>
          <div className="w-full flex items-center gap-x-2">
            <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
              <TbTie size={20} />
            </div>

            <div className="flex flex-col gap-y-1 text-white">
              <p className="font-semibold">Best drivers in Lagos</p>
              <small className="text-xs inline-block">
                We handpick the friendliest, professional, english-speaking
                drivers
              </small>
            </div>
          </div>
          <div className="w-full flex items-center gap-x-2">
            <div className="h-[45px] w-[45px] min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] bg-white rounded-full flex items-center justify-center">
              <IoMdTime size={20} />
            </div>

            <div className="fle flex-col gap-y-1 text-white">
              <p className="font-semibold">Always on time</p>
              <small className="text-xs">
                Our drivers monitor the flights in case of delays
              </small>
            </div>
          </div>
        </Slide>
      </div>
    </>
  );
}
