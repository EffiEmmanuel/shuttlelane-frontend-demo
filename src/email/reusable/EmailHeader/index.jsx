import React from "react";

const EmailHeader = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            src="https://shuttlelane.com/static/media/logo.46684879b753af396f9a.png"
            alt="Shuttlelane Limited"
            style={{ width: "100px" }}
          />
          <p style={{ margin: 0, color: "#333" }}>
            <img
              src="https://res.cloudinary.com/shuttlelane/image/upload/v1715891295/maps-and-flags_t8bvad.png"
              alt="Our address"
              style={{ marginRight: "5px" }}
            />
            2 Martins Street, Oluwani House,2nd floor, Ojuelegba-Yaba road,
            Lagos
          </p>
        </div>
        <div style={{ textAlign: "right", color: "#333" }}>
          <p style={{ margin: 0 }}>
            <img
              src="https://res.cloudinary.com/shuttlelane/image/upload/v1715890801/phone-call_tu8bce.png"
              alt="Call us on +2349030009452"
              style={{ marginRight: "5px" }}
            />
            <a
              href="tel:+2349030009452"
              style={{ color: "#333", textDecoration: "underline" }}
            >
              +2349030009452
            </a>
          </p>
          <p style={{ margin: 0 }}>
            <img
              src="https://res.cloudinary.com/shuttlelane/image/upload/v1715890801/phone-call_tu8bce.png"
              alt="Call us on +2349030009486"
              style={{ marginRight: "5px" }}
            />
            <a
              href="tel:+2349030009486"
              style={{ color: "#333", textDecoration: "underline" }}
            >
              +2349030009486
            </a>
          </p>
          <p style={{ margin: 0 }}>
            <img
              src="https://res.cloudinary.com/shuttlelane/image/upload/v1715890801/phone-call_tu8bce.png"
              alt="Call us on +2349030009108"
              style={{ marginRight: "5px" }}
            />
            <a
              href="tel:+2349030009108"
              style={{ color: "#333", textDecoration: "underline" }}
            >
              +2349030009108
            </a>
          </p>
          <p style={{ margin: 0 }}>
            <img
              src="https://res.cloudinary.com/shuttlelane/image/upload/v1715890802/envelope_mu2gzb.png"
              alt="Email us at info@shuttlelane.com"
              style={{ marginRight: "5px" }}
            />
            <a
              href="mailto:@info@shuttlelane.com"
              style={{ color: "#333", textDecoration: "underline" }}
            >
              info@shuttlelane.com
            </a>
          </p>
          <p style={{ margin: 0 }}>
            <img
              src="https://res.cloudinary.com/shuttlelane/image/upload/v1715890801/globe_pfnz7j.png"
              alt="Email us at info@shuttlelane.com"
              style={{ marginRight: "5px" }}
            />
            <a
              href="https://www.shuttlelane.com"
              style={{ color: "#333", textDecoration: "underline" }}
            >
              www.shuttlelane.com
            </a>
          </p>
        </div>
      </div>
      <div
        style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}
      ></div>
    </div>
  );
};

export default EmailHeader;
