import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormControlLabel, Checkbox, FormHelperText, Input, InputLabel, Button } from '@mui/material';
import FileUpload from "./fileUpload";
import '../styles/FileUpload.css';

function AddProperty({User}) {

  const navigateUser = useNavigate()

  const [formData, setFormData] = useState({
    property_title: "",
    property_description: "",
    property_sqft: "",
    bedrooms: "",
    bathrooms: "",
    fees: "",
    utilities_included: false,
    property_address: "", // Adding address field
    property_types: "", // Adding property type field
  });

  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    console.log("formData", formData)
    const { id, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formPayload = new FormData();

    // Append form text data using the correct field names
    for (let key in formData) {
      if (key === "property_title") {
        formPayload.append("rental_property[title]", formData[key]);
      } else if (key === "property_description") {
        formPayload.append("rental_property[description]", formData[key]);
      } else if (key === "property_sqft") {
        formPayload.append("rental_property[sq_feet]", formData[key]);
      } else if (key === "property_address") {
        formPayload.append("rental_property[address]", formData[key]);
      } else if (key === "property_types") {
        formPayload.append("rental_property[property_types]", formData[key]);
      } else {
        formPayload.append(`rental_property[${key}]`, formData[key]);
      }
    }

    formPayload.append("rental_property[user_id]", User.id);

    // Append files
    files.forEach((file) => {
      formPayload.append('rental_property[images][]', file);
    });

    try {
      const response = await fetch("http://localhost:3001/rental_properties", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Property successfully created!", data);
        // Optionally, reset form
        setFormData({
          property_title: "",
          property_description: "",
          property_sqft: "",
          bedrooms: "",
          bathrooms: "",
          fees: "",
          utilities_included: false,
          property_address: "",
          property_types: "",
        });

        alert("Property successfully created!");

        navigateUser("/dashboard/my-properties")
      } else {
        console.error("Error creating property:", data);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };
      

  return (
    <div className="add_property_container">
      <h1>Add New Property</h1>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <FormControl margin="normal">
            <InputLabel htmlFor="property_title">Property Title</InputLabel>
            <Input
              id="property_title"
              value={formData.property_title}
              onChange={handleChange}
              aria-describedby="property_title_helper"
            />
            <FormHelperText id="property_title_helper">Enter the title of the property.</FormHelperText>
          </FormControl>

          <FormControl margin="normal">
            <InputLabel htmlFor="property_description">Property Description</InputLabel>
            <Input
              id="property_description"
              value={formData.property_description}
              onChange={handleChange}
              aria-describedby="property_description_helper"
            />
            <FormHelperText id="property_description_helper">Provide a brief description of the property.</FormHelperText>
          </FormControl>     

          <FormControl margin="normal">
            <InputLabel htmlFor="property_sqft">Square Footage</InputLabel>
            <Input
              type="number"
              id="property_sqft"
              value={formData.property_sqft}
              onChange={handleChange}
              aria-describedby="property_sqft_helper"
            />
            <FormHelperText id="property_sqft_helper">Enter the total square footage of the property.</FormHelperText>
          </FormControl>

          <FormControl margin="normal">
            <InputLabel htmlFor="bedrooms">Number of Bedrooms</InputLabel>
            <Input
              type="number"
              id="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              aria-describedby="bedrooms_helper"
            />
            <FormHelperText id="bedrooms_helper">Enter the number of bedrooms.</FormHelperText>
          </FormControl>

          <FormControl margin="normal">
            <InputLabel htmlFor="bathrooms">Number of Bathrooms</InputLabel>
            <Input
              type="number"
              id="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              aria-describedby="bathrooms_helper"
            />
            <FormHelperText id="bathrooms_helper">Enter the number of bathrooms.</FormHelperText>
          </FormControl>

          <FormControl margin="normal">
            <InputLabel htmlFor="fees">Monthly Rent (Fees)</InputLabel>
            <Input
              type="number"
              id="fees"
              value={formData.fees}
              onChange={handleChange}
              aria-describedby="fees_helper"
            />
            <FormHelperText id="fees_helper">Enter the monthly rent for the property.</FormHelperText>
          </FormControl>

          {/* Additional Fields for Address and Property Type */}
          <FormControl margin="normal">
            <InputLabel htmlFor="property_address">Property Address</InputLabel>
            <Input
              id="property_address"
              value={formData.property_address}
              onChange={handleChange}
              aria-describedby="property_address_helper"
            />
            <FormHelperText id="property_address_helper">Enter the property's address.</FormHelperText>
          </FormControl>

          <FormControl margin="normal">
            <InputLabel htmlFor="property_types"></InputLabel>
            <select
              id="property_types"
              value={formData.property_types}
              onChange={handleChange}
              style={{
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            >
              <option value="" disabled>
                Select a property type
              </option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="studio">Studio</option>
            </select>
            <FormHelperText id="property_types_helper">
              Select the type of property (e.g., apartment, house, etc.).
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal">
          <FormControlLabel
            control={
              <Checkbox
                id="utilities_included"
                checked={formData.utilities_included}
                onChange={handleChange}
              />
            }
            label="Utilities Included"
          />
          <FormHelperText id="utilities_included_helper">Check if utilities are included in the rent.</FormHelperText>
        </FormControl>

        </div>



        {/* File Upload */}
        <FormControl>
          <FileUpload onFilesSelected={(selectedFiles) => setFiles([...selectedFiles])} />
        </FormControl>

        </form>

        <Button
        className="file_label"
        onClick={handleSubmit}
        variant="contained"
        style={{
          backgroundColor: "#388697"
        }}>
          Submit New Property
        </Button>

    </div>
  );
}

export default AddProperty;

