import React from "react";

// BookingDetails component
const BookingDetails = _ref => {
  let {
    details,
    endNote
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "5px",
      fontFamily: "'Poppins', sans-serif",
      color: "#333333"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "24px",
      fontWeight: 600,
      marginBottom: "10px"
    }
  }, "Booking Details"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gridGap: "10px"
    }
  }, Object.entries(details).map((_ref2, index) => {
    let [key, value] = _ref2;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "10px",
        backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e9e9e9"
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "16px",
        fontWeight: 600,
        marginBottom: "5px"
      }
    }, key), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "14px",
        lineHeight: 1.5
      }
    }, value));
  })), /*#__PURE__*/React.createElement("p", null, endNote));
};
export default BookingDetails;