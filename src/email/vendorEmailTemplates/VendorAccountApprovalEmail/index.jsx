import React from "react";
import EmailFooter from "../../reusable/EmailFooter";

const VendorAccountApprovalEmail = ({ vendor }) => {
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
          Your Vendor Account has been Approved!
        </h1>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Dear {vendor?.companyName},
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We are excited to inform you that your vendor account has been
          approved!
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          You can now start receiving job requests and access your dashboard to
          manage your profile and view upcoming assignments.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          If you have any questions or need assistance, please don't hesitate to
          contact us.
        </p>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Thank you for joining our team!
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

export default VendorAccountApprovalEmail;
