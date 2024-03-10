import React from "react";

const AdminDriverEnRouteEmailTemplate = ({
  bookingReference,
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
          Driver En Route: {bookingReference}
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>Dear Admin,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We would like to inform you that the driver for booking{" "}
          {bookingReference} is now en route.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>Driver Details:</p>
        <ul style={{ color: "#333", marginBottom: "20px" }}>
          <li>
            <strong>Name:</strong> {driverName}
          </li>
          <li>
            <strong>Contact:</strong> {driverContact}
          </li>
        </ul>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Please ensure that all necessary arrangements are made to facilitate
          the smooth completion of this trip.
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The ShuttleLane Team
        </p>
      </div>
    </div>
  );
};

export default AdminDriverEnRouteEmailTemplate;
