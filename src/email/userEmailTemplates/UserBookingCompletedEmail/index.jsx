import React from "react";
import EmailHeader from "../../reusable/EmailHeader";
import EmailFooter from "../../reusable/EmailFooter";

const UserBookingCompletedEmailTemplate = ({ bookingReference, firstName }) => {
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
          Trip Completed: {bookingReference}
        </h1>
        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          Dear {firstName},
        </p>
        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          Your trip has been marked as complete.
        </p>

        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          Thank you for choosing Shuttlelane. We look forward to knowing how
          your experience was.
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

export default UserBookingCompletedEmailTemplate;
