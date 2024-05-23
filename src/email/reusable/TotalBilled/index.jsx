import React from "react";

const TotalBilledSection = ({ totalBilled }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
        padding: "10px 0",
        borderTop: "1px solid #ddd",
      }}
    >
      <h3 style={{ color: "#333", margin: 0, fontWeight: "bold" }}>
        Total Billed:
      </h3>
      <h3 style={{ color: "#333", margin: 0, fontWeight: "bold" }}>
        {totalBilled}
      </h3>
    </div>
  );
};

export default TotalBilledSection;
