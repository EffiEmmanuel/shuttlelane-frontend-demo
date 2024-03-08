import React from "react";

const UserBookingScheduledConfirmation = ({
  bookingReference,
  pickupLocation,
  pickupDate,
  pickupTime,
  driverName,
  driverMobile,
  carName,
  carType,
  carModel,
  carColor,
  carPlateNumber,
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
          Booking Confirmed: {bookingReference}
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>Dear User,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We're pleased to inform you that your booking has been confirmed with
          the following details:
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
            <strong>Driver Name:</strong> {driverName}
          </li>
          <li>
            <strong>Driver Contact:</strong> {driverMobile}
          </li>
          <li>
            <strong>Car Type:</strong> {carType}
          </li>
          <li>
            <strong>Car Name:</strong> {carName}
          </li>
          <li>
            <strong>Car Model:</strong> {carModel}
          </li>
          <li>
            <strong>Car Color:</strong> {carColor}
          </li>
          <li>
            <strong>Car Plate Number:</strong> {carPlateNumber}
          </li>
        </ul>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Your booking is now scheduled as per the provided details. Should you
          have any questions or require further assistance, feel free to contact
          us.
        </p>
        <p style={{ color: "#333" }}>
          Thank you for choosing ShuttleLane for your transportation needs.
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The ShuttleLane Team
        </p>
      </div>
    </div>
  );
};

export default UserBookingScheduledConfirmation;
