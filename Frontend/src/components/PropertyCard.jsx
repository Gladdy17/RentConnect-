import React from "react";
import ApplyButton from "./Button Components/ApplyButton";
import { getImageURL } from "../helpers/getImageURL";

function PropertyCard({ listing, onClick, User, isTenant }) {

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
        <strong>Availability:</strong> {listing.availability ? "Available" : "Occupied"}
      </p>
      <p style={{ color: "black" }}>
        <strong>{listing.price}</strong> — {listing.location}
      </p>
      <p style={{ color: "black" }}>Bedrooms: {listing.bedrooms}</p>
      <p style={{ color: "black" }}>Type: {listing.property_types}</p>

      {isTenant && (
        <ApplyButton
          propertyId={listing.id}
          onClick={onClick} 
          User={User}
          />
      )}
    </div>
  );
}

export default PropertyCard;