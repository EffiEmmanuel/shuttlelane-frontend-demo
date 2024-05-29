import React from "react";

const BookingDetails = ({ details, endNote }) => {
  const colors = ["#f5f5f5", "#e9e9e9", "#d9d9d9", "#c9c9c9"];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "5px",
        fontFamily: "'Poppins', sans-serif",
        color: "#333333",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "10px" }}>
        Booking Details
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridGap: "10px",
        }}
      >
        {Object.entries(details).map(([key, value], index) => (
          <div
            style={{
              padding: "10px",
              backgroundColor: colors[index % colors.length],
            }}
          >
            <h3
              style={{ fontSize: "16px", fontWeight: 600, marginBottom: "5px" }}
            >
              {key}
            </h3>
            <p style={{ fontSize: "14px", lineHeight: 1.5 }}>{value}</p>
          </div>
        ))}
      </div>
      <p>{endNote}</p>
    </div>
  );
};

export default BookingDetails;
