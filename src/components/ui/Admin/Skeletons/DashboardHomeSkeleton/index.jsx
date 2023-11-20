import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function AdminDashboardHomeSkeleton() {
  return (
    <div className="mt-24 pt-2">
      <div className="flex xl:flex-row flex-col gap-y-5 gap-x-5">
        {/* Booking Summary - Total number of bookings */}
        <div className="xl:w-[70%] w-full">
          {/* FOR LARGE SCREENS - LOADING STATE */}
          <div className="W-full h-auto hidden xl:flex lg:flex-row flex-col gap-y-3 gap-x-3 rounded-lg">
            {/* Total Card */}
            <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
              <div className="h-10 w-10 rounded-full bg-slate-400 animate-pulse shadow-md flex justify-center items-center"></div>
              <div className="flex flex-col gap-y-2">
                <p className="text-2xl h-4 w-10 font-semibold spaceGroteskText bg-slate-400 animate-pulse p-2 inline-block"></p>
                <small className="text-sm text-gray-400 bg-slate-400 animate-pulse h-4 w-24 p-2 inline-block"></small>
              </div>
            </div>
            {/* Total Card */}
            <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
              <div className="h-10 w-10 rounded-full bg-slate-400 animate-pulse shadow-md flex justify-center items-center"></div>
              <div className="flex flex-col gap-y-2">
                <p className="text-2xl h-4 w-10 font-semibold spaceGroteskText bg-slate-400 animate-pulse p-2 inline-block"></p>
                <small className="text-sm text-gray-400 bg-slate-400 animate-pulse h-4 w-24 p-2 inline-block"></small>
              </div>
            </div>
            {/* Total Card */}
            <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
              <div className="h-10 w-10 rounded-full bg-slate-400 animate-pulse shadow-md flex justify-center items-center"></div>
              <div className="flex flex-col gap-y-2">
                <p className="text-2xl h-4 w-10 font-semibold spaceGroteskText bg-slate-400 animate-pulse p-2 inline-block"></p>
                <small className="text-sm text-gray-400 bg-slate-400 animate-pulse h-4 w-24 p-2 inline-block"></small>
              </div>
            </div>
            {/* Total Card */}
            <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
              <div className="h-10 w-10 rounded-full bg-slate-400 animate-pulse shadow-md flex justify-center items-center"></div>
              <div className="flex flex-col gap-y-2">
                <p className="text-2xl h-4 w-10 font-semibold spaceGroteskText bg-slate-400 animate-pulse p-2 inline-block"></p>
                <small className="text-sm text-gray-400 bg-slate-400 animate-pulse h-4 w-24 p-2 inline-block"></small>
              </div>
            </div>
          </div>
          {/* FOR SMALLER SCREENS - LOADING STATE */}
          <div className="W-full h-auto xl:hidden flex lg:flex-row flex-col gap-y-3 gap-x-3 rounded-lg">
            <Slide
              transitionDuration={500}
              arrows={false}
              pauseOnHover={false}
              duration={4000}
              canSwipe={true}
              indicators={true}
            >
              <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                <div className="h-10 w-10 rounded-full bg-slate-400 animate-pulse shadow-md flex justify-center items-center"></div>
                <div className="flex flex-col gap-y-2 items-center">
                  <p className="text-2xl h-4 w-10 font-semibold spaceGroteskText bg-slate-400 animate-pulse p-2 inline-block"></p>
                  <small className="text-sm text-gray-400 bg-slate-400 animate-pulse h-4 w-24 p-2 inline-block"></small>
                </div>
              </div>
              <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                <div className="h-10 w-10 rounded-full bg-slate-400 animate-pulse shadow-md flex justify-center items-center"></div>
                <div className="flex flex-col gap-y-2 items-center">
                  <p className="text-2xl h-4 w-10 font-semibold spaceGroteskText bg-slate-400 animate-pulse p-2 inline-block"></p>
                  <small className="text-sm text-gray-400 bg-slate-400 animate-pulse h-4 w-24 p-2 inline-block"></small>
                </div>
              </div>
              <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                <div className="h-10 w-10 rounded-full bg-slate-400 animate-pulse shadow-md flex justify-center items-center"></div>
                <div className="flex flex-col gap-y-2 items-center">
                  <p className="text-2xl h-4 w-10 font-semibold spaceGroteskText bg-slate-400 animate-pulse p-2 inline-block"></p>
                  <small className="text-sm text-gray-400 bg-slate-400 animate-pulse h-4 w-24 p-2 inline-block"></small>
                </div>
              </div>
              <div className="flex flex-col text-center gap-y-2 lg:text-left lg:flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                <div className="h-10 w-10 rounded-full bg-slate-400 animate-pulse shadow-md flex justify-center items-center"></div>
                <div className="flex flex-col gap-y-2 items-center">
                  <p className="text-2xl h-4 w-10 font-semibold spaceGroteskText bg-slate-400 animate-pulse p-2 inline-block"></p>
                  <small className="text-sm text-gray-400 bg-slate-400 animate-pulse h-4 w-24 p-2 inline-block"></small>
                </div>
              </div>
            </Slide>
          </div>

          {/* Bar Chart */}
          <div className="mt-11 w-full">
            <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-x-2">
                  <p className="font-medium h-4 w-20 bg-slate-400 animate-pulse"></p>
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"></div>
                </div>
                {/* <p className="text-sm underline offset-7">2023</p> */}
              </div>

              {/* Area chart */}
              <div className="mt-2 text-xs">
                <div className="h-[250px] w-full bg-slate-400 animate-pulse rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Upcoming Bookings */}
          <div className="mt-11 w-full">
            <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-auto">
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-x-2">
                  <p className="font-medium h-4 w-20 bg-slate-400 animate-pulse"></p>
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"></div>
                </div>
                <p className="bg-slate-400 animate-pulse"></p>
              </div>

              <div className="overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
                {/* Table header */}
                <div className="flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                  <p className="min-w-[200px] w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                </div>

                {/* Table body - Upcoming booking card */}
                <div className="flex gap-x-2 justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>

                  <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-1">
                    <div
                      className={`h-2 w-2 bg-slate-400 animate-pulse rounded-full`}
                    ></div>
                    <p className="bg-slate-400 animate-pulse"></p>
                  </div>

                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                </div>

                {/* Table body - Upcoming booking card */}
                <div className="flex gap-x-2 justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>

                  <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-1">
                    <div
                      className={`h-2 w-2 bg-slate-400 animate-pulse rounded-full`}
                    ></div>
                    <p className="bg-slate-400 animate-pulse"></p>
                  </div>

                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                </div>

                {/* Table body - Upcoming booking card */}
                <div className="flex gap-x-2 justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>

                  <div className="min-w-[200px] w-[200px] lg:w-[20%] flex items-center gap-x-1">
                    <div
                      className={`h-2 w-2 bg-slate-400 animate-pulse rounded-full`}
                    ></div>
                    <p className="bg-slate-400 animate-pulse"></p>
                  </div>

                  <p className="min-w-[200px] h-4 w-[200px] lg:w-[20%] bg-slate-400 animate-pulse"></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton - Right Side */}
        <div className="xl:w-[30%] w-full">
          {/* Users - LOADING STATE*/}
          <div className="w-full">
            <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-[4o5px] max-h-[405px] overflow-y-scroll shuttlelaneScrollbar shuttlelaneScrollbarHoriz">
              <div className="w-full flex items-baseline justify-between">
                <div className="w-full flex items-center gap-x-2">
                  <p className="font-medium h-4 w-20 bg-slate-400 animate-pulse"></p>
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"></div>
                </div>
                <p className="bg-slate-400 animate-pulse"></p>
              </div>

              {/* Table header */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-2 inline-block"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-2 inline-block"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>
            </div>
          </div>
          {/* Drivers - LOADING STATE*/}
          <div className="w-full mt-10">
            <div className="w-full rounded-lg border-[.3px] p-3 border-gray-100 h-[436px] max-h-[436px] overflow-y-scroll shuttlelaneScrollbar shuttlelaneScrollbarHoriz">
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-x-2">
                  <p className="font-medium h-4 w-20 bg-slate-400 animate-pulse"></p>
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"></div>
                </div>
                <p className="bg-slate-400 animate-pulse"></p>
              </div>
              {/* Table header */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-2 inline-block"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-2 inline-block"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>

              {/* Table body - User card */}
              <div className="flex justify-between gap-x-2 items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
                <span className="w-[50%] text-xs bg-slate-400 animate-pulse h-4"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardHomeSkeleton;
