import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ViewApplications = ({ User }) => {
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const [showSuccess, setShowSuccess] = useState(location.state?.submitted || false);

  useEffect(() => {
    const userId = User.id;
    if (!userId) {
      console.error("No user_id found in localStorage");
      return;
    }

    fetch(`http://localhost:3001/rental_applications?user_id=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch applications");
        return res.json();
      })
      .then((data) => {
        console.log("Applications response:", data);
        setApplications(data);
      })
      .catch((err) => {
        console.error("Error fetching applications:", err);
      });
  }, []);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div style={{ padding: "2rem" }}>
      {showSuccess && (
        <div style={{
          backgroundColor: "#d4edda",
          color: "#155724",
          padding: "1rem",
          borderRadius: "5px",
          marginBottom: "1rem",
          border: "1px solid #c3e6cb",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          ✅ Your rental application was submitted successfully!
        </div>
      )}

      <h1 style={{ marginBottom: "1.5rem" }}>My Rental Applications</h1>

      {applications.length === 0 ? (
        <p>You haven’t applied to any rentals yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {applications.map((app) => (
            <li
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
              <h3>{app.rental_property?.title || "Untitled Property"}</h3>
              <p>Status: <strong>{app.status}</strong></p>
              <p>Submitted: {app.created_at?.slice(0, 10)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewApplications;