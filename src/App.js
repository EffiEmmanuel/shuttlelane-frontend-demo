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
    </Routes>
  );
}

export default App;
