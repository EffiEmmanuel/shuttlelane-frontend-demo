import React from "react";

const AdminBookingCreatedEmailTemplate = ({
  bookingReference,
  firstName,
  lastName,
  mobile,
  email,
}) => {
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
          🔔 New Booking Alert
        </h1>
        <p style={{ color: "#333", marginBottom: "10px" }}>Dear admin,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          A user has just made a booking with the following details:
        </p>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Booking Reference Number: <strong>{bookingReference}</strong>
        </p>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Full Name:{" "}
          <strong>
            {firstName} {lastName}
          </strong>
        </p>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Phone Number: <strong>{mobile}</strong>
        </p>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Email Address: <strong>{email}</strong>
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Please ensure to reach out to them as soon as possible and assign a
          partner to this booking if necessary.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          You can also track this booking via{" "}
          <a
            style={{
              color: "#333",
              textDecoration: "underline",
            }}
            href={`https://www.shuttlelane.com/track-booking?bookingReference=${bookingReference}`}
          >
            this link on the website.
          </a>
          .
        </p>

        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The Shuttlelane Booking Team.
        </p>
      </div>
    </div>
  );
};

export default AdminBookingCreatedEmailTemplate;
