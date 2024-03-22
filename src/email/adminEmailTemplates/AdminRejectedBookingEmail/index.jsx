import React from "react";

const AdminRejectedBookingEmailTemplate = ({
  bookingReference,
  pickupDate,
  pickupTime,
  pickupLocation,
  passengerName,
  passengerMobile,
  driverName,
  vendorName,
  isVendor,
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
          Rejected Booking: {bookingReference}
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>Dear Admin,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We regret to inform you that the booking with the following details
          has been rejected by {isVendor ? vendorName : driverName} and needs to
          be reassigned to another driver or vendor:
        </p>
        <ul style={{ color: "#333", marginBottom: "20px" }}>
          <li>
            <strong>Booking ID:</strong> {bookingReference}
          </li>
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
          Please reassign this booking to another available driver as soon as
          possible.
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The ShuttleLane Team
        </p>
      </div>
    </div>
  );
};

export default AdminRejectedBookingEmailTemplate;
