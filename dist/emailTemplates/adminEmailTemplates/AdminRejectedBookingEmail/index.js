import React from "react";
const AdminRejectedBookingEmailTemplate = _ref => {
  let {
    bookingReference,
    pickupDate,
    pickupTime,
    pickupLocation,
    passengerName,
    passengerMobile,
    driverName,
    vendorName,
    isVendor
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f4f4f4"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333"
    }
  }, "Rejected Booking: ", bookingReference), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#333",
      marginBottom: "20px"
    }
  }, "Dear Admin,"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#333",
      marginBottom: "20px"
    }
  }, "We regret to inform you that the booking with the following details has been rejected by ", isVendor ? vendorName : driverName, " and needs to be reassigned to another driver or vendor:"), /*#__PURE__*/React.createElement("ul", {
    style: {
      color: "#333",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Booking ID:"), " ", bookingReference), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Pickup Location:"), " ", pickupLocation), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Pickup Date:"), " ", pickupDate), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Pickup Time:"), " ", pickupTime), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Passenger Name:"), " ", passengerName), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Passenger Contact:"), " ", passengerMobile)), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#333",
      marginBottom: "20px"
    }
  }, "Please reassign this booking to another available driver as soon as possible."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#333"
    }
  }, "Best regards,"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#333",
      marginBottom: "20px"
    }
  }, "The ShuttleLane Team")));
};
export default AdminRejectedBookingEmailTemplate;