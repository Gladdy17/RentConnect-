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

      // Redirect to the login page
      navigate("/");
      setLoggedIn(false)
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      color="primary"
      style={{ marginLeft: "auto" }} // Align to the right in the header
    >
      Logout
    </Button>
  );
}

export default LogoutButton;