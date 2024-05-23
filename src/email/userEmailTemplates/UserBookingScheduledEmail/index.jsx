import React from "react";
import EmailFooter from "../../reusable/EmailFooter";
import EmailHeader from "../../reusable/EmailHeader";
import BookingDetails from "../../reusable/BookingDetails";

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
  title,
  firstName,
}) => {
  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f5f5f5",
        color: "#333333",
        margin: "0",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <img
          src="https://shuttlelane.com/static/media/logo.46684879b753af396f9a.png"
          alt="Shuttlelane Limited"
          width="150"
          height="auto"
          style={{ maxWidth: "100%" }}
        />
        <h1
          style={{
            fontWeight: "600",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          Booking Scheduled: {bookingReference}
        </h1>
        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          Dear {title} {firstName},
        </p>
        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          We're pleased to inform you that your booking has been scheduled.
        </p>

        <BookingDetails
          details={{
            "Booking Reference": bookingReference,
            "Pickup Location": pickupLocation,
            "Pickup Date": pickupDate,
            "Pickup Time": pickupTime,
            "Driver's Name": driverName,
            "Driver's Phone Number": driverMobile,
            "Car Type": carType,
            "Car Name": carName,
            "Car Model": carModel,
            "Car Color": carColor,
            "Plate Number": carPlateNumber,
          }}
          endNote=""
        />

        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          Your booking is now scheduled as per the provided details. Should you
          have any questions or require further assistance, feel free to contact
          us.
        </p>
        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          Best regards,
          <br />
          The Shuttlelane Team.
        </p>
      </div>

      <EmailFooter />
    </div>
  );
};

export default UserBookingScheduledConfirmation;
