import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUpNavigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/users/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
  
      const data = await response.json();
      console.log("user", data.user)
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user)) 
      
      signUpNavigate("/dashboard")

    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Box
      component={"form"}
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleLogin} // Attach the login handler to the form
    >
      <h1 className="login_header">Log In</h1>
      <div>
        <TextField
          id="email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        <TextField
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      <Button type="submit" variant="contained" color="primary">
        Log In
      </Button>
      <Button onClick={() => signUpNavigate("/sign-up")} variant="contained" color="secondary">
        Sign Up
      </Button>
    </Box>
  );
}

export default Login;