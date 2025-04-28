import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandlordApplications = () => {
  const [applications, setApplications] = useState([]);
  const [landlordProperties, setLandlordProperties] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchApplications = async () => {
    try {
      const response = await fetch("http://localhost:3001/rental_applications");
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.id - b.id); // 🔥 Sort by ID after fetch
      setApplications(sortedData);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await fetch("http://localhost:3001/rental_properties");
      const data = await response.json();
      setLandlordProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchProperties();
  }, []);

  const handleAccept = async (id) => {
    try {
      await fetch(`http://localhost:3001/rental_applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rental_application: { status: "Accepted" } })
      });
      await fetchApplications(); // 🔥 After accepting, re-fetch sorted applications
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`http://localhost:3001/rental_applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rental_application: { status: "Rejected" } })
      });
      await fetchApplications(); // 🔥 After rejecting, re-fetch sorted applications
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  // Get IDs of landlord's properties
  const landlordPropertyIds = landlordProperties
    .filter(property => property.user_id === user.id)
    .map(property => property.id);

  // Filter applications to show only landlord's
  const filteredApplications = applications.filter(app =>
    landlordPropertyIds.includes(app.rental_property_id)
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tenant Applications</h1>

      {filteredApplications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        filteredApplications.map((app) => (
          <div
            key={app.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <h3>{`${app.first_name} ${app.last_name}`}</h3>
            <p>Applying for: <strong>{app.rental_property?.title || "Unknown Property"}</strong></p>
            <p>Age: {app.age}</p>
            <p>Employer: {app.employer_name}</p>
            <p>Status: <strong>{app.status}</strong></p>

            <button
              onClick={() => navigate(`/dashboard/application/${app.id}`)}
              style={{
                width: "100%",
                marginTop: "0.5rem",
                padding: "0.5rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              View Details
            </button>

            <div style={{ marginTop: "0.5rem" }}>
              <button onClick={() => handleAccept(app.id)} style={{ marginRight: "1rem" }}>
                Accept
              </button>
              <button onClick={() => handleReject(app.id)}>
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LandlordApplications;