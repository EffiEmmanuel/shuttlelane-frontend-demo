import React from "react";

const EnquiryNotificationTemplate = ({ fullName, email, message }) => {
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
        <h3
          style={{
            color: "#333",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          New Message/Enquiry
        </h3>
        <p style={{ marginBottom: "10px" }}>
          <strong>Full Name:</strong> {fullName}
        </p>
        <p style={{ marginBottom: "10px" }}>
          <strong>Email Address:</strong> {email}
        </p>
        <div style={{ marginBottom: "20px" }}>
          <strong>Message: </strong>
          <span style={{}}>{message}</span>
        </div>
        <p style={{ marginBottom: "20px" }}>
          Please take appropriate action to respond to the enquiry as soon as
          possible.
        </p>
        <p style={{ color: "#888" }}>
          Best Regards,
          <br />
          The Shuttlelane Team.
        </p>
      </div>
    </div>
  );
};

export default EnquiryNotificationTemplate;
