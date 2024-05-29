import React from "react";
import EmailHeader from "../../reusable/EmailHeader";
import EmailFooter from "../../reusable/EmailFooter";
import BookingDetails from "../../reusable/BookingDetails";
import TotalBilledSection from "../../reusable/TotalBilled";

const BookingSuccessfulEmail = ({
  bookingReference,
  booking,
  bookingType,
  bookingDetails,
  totalBilled,
}) => {
  return (
    <body
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f5f5f5",
        margin: "0",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "5px",
          textAlign: "left",
        }}
      >
        <img
          src="https://shuttlelane.com/static/media/logo.46684879b753af396f9a.png"
          alt="Shuttlelane Limited"
          width="150"
          style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}
        />
        <h1
          style={{
            fontWeight: 600,
            marginTop: "20px",
            marginBottom: "10px",
            color: "#000000",
          }}
        >
          Booking Confirmation
        </h1>
        <p
          style={{ lineHeight: "1.5", marginBottom: "20px", color: "#000000" }}
        >
          Dear {booking?.user?.title ?? booking?.title}{" "}
          {booking?.user?.firstName ?? booking?.firstName},
        </p>
        <p
          style={{ lineHeight: "1.5", marginBottom: "20px", color: "#000000" }}
        >
          Thank you for booking your {bookingType} Booking with Shuttlelane.
        </p>
        {/* BookingDetails component */}
        <BookingDetails
          details={{ ...bookingDetails, TOTAL: totalBilled }}
          endNote=""
        />

        <p
          style={{ lineHeight: "1.5", marginBottom: "20px", color: "#000000" }}
        >
          Thank you for choosing Shuttlelane. We look forward to providing you
          with an exceptional experience.
        </p>
        <p
          style={{ lineHeight: "1.5", marginBottom: "20px", color: "#000000" }}
        >
          Best regards,
          <br />
          The Shuttlelane Team.
        </p>
      </div>
      {/* EmailFooter component */}
      <EmailFooter />
    </body>
  );
};

export default BookingSuccessfulEmail;
