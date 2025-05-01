import React, { useState } from "react";
import FileUpload from "../fileUpload";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, FormHelperText, Input, InputLabel, Button } from "@mui/material";
import "../../styles/RenterApplicationForm.css";

function RenterApplicationForm() {

  const location = useLocation();
  const navigate = useNavigate();
  const { propertyId, userId } = location.state || {};
  console.log("🚀 Loaded with:", { propertyId, userId });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [yearsWorking, setYearsWorking] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [documents, setDocuments] = useState([]);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!age || isNaN(age) || age < 18) newErrors.age = "Valid age (18+) required";
    if (!currentAddress) newErrors.currentAddress = "Address is required";
    if (!province) newErrors.province = "Province is required";
    if (!city) newErrors.city = "City is required";
    if (!country) newErrors.country = "Country is required";
    if (!employmentStatus) newErrors.employmentStatus = "Employment status is required";
    if (!yearsWorking || isNaN(yearsWorking) || yearsWorking < 0) newErrors.yearsWorking = "Valid years of employment required";
    if (!paymentType) newErrors.paymentType = "Payment type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!userId || !propertyId) {
      alert("Missing user or property information.");
      return;
    }

    const formData = new FormData();

    // Append all text fields
    formData.append("rental_application[first_name]", firstName);
    formData.append("rental_application[last_name]", lastName);
    formData.append("rental_application[age]", age);
    formData.append("rental_application[current_address]", currentAddress);
    formData.append("rental_application[province]", province);
    formData.append("rental_application[city]", city);
    formData.append("rental_application[country]", country);
    formData.append("rental_application[employment_status]", employmentStatus);
    formData.append("rental_application[employer_name]", employerName);
    formData.append("rental_application[years_working_at_employer]", yearsWorking);
    formData.append("rental_application[payment_type]", paymentType);

    // ✅ Dynamic values from navigation state
    formData.append("rental_application[user_id]", userId);
    formData.append("rental_application[rental_property_id]", propertyId);

    // Append each document
    documents.forEach((doc) => {
      formData.append("documents[]", doc);
    });

    try {
      const response = await fetch("http://localhost:3001/rental_applications", {
        method: "POST",
        body: formData,
      });

      let result = null;
      try {
        result = await response.json();
        console.log("Parsed result:", result);
      } catch (jsonErr) {
        console.warn("No JSON returned or failed to parse JSON:", jsonErr);
      }

      if (response.ok) {
        alert("Application submitted successfully!");
        navigate("/dashboard/view-applications", { state: { submitted: true } });
      } else {
        alert(`Error: ${result?.errors?.join(", ") || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit application. Please try again.");
    }
  };

return (
  <div className="renter_application_container">
    <h1>Submit Rental Application</h1>
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <FormControl margin="normal">
          <InputLabel htmlFor="first_name">First Name</InputLabel>
          <Input
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-describedby="first_name_helper"
          />
          <FormHelperText id="first_name_helper">Enter your first name.</FormHelperText>
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="last_name">Last Name</InputLabel>
          <Input
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            aria-describedby="last_name_helper"
          />
          <FormHelperText id="last_name_helper">Enter your last name.</FormHelperText>
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="age">Age</InputLabel>
          <Input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            aria-describedby="age_helper"
          />
          <FormHelperText id="age_helper">Enter your age.</FormHelperText>
          {errors.age && <p className="error-text">{errors.age}</p>}
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="current_address">Current Address</InputLabel>
          <Input
            id="current_address"
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
            aria-describedby="current_address_helper"
          />
          <FormHelperText id="current_address_helper">Enter your current address.</FormHelperText>
          {errors.currentAddress && <p className="error-text">{errors.currentAddress}</p>}
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="province">Province</InputLabel>
          <Input
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            aria-describedby="province_helper"
          />
          <FormHelperText id="province_helper">Enter your province.</FormHelperText>
          {errors.province && <p className="error-text">{errors.province}</p>}
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="city">City</InputLabel>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-describedby="city_helper"
          />
          <FormHelperText id="city_helper">Enter your city.</FormHelperText>
          {errors.city && <p className="error-text">{errors.city}</p>}
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="country">Country</InputLabel>
          <Input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            aria-describedby="country_helper"
          />
          <FormHelperText id="country_helper">Enter your country.</FormHelperText>
          {errors.country && <p className="error-text">{errors.country}</p>}
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="employment_status">Employment Status</InputLabel>
          <Input
            id="employment_status"
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
            aria-describedby="employment_status_helper"
          />
          <FormHelperText id="employment_status_helper">Enter your employment status.</FormHelperText>
          {errors.employmentStatus && <p className="error-text">{errors.employmentStatus}</p>}
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="employer_name">Employer Name</InputLabel>
          <Input
            id="employer_name"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            aria-describedby="employer_name_helper"
          />
          <FormHelperText id="employer_name_helper">Enter your employer's name.</FormHelperText>
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="years_working">Years at Employer</InputLabel>
          <Input
            type="number"
            id="years_working"
            value={yearsWorking}
            onChange={(e) => setYearsWorking(e.target.value)}
            aria-describedby="years_working_helper"
          />
          <FormHelperText id="years_working_helper">Enter the number of years you've worked at your current employer.</FormHelperText>
          {errors.yearsWorking && <p className="error-text">{errors.yearsWorking}</p>}
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="payment_type"></InputLabel>
          <select
            id="payment_type"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          >
            <option value="" disabled>
              Select a payment type
            </option>
            <option value="credit">Credit</option>
            <option value="cheque">Cheque</option>
            <option value="cash">Cash</option>
          </select>
          <FormHelperText id="payment_type_helper">Select your payment type.</FormHelperText>
          {errors.paymentType && <p className="error-text">{errors.paymentType}</p>}
        </FormControl>

        <FormControl>
          <FileUpload onFilesSelected={(selectedFiles) => setDocuments([...selectedFiles])} />
        </FormControl>

      </div>


      <Button
        type="submit"
        variant="contained"
        style={{
          marginTop: "1rem",
          backgroundColor: "#388697",
          color: "white",
        }}
      >
        Submit Application
      </Button>
    </form>
  </div>
);
}

export default RenterApplicationForm;