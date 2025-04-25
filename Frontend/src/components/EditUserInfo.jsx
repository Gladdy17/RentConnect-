import React, { useState } from "react";
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function EditUserInfo({ User, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: User?.first_name || '',
    last_name: User?.last_name || '',
    email: User?.email || '',
    location: User?.location || '',
    phone: User?.phone || '',
    password: '',
    password_confirmation: ''
  });
  
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    
    // Clear password error when either password field changes
    if (id === 'password' || id === 'password_confirmation') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate passwords match if either field is filled
    if (formData.password || formData.password_confirmation) {
      if (formData.password !== formData.password_confirmation) {
        setPasswordError('Passwords do not match');
        return;
      }
    }

    // Remove password fields if they're empty
    const dataToSubmit = {...formData};
    if (!dataToSubmit.password) {
      delete dataToSubmit.password;
      delete dataToSubmit.password_confirmation;
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${User.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ user: dataToSubmit }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user information');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.message);
    }
  };

  return (
    <div className="edit_user_container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {/* ...existing form controls... */}

          <FormControl margin="normal">
            <InputLabel htmlFor="first_name">First Name</InputLabel>
            <Input
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              aria-describedby="first_name_helper"
            />
            <FormHelperText id="first_name_helper">Enter your first name</FormHelperText>
          </FormControl>

          <FormControl margin="normal">
            <InputLabel htmlFor="last_name">Last Name</InputLabel>
            <Input
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              aria-describedby="last_name_helper"
            />
            <FormHelperText id="last_name_helper">Enter your last name</FormHelperText>
          </FormControl>

          <FormControl margin="normal">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              aria-describedby="email_helper"
            />
            <FormHelperText id="email_helper">Enter your email address</FormHelperText>
          </FormControl>

          {/* Add password fields */}
          <FormControl margin="normal">
            <InputLabel htmlFor="password">New Password</InputLabel>
            <Input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              aria-describedby="password_helper"
            />
            <FormHelperText id="password_helper">
              Leave blank to keep current password
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal" error={!!passwordError}>
            <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
            <Input
              type="password"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              aria-describedby="password_confirmation_helper"
            />
            <FormHelperText id="password_confirmation_helper">
              {passwordError || 'Confirm your new password'}
            </FormHelperText>
          </FormControl>
        </div>

        {error && (
          <div style={{ color: 'red', marginTop: '1rem' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="file_label"
          style={{ marginTop: "2rem" }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditUserInfo;