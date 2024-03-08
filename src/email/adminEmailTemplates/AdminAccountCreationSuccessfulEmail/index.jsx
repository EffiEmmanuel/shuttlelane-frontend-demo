import React from "react";

const AdminAccountCreationSuccessfulEmailTemplate = ({
  fullName,
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
          Your admin account has been setup
        </h3>

        {role == "Blogger" && (
          <>
            <p style={{ marginBottom: "20px" }}>
              As a blogger on Shuttlelane, you have all the priviledges of a
              blogger which includes:
            </p>
            <ol>
              <li>Writing blog posts</li>
              <li>Editing blog posts</li>
              <li>Deleting blog posts</li>
              <li>See and track recent bookings, etc</li>
            </ol>
            <p style={{ marginBottom: "20px" }}>
              Please, make sure to adhere strictly to our terms of use while
              using this account.
            </p>
          </>
        )}

        {role == "Super Admin" && (
          <>
            <p style={{ marginBottom: "20px" }}>
              As a Super Admin on Shuttlelane, you have the full priviledges of
              a Super Admin which includes:
            </p>
            <ol>
              <li>Writing blog posts</li>
              <li>Editing blog posts</li>
              <li>Deleting blog posts</li>
              <li>See and track recent bookings</li>
              <li>Assign bookings to drivers and vendors</li>
              <li>Update booking status</li>
              <li>Modify booking and exchange rates, etc</li>
            </ol>
            <p style={{ marginBottom: "20px" }}>
              Please, make sure to adhere strictly to our terms of use while
              using this account.
            </p>
          </>
        )}

        <p style={{ color: "#888" }}>
          Best Regards,
          <br />
          The Shuttlelane Team.
        </p>
      </div>
    </div>
  );
};

export default AdminAccountCreationSuccessfulEmailTemplate;
