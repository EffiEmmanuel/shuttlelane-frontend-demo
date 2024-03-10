import React from "react";

const UserDriverStartedBookingEmailTemplate = ({
  bookingReference,
  firstName,
  driverName,
  driverContact,
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
          Driver Started Your Trip: {bookingReference}
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>Dear {firstName},</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We're excited to inform you that your driver, {driverName}, has
          started your trip. You can contact your driver at {driverContact} if
          needed.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Your safety and comfort are our top priorities. Enjoy your trip with
          ShuttleLane!
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The ShuttleLane Team
        </p>
      </div>
    </div>
  );
};

export default UserDriverStartedBookingEmailTemplate;
