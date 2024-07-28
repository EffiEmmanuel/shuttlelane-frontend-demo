import React from "react";
import EmailFooter from "../EmailFooter";

const ResetPasswordSuccessEmailTemplate = ({ emailAddress }) => {
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
          Password Reset Successful
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The password for your account ({emailAddress}), has been reset
          successfully.
        </p>

        <p style={{ color: "#333", marginBottom: "20px" }}>
          Kindly report to info@shuttlelane.com immediately, if this action was
          not initiated by you.
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

export default ResetPasswordSuccessEmailTemplate;
