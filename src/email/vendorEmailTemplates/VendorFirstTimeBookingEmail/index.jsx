import React from "react";
import EmailFooter from "../../reusable/EmailFooter";

const VendorFirstTimeBookingEmailTemplate = ({ companyName }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >
          Congratulations on accepting your first booking, {companyName}!
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We're excited to have you on board as a vendor. To ensure a safe and
          enjoyable experience for both you and our passengers, please review
          the following guidelines:
        </p>
        <ul style={{ color: "#333", marginBottom: "20px" }}>
          <li>Be punctual for pickups and drop-offs.</li>
          <li>Drive safely and adhere to traffic laws.</li>
          <li>Communicate effectively with passengers.</li>
          <li>Maintain a clean and comfortable vehicle.</li>
        </ul>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Thank you for your dedication to providing exceptional service. We
          look forward to working with you!
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The ShuttleLane Team
        </p>
      </div>

      <EmailFooter />
    </div>
  );
};

export default VendorFirstTimeBookingEmailTemplate;
