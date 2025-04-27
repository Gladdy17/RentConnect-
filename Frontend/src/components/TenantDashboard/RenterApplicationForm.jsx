import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    <form onSubmit={handleSubmit} className="rental-form">
      <h2>Rental Application Form</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>First Name:</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>

        <div className="form-group">
          <label>Current Address:</label>
          <input value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} />
          {errors.currentAddress && <p className="error-text">{errors.currentAddress}</p>}
        </div>

        <div className="form-group">
          <label>Province:</label>
          <input value={province} onChange={(e) => setProvince(e.target.value)} />
          {errors.province && <p className="error-text">{errors.province}</p>}
        </div>

        <div className="form-group">
          <label>City:</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} />
          {errors.city && <p className="error-text">{errors.city}</p>}
        </div>

        <div className="form-group">
          <label>Country:</label>
          <input value={country} onChange={(e) => setCountry(e.target.value)} />
          {errors.country && <p className="error-text">{errors.country}</p>}
        </div>

        <div className="form-group">
          <label>Employment Status:</label>
          <input value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)} />
          {errors.employmentStatus && <p className="error-text">{errors.employmentStatus}</p>}
        </div>

        <div className="form-group">
          <label>Employer Name (optional):</label>
          <input value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Years at Employer:</label>
          <input type="number" value={yearsWorking} onChange={(e) => setYearsWorking(e.target.value)} />
          {errors.yearsWorking && <p className="error-text">{errors.yearsWorking}</p>}
        </div>

        <div className="form-group">
          <label>Payment Type:</label>
          <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
            <option value="">Select</option>
            <option value="credit">Credit</option>
            <option value="cheque">Cheque</option>
            <option value="cash">Cash</option>
          </select>
          {errors.paymentType && <p className="error-text">{errors.paymentType}</p>}
        </div>
      </div>

      <div className="form-group">
        <p className="file-label">Documents (optional):</p>
        <div className="file-upload-wrapper">
          <button
            type="button"
            className="custom-file-label"
            onClick={() => document.getElementById('documents').click()}
          >
            Choose File(s)
          </button>
          <input
            id="documents"
            type="file"
            multiple
            onChange={(e) =>
              setDocuments((prevDocs) => [...prevDocs, ...Array.from(e.target.files)])}
            className="file-input-hidden"
          />
        </div>

        {documents.length > 0 && (
          <div style={{ marginTop: "0.5rem", color: "#fff" }}>
            <strong>Selected File{documents.length > 1 ? "s" : ""}:</strong>
            <ul style={{ paddingLeft: "1rem", marginTop: "0.25rem" }}>
              {documents.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
  
      <button type="submit" className="submit-btn">Submit Application</button>
    </form>
  );
}

export default RenterApplicationForm;