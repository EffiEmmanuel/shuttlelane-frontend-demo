import React from "react";

const BookingSuccessfulEmail = ({ bookingReference }) => {
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
          Booking Successfully Created
        </h1>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Dear valued customer,
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Your booking has been successfully created with the following details:
        </p>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Booking Reference Number: <strong>{bookingReference}</strong>
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Please ensure to complete your payment in order to validate your
          booking.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          You can also track your booking via{" "}
          <a
            style={{
              color: "#333",
              textDecoration: "underline",
            }}
            href={`https://localhost:3000/track-booking?bookingReference=${bookingReference}`}
          >
            this link on our website
          </a>
          .
        </p>
        <a
          href="PAYMENT_URL_HERE"
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Make Payment
        </a>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Thank you for choosing our service!
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The Shuttlelane Booking Team.
        </p>
      </div>
    </div>
  );
};

export default BookingSuccessfulEmail;
