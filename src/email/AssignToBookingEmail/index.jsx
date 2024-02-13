import React from "react";
import Header from "../reusable/Header";
import BookingDetails from "../reusable/BookingDetails";

// Main EmailTemplate component
const AssignToBookingEmailTemplate = ({ booking, driverId }) => {
  return (
    <div
      className="container"
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f7f7f7",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Header title="New Booking Assignment" />
      <BookingDetails
        details={booking}
        endNote="We are pleased to inform you that you have been assigned to this new
        booking. Please arrive on time and ensure a smooth transfer for our
        valued customer."
      />

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#777",
        }}
        className="footer"
      >
        <a
          href={`http://localhost:3000/driver/accept-booking?driverId=${driverId}`}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            margin: "0 10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
            backgroundColor: "#28a745",
            color: "#fff",
            textDecoration: "none",
          }}
          className="action-button accept-button"
        >
          Accept
        </a>
        <a
          href={`http://localhost:3000/driver/accept-booking?driverId=${driverId}`}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            margin: "0 10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
            backgroundColor: "#dc3545",
            color: "#fff",
            textDecoration: "none",
          }}
          className="action-button decline-button"
        >
          Decline
        </a>
        <p style={{ textAlign: "center", color: "#333" }}>
          Thank you for your service
        </p>
      </div>
    </div>
  );
};

export default AssignToBookingEmailTemplate;
