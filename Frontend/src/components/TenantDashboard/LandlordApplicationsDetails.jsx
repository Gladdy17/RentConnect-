import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LandlordApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [status, setStatus] = useState("");

  // Fetch the specific application when component mounts
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`http://localhost:3001/rental_applications/${id}`);
        const data = await response.json();
        setApplication(data);
        setStatus(data.status);  // Initialize status
      } catch (error) {
        console.error("Error fetching application:", error);
      }
    };

    fetchApplication();
  }, [id]);

  const handleAccept = async () => {
    try {
      await fetch(`http://localhost:3001/rental_applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rental_application: { status: "Accepted" } })
      });

      setStatus("Accepted");  // Update locally
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handleReject = async () => {
    try {
      await fetch(`http://localhost:3001/rental_applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rental_application: { status: "Rejected" } })
      });

      setStatus("Rejected");  // Update locally
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  if (!application) {
    return <div style={{ padding: "2rem" }}>Loading application details...</div>;
  }

  return (
    <div style={{ padding: "2rem", color: "black" }}>
      <h1>Tenant Application Details</h1>
      <p><strong>First Name:</strong> {application.first_name}</p>
      <p><strong>Last Name:</strong> {application.last_name}</p>
      <p><strong>Age:</strong> {application.age}</p>
      <p><strong>Current Address:</strong> {application.current_address}</p>
      <p><strong>Province:</strong> {application.province}</p>
      <p><strong>City:</strong> {application.city}</p>
      <p><strong>Country:</strong> {application.country}</p>
      <p><strong>Employment Status:</strong> {application.employment_status}</p>
      <p><strong>Employer Name:</strong> {application.employer_name}</p>
      <p><strong>Years at Employer:</strong> {application.years_working_at_employer}</p>
      <p><strong>Payment Type:</strong> {application.payment_type}</p>
      <p><strong>Property Applying For:</strong> {application.rental_property?.title || "Unknown Property"}</p>
      <p><strong>Current Status:</strong> {status}</p>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={handleAccept}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Accept
        </button>

        <button
          onClick={handleReject}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Reject
        </button>

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => navigate("/dashboard/landlord-applications")}
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            Back to Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandlordApplicationDetails;