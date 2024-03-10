import React from "react";

const UserBookingCompletedEmailTemplate = ({ bookingReference, firstName }) => {
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
          Trip Completed: {bookingReference}
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>Dear {firstName},</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We're pleased to inform you that your trip for booking{" "}
          {bookingReference} has been marked as completed.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We hope you had a pleasant experience with ShuttleLane. Your feedback
          is valuable to us.
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The ShuttleLane Team
        </p>
      </div>
    </div>
  );
};

export default UserBookingCompletedEmailTemplate;
