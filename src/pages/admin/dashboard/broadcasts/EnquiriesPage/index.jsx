import React from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaUser } from "react-icons/fa";
import { MdDelete, MdLuggage, MdOutlineFlightTakeoff } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import AdminDashboardNavbar from "../../../../../components/ui/Admin/AdminDashboardNavbar";
import {
  HiOutlineExternalLink,
  HiOutlineMail,
  HiOutlineMailOpen,
} from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiSearch } from "react-icons/bi";
import AdminTopBar from "../../../../../components/ui/Admin/AdminTopBar";
import AdminAddBookingForm from "../../../../../forms/admin/AdminAddBookingForm";

function AdminDashboardEnquiriesPage() {
  return (
    <div className="">
      {/* Navbar here */}
      <AdminDashboardNavbar link="broadcasts" sublink="enquiries" />

      {/* Main content goes here */}
      <div className="w-full min-h-screen pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="w-full">
              <h2 className="font-semibold text-xl text-shuttlelaneBlack">
                Enquiries
              </h2>
              <p className="text-sm">
                Messages sent directly from Shuttlelane's <b>Get in touch</b>{" "}
                page
              </p>

              <div className="mt-10 w-full border-[.3px] border-gray-200 rounded-lg p-3 flex flex-col gap-y-5">
                <div className="flex cursor-pointer w-full items-center justify-between border-b-gray-200 border-b-[.3px] pb-2">
                  <div className="flex items-center gap-x-2">
                    <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                    <div className={`flex flex-col gap-y-1 font-semibold`}>
                      <span className="text-sm text-shuttlelaneBlack">
                        Test Enquiry
                      </span>
                      <span className="text-xs text-gray-400 w-64 max-w-sm truncate ... overflow-hidden">
                        This is a test message and just a placeholder for the
                        real thing
                      </span>
                    </div>
                  </div>

                  <div className="flex lg:items-center gap-x-2 lg:flex-row flex-col gap-y-1 items-end">
                    <div className="flex flex-col gap-y-1 text-right lg:border-r-[.2px] lg:border-r-gray-200 lg:pr-2">
                      <span className="text-xs text-gray-400">1 Nov, 2023</span>
                      <span className="text-xs text-gray-400">06:30AM</span>
                    </div>

                    <div className="flex items-center gap-x-1">
                      <HiOutlineMail size={20} className="text-gray-400" />
                      {/* <HiOutlineMailOpen size={20} className="text-gray-400" /> */}
                      <MdDelete size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex cursor-pointer w-full items-center justify-between border-b-gray-200 border-b-[.3px] pb-2">
                  <div className="flex items-center gap-x-2">
                    <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                    <div className={`flex flex-col gap-y-1 font-semibold`}>
                      <span className="text-sm text-shuttlelaneBlack">
                        Test Enquiry
                      </span>
                      <span className="text-xs text-gray-400 w-64 max-w-sm truncate ... overflow-hidden">
                        This is a test message and just a placeholder for the
                        real thing
                      </span>
                    </div>
                  </div>

                  <div className="flex lg:items-center gap-x-2 lg:flex-row flex-col gap-y-1 items-end">
                    <div className="flex flex-col gap-y-1 text-right lg:border-r-[.2px] lg:border-r-gray-200 lg:pr-2">
                      <span className="text-xs text-gray-400">1 Nov, 2023</span>
                      <span className="text-xs text-gray-400">06:30AM</span>
                    </div>

                    <div className="flex items-center gap-x-1">
                      <HiOutlineMail size={20} className="text-gray-400" />
                      {/* <HiOutlineMailOpen size={20} className="text-gray-400" /> */}
                      <MdDelete size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex cursor-pointer w-full items-center justify-between border-b-gray-200 border-b-[.3px] pb-2">
                  <div className="flex items-center gap-x-2 pl-4">
                    {/* <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div> */}
                    <div className={`flex flex-col gap-y-1`}>
                      <span className="text-sm text-shuttlelaneBlack">
                        Test Enquiry
                      </span>
                      <span className="text-xs text-gray-400 w-64 max-w-sm truncate ... overflow-hidden">
                        This is a test message and just a placeholder for the
                        real thing
                      </span>
                    </div>
                  </div>

                  <div className="flex lg:items-center gap-x-2 lg:flex-row flex-col gap-y-1 items-end">
                    <div className="flex flex-col gap-y-1 text-right lg:border-r-[.2px] lg:border-r-gray-200 lg:pr-2">
                      <span className="text-xs text-gray-400">1 Nov, 2023</span>
                      <span className="text-xs text-gray-400">06:30AM</span>
                    </div>

                    <div className="flex items-center gap-x-1">
                      <HiOutlineMail size={20} className="text-gray-400" />
                      {/* <HiOutlineMailOpen size={20} className="text-gray-400" /> */}
                      <MdDelete size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex cursor-pointer w-full items-center justify-between border-b-gray-200 border-b-[.3px] pb-2">
                  <div className="flex items-center gap-x-2 pl-4">
                    {/* <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div> */}
                    <div className={`flex flex-col gap-y-1`}>
                      <span className="text-sm text-shuttlelaneBlack">
                        Test Enquiry
                      </span>
                      <span className="text-xs text-gray-400 w-64 max-w-sm truncate ... overflow-hidden">
                        This is a test message and just a placeholder for the
                        real thing
                      </span>
                    </div>
                  </div>

                  <div className="flex lg:items-center gap-x-2 lg:flex-row flex-col gap-y-1 items-end">
                    <div className="flex flex-col gap-y-1 text-right lg:border-r-[.2px] lg:border-r-gray-200 lg:pr-2">
                      <span className="text-xs text-gray-400">1 Nov, 2023</span>
                      <span className="text-xs text-gray-400">06:30AM</span>
                    </div>

                    <div className="flex items-center gap-x-1">
                      <HiOutlineMail size={20} className="text-gray-400" />
                      {/* <HiOutlineMailOpen size={20} className="text-gray-400" /> */}
                      <MdDelete size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardEnquiriesPage;
