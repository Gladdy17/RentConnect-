import React from "react";

function ApplyButton({ propertyId, onClick }) {
  return (
    <button
      onClick={() => {
        console.log("<ApplyButton /> clicked for property:", propertyId);
        onClick(propertyId); // delegate to parent
      }}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Apply to Rent
    </button>
  );
}

export default ApplyButton;