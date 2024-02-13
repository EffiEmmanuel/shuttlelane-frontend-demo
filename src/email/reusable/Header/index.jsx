import React from "react";

// Header component
const Header = ({ title }) => {
  return (
    <div
      className="header"
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <h1
        style={{
          color: "#333",
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default Header;
