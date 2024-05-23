import React from "react";
import EmailFooter from "../../reusable/EmailFooter";

const DriverApplicationRejectedEmail = ({ driver }) => {
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
          Your Driver Application has been Rejected
        </h1>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Dear {driver?.firstName},
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We regret to inform you that your application to become a driver has
          been rejected.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Please contact our support team for further information regarding the
          rejection.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          If you have any questions or need assistance, please don't hesitate to
          reach out to us.
        </p>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Thank you for considering us!
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The Shuttlelane Team
        </p>
      </div>

      <EmailFooter />
    </div>
  );
};

export default DriverApplicationRejectedEmail;
