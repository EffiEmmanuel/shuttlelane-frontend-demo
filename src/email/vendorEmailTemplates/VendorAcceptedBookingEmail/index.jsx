import React from "react";
import EmailFooter from "../../reusable/EmailFooter";

const VendorAcceptedBookingEmailTemplate = ({
  pickupLocation,
  passengerName,
  passengerMobile,
  pickupDate,
  pickupTime,
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
          Booking Confirmation
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>Dear Vendor,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          This is to confirm that you have accepted the booking with the
          following details:
        </p>
        <ul style={{ color: "#333", marginBottom: "20px" }}>
          <li>
            <strong>Pickup Location:</strong> {pickupLocation}
          </li>
          <li>
            <strong>Pickup Date:</strong> {pickupDate}
          </li>
          <li>
            <strong>Pickup Time:</strong> {pickupTime}
          </li>
          <li>
            <strong>Passenger Name:</strong> {passengerName}
          </li>
          <li>
            <strong>Passenger Contact:</strong> {passengerMobile}
          </li>
        </ul>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Thank you for your confirmation. The booking is now scheduled as per
          the provided details.
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

export default VendorAcceptedBookingEmailTemplate;
