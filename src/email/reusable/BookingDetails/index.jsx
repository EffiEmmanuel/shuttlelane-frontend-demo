import React from "react";

// BookingDetails component
const BookingDetails = ({ details, endNote }) => {
  return (
    <div
      className="booking-details"
      style={{
        backgroundColor: " #fff",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <h2
        style={{
          color: "#333",
          marginBottom: "10px",
        }}
      >
        Booking Details
      </h2>
      <div
        className="booking-info"
        style={{
          marginBottom: "10px",
        }}
      >
        {Object.entries(details).map(([key, value]) => (
          <p
            key={key}
            style={{
              margin: "5px 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{key}:</span> {value}
          </p>
        ))}
      </div>
      <p>{endNote}</p>
    </div>
  );
};

export default BookingDetails;
