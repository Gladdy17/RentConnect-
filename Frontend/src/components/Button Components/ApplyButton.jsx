import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/buttonStyles.css'

function ApplyButton({ propertyId, User }) {
  const navigate = useNavigate();

  // ✅ Use prop if available, otherwise fallback to localStorage
  const userId = User.id || localStorage.getItem("user").id;

  const handleApply = () => {
    console.log("✅ handleApply triggered for property:", propertyId);
    console.log("🔐 userId being passed:", User.id);

    if (!userId) {
      alert("No user ID found. Please log in.");
      return;
    }

    navigate("/dashboard/renter-application", {
      state: {
        propertyId,
        userId,
      },
    });
  };

  return (
    <button
      className="meet"
      onClick={handleApply}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#388697",
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