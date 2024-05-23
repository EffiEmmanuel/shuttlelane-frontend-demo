import React from "react";

const EmailFooter = () => {
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          paddingTop: "20px",
          borderTop: "1px solid #cccccc",
        }}
      >
        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          &copy; 2024 Shuttlelane Limited. All rights reserved.
        </p>
        <p
          style={{
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          <a
            style={{ color: "#333333", textDecoration: "none" }}
            href="https://www.facebook.com/shuttlelane1"
          >
            <img
              src="https://res.cloudinary.com/shuttlelane/image/upload/v1715890801/facebook-app-symbol_ykdtr3.png"
              alt="Follow Shuttlelane on Facebook"
            />
          </a>
          <a
            style={{ color: "#333333", textDecoration: "none" }}
            href="https://api.whatsapp.com/send?phone=2349030009108&text=Hello%20Shuttlelane"
          >
            <img
              src="https://res.cloudinary.com/shuttlelane/image/upload/v1715890800/whatsapp_zk5pcp.png"
              alt="Send Shuttlelane a message on Whatsapp"
            />
          </a>
          <a
            style={{ color: "#333333", textDecoration: "none" }}
            href="https://www.instagram.com/shuttlelane"
          >
            <img
              src="https://res.cloudinary.com/shuttlelane/image/upload/v1715890800/instagram_kdbwvp.png"
              alt="Follow Shuttlelane on Instagram"
            />
          </a>
          <a
            style={{ color: "#333333", textDecoration: "none" }}
            href="https://www.twitter.com/shuttlelane"
          >
            <img
              src="https://res.cloudinary.com/shuttlelane/image/upload/v1715890800/twitter_ouhkqk.png"
              alt="Follow Shuttlelane on X"
            />
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailFooter;
