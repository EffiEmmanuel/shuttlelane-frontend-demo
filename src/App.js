import React from "react";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/company">
        <Route path="about-shuttlelane" element={<AboutPage />} />
        <Route path="who-we-are" element={<WhoWeArePage />} />
        <Route path="partnership" element={<PartnershipPage />} />
        <Route path="get-in-touch" element={<GetInTouchPage />} />
      </Route>

      <Route path="/services">
        <Route path="airport-transfer" element={<AirportTransferPage />} />
        <Route path="car-rental" element={<CarRentalPage />} />
        <Route path="priority-pass" element={<PriorityPassPage />} />
      </Route>

      <Route path="/customer-service">
        <Route path="faqs" element={<FAQsPage />} />
        <Route path="terms-of-use" element={<TermsOfUsePage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
