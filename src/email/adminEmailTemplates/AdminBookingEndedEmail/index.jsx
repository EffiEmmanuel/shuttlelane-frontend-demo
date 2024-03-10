import React from "react";

const AdminBookingEndedEmailTemplate = ({ bookingReference }) => {
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
          Trip Ended: {bookingReference}
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>Dear Admin,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We would like to inform you that the trip for booking{" "}
          {bookingReference} has been marked as completed.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Please review the trip details and ensure all necessary follow-up
          actions are taken.
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The ShuttleLane Team
        </p>
      </div>
    </div>
  );
};

export default AdminBookingEndedEmailTemplate;
