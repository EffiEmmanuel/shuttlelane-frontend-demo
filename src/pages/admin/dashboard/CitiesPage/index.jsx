import React from "react";
import { Link } from "react-router-dom";
import { FaPassport, FaUser } from "react-icons/fa";
import { MdLuggage, MdOutlineFlightTakeoff } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import AdminDashboardNavbar from "../../../../components/ui/Admin/AdminDashboardNavbar";
import { HiOutlineExternalLink } from "react-icons/hi";
import Chart from "react-apexcharts";
import { BiSearch } from "react-icons/bi";
import AdminTopBar from "../../../../components/ui/Admin/AdminTopBar";
import AdminAddBookingForm from "../../../../forms/admin/AdminAddBookingForm";
import AdminCitiesForm from "../../../../forms/admin/AdminCitiesForm";

function AdminDashboardCitiesPage() {
  return (
    <div className="">
      {/* Navbar here */}
      <AdminDashboardNavbar link="cities" />

      {/* Main content goes here */}
      <div className="w-full min-h-screen pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="w-full">
              <AdminCitiesForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardCitiesPage;
