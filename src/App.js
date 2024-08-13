import React, { useRef, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
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
import ConfirmBookingPage from "./pages/booking/confirm-booking";
import PaymentStatus from "./pages/booking/payment-status";
import {
  AdminProtectedRoute,
  DriverProtectedRoute,
  VendorProtectedRoute,
} from "./components/security/ProtectedRoute";
import Modal from "react-modal";
import AdminDashboardExchangeRatesPage from "./pages/admin/dashboard/rates/ExchangeRates";
import AdminDashboardBookingRatesPage from "./pages/admin/dashboard/rates/BookingRates";
import AdminDashboardBlogPage from "./pages/admin/dashboard/blog";
import DriverLoginPage from "./pages/driver/LoginPage";
import DriverDashboardHomePage from "./pages/driver/dashboard";
import DriverDashboardBookingPage from "./pages/driver/dashboard/bookings";
import DriverDashboardAccountPage from "./pages/driver/dashboard/account";
import DriverDashboardSecurityPage from "./pages/driver/dashboard/security/ResetPasswordPage";
import BlogsPage from "./pages/company/BlogsPage";
import PostPage from "./pages/company/BlogsPage/PostPage";
import TrackBookingPage from "./pages/booking/track-booking";
import AdminDashboardAdminAccountsPage from "./pages/admin/dashboard/users/AdminPage";
import AdminCompleteSignupPage from "./pages/admin/AdminCompleteSignupPage";
import AdminDashboardPaymentsPage from "./pages/admin/dashboard/bookings/Payments";
import DriverDashboardEarningsPage from "./pages/driver/dashboard/earnings";
import { useDispatch } from "react-redux";
import VendorSignupPage from "./pages/vendor/SignupPage";
import VendorLoginPage from "./pages/vendor/LoginPage";
import VendorDashboardHomePage from "./pages/vendor/dashboard";
import VendorDashboardBookingPage from "./pages/vendor/dashboard/bookings";
import VendorDashboardEarningsPage from "./pages/vendor/dashboard/earnings";
import VendorDashboardAccountPage from "./pages/vendor/dashboard/account";
import VendorDashboardSecurityPage from "./pages/vendor/dashboard/security/ResetPasswordPage";
import VendorDashboardManageDriversPage from "./pages/vendor/dashboard/bookings/ManageDrivers";
import VendorDashboardManageFleetPage from "./pages/vendor/dashboard/bookings/ManageFleet";
import PageNotFound from "./pages/404PageNotFound";
import { Helmet } from "react-helmet";
import DriverForgotPasswordPage from "./pages/driver/ForgotPasswordPage";
import VendorForgotPasswordPage from "./pages/vendor/ForgotPasswordPage";
import DriverResetAccountPasswordPage from "./pages/driver/ResetAccountPasswordPage";
import VendorResetForgotPasswordPage from "./pages/vendor/ResetForgotPasswordPage";
import Bugsnag from "@bugsnag/js";

// Modal.setAppElement("#appElement");
// Images
import shuttlelaneLogo from "./assets/logos/logo.png";

// For PayPal configuration
import { useSelector } from "react-redux";

function App() {
  const { userCurrency } = useSelector((store) => store.user);

  // Test BugSnag
  //   useEffect(() => {
  //     Bugsnag.notify(new Error("Test error"));
  //   }, []);

  return (
    <div id="appElement" className="text-shuttlelaneBlack">
      {/* PayPal configuration */}
      <Helmet>
        <script
          src={`https://www.paypal.com/sdk/js?client-id=AYKJbdgYtaLSSdr_dy_k3m19dJzhG602fsZf3FSa9zf9SmgaKMWD3co7uw1_LtYDExABxnIcTLu1uIc_&currency=${userCurrency?.alias}`}
        ></script>
      </Helmet>

      <Routes>
        {/* 404 - Page Not Found */}
        <Route path="*" element={<PageNotFound />} />

        {/* Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* Booking Page Route */}
        <Route path="booking">
          {/* Confirm Booking Route */}
          <Route path="confirm-booking" element={<ConfirmBookingPage />} />
          {/* Track Booking Route */}
          <Route path="track-booking" element={<TrackBookingPage />} />
          {/* Payment Status Route */}
          <Route path="payment-status" element={<PaymentStatus />} />
        </Route>

        {/* Company Routes */}
        <Route path="/company">
          <Route path="about-shuttlelane" element={<AboutPage />} />
          <Route path="who-we-are" element={<WhoWeArePage />} />
          <Route path="become-a-partner" element={<PartnershipPage />} />
          <Route path="partnership" element={<PartnershipPage />} />
          <Route path="get-in-touch" element={<GetInTouchPage />} />
          <Route path="blog" element={<BlogsPage />} />
          <Route path="blog/posts/:slug" element={<PostPage />} />
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
          <Route path="fleet-management" element={<VendorSignupPage />} />
        </Route>

        {/* Vendor Routes */}
        <Route path="/vendor">
          <Route path="signup" element={<VendorSignupPage />} />
          <Route path="login" element={<VendorLoginPage />} />

          {/* Auth routes */}
          <Route path="auth">
            <Route
              path="forgot-password"
              element={<VendorForgotPasswordPage />}
            />

            <Route
              path="reset-password"
              element={<VendorResetForgotPasswordPage />}
            />
          </Route>

          <Route path="dashboard">
            <Route
              path=""
              element={
                <VendorProtectedRoute>
                  <VendorDashboardHomePage />
                </VendorProtectedRoute>
              }
            />
            <Route
              path="earnings"
              element={
                <VendorProtectedRoute>
                  <VendorDashboardEarningsPage />
                </VendorProtectedRoute>
              }
            />

            {/* Dropdown menu */}
            <Route
              path="completed-bookings"
              element={
                <VendorProtectedRoute>
                  <VendorDashboardBookingPage />
                </VendorProtectedRoute>
              }
            />
            <Route
              path="manage-drivers"
              element={
                <VendorProtectedRoute>
                  <VendorDashboardManageDriversPage />
                </VendorProtectedRoute>
              }
            />
            <Route
              path="manage-fleet"
              element={
                <VendorProtectedRoute>
                  <VendorDashboardManageFleetPage />
                </VendorProtectedRoute>
              }
            />

            {/* END Dropdown menu */}

            <Route
              path="account"
              element={
                <VendorProtectedRoute>
                  <VendorDashboardAccountPage />
                </VendorProtectedRoute>
              }
            />
            <Route
              path="security"
              element={
                <VendorProtectedRoute>
                  <VendorDashboardSecurityPage />
                </VendorProtectedRoute>
              }
            />
          </Route>
        </Route>

        {/* Driver Routes */}
        <Route path="/driver">
          <Route path="signup" element={<DriverSignupPage />} />
          <Route path="login" element={<DriverLoginPage />} />

          {/* Auth routes */}
          <Route path="auth">
            <Route
              path="forgot-password"
              element={<DriverForgotPasswordPage />}
            />
            <Route
              path="reset-password"
              element={<DriverResetAccountPasswordPage />}
            />
          </Route>

          <Route path="dashboard">
            <Route
              path=""
              element={
                <DriverProtectedRoute>
                  <DriverDashboardHomePage />
                </DriverProtectedRoute>
              }
            />
            <Route
              path="earnings"
              element={
                <DriverProtectedRoute>
                  <DriverDashboardEarningsPage />
                </DriverProtectedRoute>
              }
            />
            <Route
              path="bookings"
              element={
                <DriverProtectedRoute>
                  <DriverDashboardBookingPage />
                </DriverProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <DriverProtectedRoute>
                  <DriverDashboardAccountPage />
                </DriverProtectedRoute>
              }
            />
            <Route
              path="security"
              element={
                <DriverProtectedRoute>
                  <DriverDashboardSecurityPage />
                </DriverProtectedRoute>
              }
            />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin">
          {/* Admin Auth routes */}
          <Route path="" element={<AdminLoginPage />} />
          <Route path="complete-signup" element={<AdminCompleteSignupPage />} />

          <Route path="dashboard">
            <Route
              path=""
              element={
                <AdminProtectedRoute>
                  <AdminDashboardHomePage />
                </AdminProtectedRoute>
              }
            />

            {/* /admin/dashboard/bookings/* */}
            <Route path="bookings">
              <Route
                path="payments"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardPaymentsPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="add-booking"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardAddBookingPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="airport-transfer"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardAirportTransferPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="car-rental"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardCarRentalPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="priority-pass"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardPriorityPassPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="visa-on-arrival"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardVisaOnArrivalPage />
                  </AdminProtectedRoute>
                }
              />
            </Route>

            <Route
              path="cities"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardCitiesPage />
                </AdminProtectedRoute>
              }
            />

            {/* /admin/dashboard/users/* */}
            <Route path="users">
              <Route
                path="manage-admin-accounts"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardAdminAccountsPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="manage-users"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardUsersPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="manage-drivers"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardDriversPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="manage-vendors"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardVendorsPage />
                  </AdminProtectedRoute>
                }
              />
            </Route>

            {/* /admin/dashboard/broadcasts/* */}
            <Route path="broadcasts">
              <Route
                path="enquiries"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardEnquiriesPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="push-notifications"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardPushNotificationsPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="bulk-email"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardBulkEmailPage />
                  </AdminProtectedRoute>
                }
              />
            </Route>

            {/* /admin/dashboard/rates/* */}
            <Route path="rates">
              <Route
                path="booking-rates"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardBookingRatesPage />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="exchange-rates"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardExchangeRatesPage />
                  </AdminProtectedRoute>
                }
              />
            </Route>

            {/* /admin/dashboard/blog */}
            <Route
              path="blog"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardBlogPage />
                </AdminProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
