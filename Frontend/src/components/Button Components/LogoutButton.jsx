import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function LogoutButton({ setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/sign_out", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      console.log("User logged out successfully");

      localStorage.clear()
      navigate("/login")
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button
      className="logout"
      onClick={handleLogout}
      variant="contained"
      color="primary"
      style={{ 
        marginLeft: "auto",
        backgroundColor: '#388697',
        scale: '1.1'
      }} // Align to the right in the header
    >
      Logout
    </Button>
  );
}

export default LogoutButton;