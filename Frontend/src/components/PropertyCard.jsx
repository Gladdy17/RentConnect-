import React from "react";
import ApplyButton from "./Button Components/ApplyButton";

function PropertyCard({ listing, onClick, isTenant, onApply }) {
  //  Helper function to dynamically build Unsplash image URL

  const getImageURL = (type) => {
    const fallback = "/images/fallback.jpg";
    if (typeof type === "string" && type.trim() !== "") {
      const formatted = type.toLowerCase().trim().replace(/_/g, " ");
      return `/images/${formatted}.jpg`;
    }
    return fallback;
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "white",
        cursor: "pointer",
        color: "black",
      }}
      onClick={onClick}
    >
      <img
        src={getImageURL(listing.property_types)}
        alt={`${listing.property_types?.toLowerCase().trim()} property photo`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/fallback.jpg";
        }}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          marginBottom: "1rem",
        }}
      />
      <h2 style={{ color: "black" }}>{listing.title}</h2>
      <p style={{ color: "black" }}>
      <strong>Availability: {listing.availability ? "Available" : "Occupied"}</strong>
      </p>
      <p style={{ color: "black" }}>
        <strong>{listing.price}</strong> — {listing.location}
      </p>
      <p style={{ color: "black" }}>Bedrooms: {listing.bedrooms}</p>
      <p style={{ color: "black" }}>Type: {listing.propertyType}</p>

      {isTenant && (
        <ApplyButton propertyId={listing.id} onClick={onApply} />
      )}
    </div>
  );
}

export default PropertyCard;