import React from "react";

const AdminAcceptedBookingEmailTemplate = ({
  bookingReference,
  pickupDate,
  pickupTime,
  pickupLocation,
  driverName,
  driverMobile,
  passengerName,
  passengerMobile,
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
          Driver Confirmation: {bookingReference}
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>Dear Admin,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We would like to inform you that the driver has accepted the booking
          with the following details:
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
          <li>
            <strong>Driver Name:</strong> {driverName}
          </li>
          <li>
            <strong>Driver Contact:</strong> {driverMobile}
          </li>
        </ul>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Please ensure that all necessary arrangements are made for the
          scheduled booking.
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The ShuttleLane Team
        </p>
      </div>
    </div>
  );
};

export default AdminAcceptedBookingEmailTemplate;
