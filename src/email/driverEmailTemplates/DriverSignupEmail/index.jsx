import React from "react";

const DriverSignupConfirmationEmail = (driver) => {
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
          Driver Account Created Successfully🎉
        </h1>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Dear {driver?.title} {driver?.firstName},
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Congratulations! Your driver account has been successfully created.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          Your account will be reviewed by our team within the next 72 hours. In
          the meantime, feel free to explore our platform and familiarize
          yourself with all of our various services.
        </p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          If you have any questions or need assistance, please don't hesitate to
          contact us.
        </p>
        <p style={{ color: "#333", marginBottom: "10px" }}>
          Thank you for joining our team!
        </p>
        <p style={{ color: "#333" }}>Best regards,</p>
        <p style={{ color: "#333", marginBottom: "20px" }}>
          The Shuttlelane Team
        </p>
      </div>
    </div>
  );
};

export default DriverSignupConfirmationEmail;
