import React from "react";

const AdminAccountCreationEmailTemplate = ({
  fullName,
  email,
  username,
  role,
  _id,
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
        <h3
          style={{
            color: "#333",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Your admin account has been created
        </h3>
        <p style={{ marginBottom: "10px" }}>
          <strong>Full Name:</strong> {fullName}
        </p>
        <p style={{ marginBottom: "10px" }}>
          <strong>Email Address:</strong> {email}
        </p>
        <div style={{ marginBottom: "20px" }}>
          <strong>Username: </strong>
          <span style={{}}>{username}</span>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <strong>Role: </strong>
          <span style={{}}>{role}</span>
        </div>
        <p style={{ marginBottom: "20px" }}>
          Complete your account creation by clicking the button below:
        </p>
        <a
          href={`https://www.shuttlelane.com/admin/complete-signup?adminId=${_id}`}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            margin: "0 10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
            backgroundColor: "#262471",
            color: "#fff",
            textDecoration: "none",
          }}
          className="action-button accept-button"
        >
          Complete Signup
        </a>

        <p style={{ color: "#888" }}>
          Best Regards,
          <br />
          The Shuttlelane Team.
        </p>
      </div>
    </div>
  );
};

export default AdminAccountCreationEmailTemplate;
