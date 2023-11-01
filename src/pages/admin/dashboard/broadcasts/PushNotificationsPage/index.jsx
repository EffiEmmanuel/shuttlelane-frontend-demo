import React from "react";
import AdminDashboardNavbar from "../../../../../components/ui/Admin/AdminDashboardNavbar";
import AdminTopBar from "../../../../../components/ui/Admin/AdminTopBar";
import AdminPushNotificationsForm from "../../../../../forms/admin/AdminPushNotificationsForm";

function AdminDashboardPushNotificationsPage() {
  return (
    <div className="">
      {/* Navbar here */}
      <AdminDashboardNavbar link="broadcasts" sublink="push-notifications" />

      {/* Main content goes here */}
      <div className="w-full min-h-screen pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <AdminTopBar />

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
