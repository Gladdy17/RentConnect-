import React from "react";
import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import { fetchPropertiesByUser } from "../api/rentalEndpoints.js";
import { useNavigate } from "react-router-dom";
import AddHomeIcon from '@mui/icons-material/AddHome';

function MyProperties({ isTenant, User }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minBedrooms, setMinBedrooms] = useState("");
    const [selectedPropertyType, setSelectedPropertyType] = useState("");
    const [selectedAvailability, setSelectedAvailability] = useState("");
  
    const [listings, setListings] = useState([]);

      const getProperties = async () => {
        try {
          const properties = await fetchPropertiesByUser(User.id); // Replace with actual user ID
          setListings(properties);
        } catch (error) {
          console.error("Failed to fetch rental properties:", error);
        }
      };
  
    // Default mock data
  
    // Simulate fetching data from an API

    const navigateUser = useNavigate()

  
    useEffect(() => {
      getProperties();
    }, []);
  
    const filteredListings = listings.filter((listing) => {
      const query = searchTerm.toLowerCase();
  
      return (
        (listing.title.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query)) &&
        (!minPrice || listing.fees >= parseInt(minPrice)) &&
        (!maxPrice || listing.fees <= parseInt(maxPrice)) &&
        (!minBedrooms || listing.bedrooms >= parseInt(minBedrooms)) &&
        (!selectedPropertyType || listing.property_types === selectedPropertyType) &&
        (!selectedAvailability || listing.availability === selectedAvailability)
      );
    });

  return (
    <div
    style={{
      padding: "8rem 1rem 2rem 1rem",
      maxWidth: "calc(100% - 280px)",
      marginLeft: "260px",
      marginRight: "1rem",
    }}
  >
    <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
      My Properties
    </h1>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.5rem",
      }}
    >
      <input
        type="text"
        placeholder="Search by title or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "0.5rem", minWidth: "240px", borderRadius: "4px" }}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={{ padding: "0.5rem", width: "120px" }}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={{ padding: "0.5rem", width: "120px" }}
      />
      <input
        type="number"
        placeholder="Min Bedrooms"
        value={minBedrooms}
        onChange={(e) => setMinBedrooms(e.target.value)}
        style={{ padding: "0.5rem", width: "140px" }}
      />
      <select
        value={selectedPropertyType}
        onChange={(e) => setSelectedPropertyType(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "160px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">All Property Types</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="studio">Studio</option>
      </select>
      <select
        value={selectedAvailability}
        onChange={(e) => setSelectedAvailability(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "160px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">Availability</option>
        <option value="occupied">Occupied</option>
        <option value="available">Available</option>

      </select>
      <button
        onClick={() => {
          setSearchTerm("");
          setMinPrice("");
          setMaxPrice("");
          setMinBedrooms("");
          setSelectedPropertyType("");
          setSelectedAvailability("");
        }}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Clear Filters
      </button>
    </div>

    <AddHomeIcon 
    style={{
      cursor: "pointer",
      height: "2em",
      width: "2em",
      margin: "1em",
    }}
    onClick={() => navigateUser("/dashboard/add-property")}
    />

    <div style={{ display: "grid", gap: "1.5rem" }}>
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <PropertyCard
              isTenant={isTenant}
              key={listing.id}
              listing={listing}
              onClick={() => navigateUser(`/dashboard/property/${listing.id}`)}
            />
          ))
        ) : (
          <p>No properties match your filters.</p>
        )}
      </div>
    </div>
);
};

export default MyProperties;