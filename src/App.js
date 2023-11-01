import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/company/AboutPage";
import WhoWeArePage from "./pages/company/WhoWeArePage";
import PartnershipPage from "./pages/company/PartnershipPage";
import AirportTransferPage from "./pages/services/AirportTransfer";
import CarRentalPage from "./pages/services/CarRental";
import PriorityPassPage from "./pages/services/PriorityPass";
import GetInTouchPage from "./pages/company/GetInTouchPage";
import FAQsPage from "./pages/customer-service/FAQsPage";
import TermsOfUsePage from "./pages/customer-service/TermsOfUsePage";
import PrivacyPolicyPage from "./pages/customer-service/PrivacyPolicyPage";
import VisaOnArrivalPage from "./pages/services/VisaOnArrival";
import ConciergePage from "./pages/services/ShuttlelaneConcierge";
import CorporateTravelPage from "./pages/services/CorporateTravel";
import WeddingServicesPage from "./pages/services/WeddingServices";
import DriveForShuttlelanePage from "./pages/partnership/DriveForShuttlelanePage";
import DriverSignupPage from "./pages/driver/SignupPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardHomePage from "./pages/admin/dashboard";
import AdminDashboardAddBookingPage from "./pages/admin/dashboard/bookings/AddBookingPage";
import AdminDashboardAirportTransferPage from "./pages/admin/dashboard/bookings/AirportTransferPage";
import AdminDashboardCarRentalPage from "./pages/admin/dashboard/bookings/CarRentalPage";
import AdminDashboardPriorityPassPage from "./pages/admin/dashboard/bookings/PriorityPassPage";
import AdminDashboardVisaOnArrivalPage from "./pages/admin/dashboard/bookings/VisaOnArrivalPage";
import AdminDashboardCitiesPage from "./pages/admin/dashboard/CitiesPage";
import AdminDashboardUsersPage from "./pages/admin/dashboard/users/UsersPage";
import AdminDashboardDriversPage from "./pages/admin/dashboard/users/DriversPage";
import AdminDashboardVendorsPage from "./pages/admin/dashboard/users/VendorsPage";
import AdminDashboardEnquiriesPage from "./pages/admin/dashboard/broadcasts/EnquiriesPage";
import AdminDashboardPushNotificationsPage from "./pages/admin/dashboard/broadcasts/PushNotificationsPage";
import AdminDashboardBulkEmailPage from "./pages/admin/dashboard/broadcasts/BulkEmailPage";

function App() {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<HomePage />} />

      {/* Company Routes */}
      <Route path="/company">
        <Route path="about-shuttlelane" element={<AboutPage />} />
        <Route path="who-we-are" element={<WhoWeArePage />} />
        <Route path="partnership" element={<PartnershipPage />} />
        <Route path="get-in-touch" element={<GetInTouchPage />} />
      </Route>

      {/* Services Routes */}
      <Route path="/services">
        <Route path="airport-transfer" element={<AirportTransferPage />} />
        <Route path="car-rental" element={<CarRentalPage />} />
        <Route path="priority-pass" element={<PriorityPassPage />} />
        <Route path="visa-on-arrival" element={<VisaOnArrivalPage />} />
        <Route path="shuttlelane-concierge" element={<ConciergePage />} />
        <Route path="corporate-travel" element={<CorporateTravelPage />} />
        <Route path="wedding-services" element={<WeddingServicesPage />} />
      </Route>

      {/* Customer Service Routes */}
      <Route path="/customer-service">
        <Route path="faqs" element={<FAQsPage />} />
        <Route path="terms-of-use" element={<TermsOfUsePage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      </Route>

      {/* Partnership Routes */}
      <Route path="/partnership">
        <Route
          path="drive-for-shuttlelane"
          element={<DriveForShuttlelanePage />}
        />
      </Route>

      {/* Driver Routes */}
      <Route path="/driver">
        <Route path="signup" element={<DriverSignupPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <Route path="" element={<AdminLoginPage />} />
        <Route path="dashboard">
          <Route path="" element={<AdminDashboardHomePage />} />

          {/* /admin/dashboard/bookings/* */}
          <Route path="bookings">
            <Route
              path="add-booking"
              element={<AdminDashboardAddBookingPage />}
            />
            <Route
              path="airport-transfer"
              element={<AdminDashboardAirportTransferPage />}
            />
            <Route
              path="car-rental"
              element={<AdminDashboardCarRentalPage />}
            />
            <Route
              path="priority-pass"
              element={<AdminDashboardPriorityPassPage />}
            />
            <Route
              path="visa-on-arrival"
              element={<AdminDashboardVisaOnArrivalPage />}
            />
          </Route>

          <Route path="cities" element={<AdminDashboardCitiesPage />} />

          {/* /admin/dashboard/users/* */}
          <Route path="users">
            <Route path="manage-users" element={<AdminDashboardUsersPage />} />
            <Route
              path="manage-drivers"
              element={<AdminDashboardDriversPage />}
            />
            <Route
              path="manage-vendors"
              element={<AdminDashboardVendorsPage />}
            />
          </Route>

          {/* /admin/dashboard/broadcasts/* */}
          <Route path="broadcasts">
            <Route path="enquiries" element={<AdminDashboardEnquiriesPage />} />
            <Route
              path="push-notifications"
              element={<AdminDashboardPushNotificationsPage />}
            />
            <Route
              path="bulk-email"
              element={<AdminDashboardBulkEmailPage />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
