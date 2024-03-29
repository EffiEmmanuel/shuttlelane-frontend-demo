import React, { useState } from "react";
import AdminDashboardNavbar from "../../../../../components/ui/Admin/AdminDashboardNavbar";
import AdminTopBar from "../../../../../components/ui/Admin/AdminTopBar";
import AdminPushNotificationsForm from "../../../../../forms/admin/AdminPushNotificationsForm";

function AdminDashboardPushNotificationsPage() {
  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <div className="">
      {/* Navbar here */}
      <AdminDashboardNavbar
        link="broadcasts"
        sublink="push-notifications"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="w-full">
              <AdminPushNotificationsForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPushNotificationsPage;
