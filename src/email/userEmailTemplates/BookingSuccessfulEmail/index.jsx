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
          Booking Confirmation
        </h1>
        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          Dear {booking?.user?.title ?? booking?.title}{" "}
          {booking?.user?.firstName ?? booking?.firstName},
        </p>
        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          Thank you for booking your {bookingType} with Shuttlelane.
        </p>

        <BookingDetails
          details={{ ...bookingDetails, TOTAL: totalBilled }}
          endNote=""
        />

        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          Thank you for choosing Shuttlelane. We look forward to providing you
          with an exceptional experience.
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

export default BookingSuccessfulEmail;
