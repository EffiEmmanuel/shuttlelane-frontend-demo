import React from "react";
import BookingDetails from "../../reusable/BookingDetails";

const AdminBookingEndedEmailTemplate = ({
  bookingReference,
  isVendor,
  vendor,
  driver,
  bookingRate,
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
          Trip Ended: {bookingReference}
        </h1>
        <p style={{ color: "#333", marginBottom: "20px" }}>Dear Admin,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          We would like to inform you that the trip for booking{" "}
          {bookingReference} has been marked as completed.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Please review the trip details and ensure all necessary follow-up
          actions are taken. Find below, {isVendor ? "Vendor's" : "Driver's"}{" "}
          account details:
        </p>

        {isVendor ? (
          <>
            <BookingDetails
              details={{
                "AMOUNT TO SEND:": bookingRate,
                "BANK NAME:": vendor?.bank,
                "ACCOUNT NAME:": vendor?.accountName,
                "ACCOUNT NUMBER:": vendor?.accountNumber,
              }}
            />
          </>
        ) : (
          <>
            <BookingDetails
              details={{
                "AMOUNT TO SEND:": bookingRate,
                "BANK NAME:": driver?.bank,
                "ACCOUNT NAME:": driver?.accountName,
                "ACCOUNT NUMBER:": driver?.accountNumber,
              }}
            />
          </>
        )}

        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The ShuttleLane Team
        </p>
      </div>
    </div>
  );
};

export default AdminBookingEndedEmailTemplate;
