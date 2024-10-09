import { useState } from "react";
import { Link } from "react-router-dom";
import './dataForm.css';

function DataFields() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const postData = async () => {
    const data = {
      nitrogen: formData.nitrogen,
      phosphorous: formData.phosphorous,
      potassium: formData.potassium,
      temperature: formData.temperature,
      humidity: formData.humidity,
      ph: formData.ph,
      rainfall: formData.rainfall,
    };
    console.log(data); // Placeholder for where you'd send the data to your backend
  };

  return (
    <div className="agriData-page">
      <div className="agriData-container">
        <h1>Farmer Information Form</h1>
        <h2>Farmer Information Form</h2>
        <form>
          <div className="form-group">
            <label>Nitrogen Content:</label>
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange} // Added onChange
            />
          </div>

          <div className="form-group">
            <label>Phosphorous Content:</label>
            <input
              type="number"
              name="phosphorous"
              value={formData.phosphorous}
              onChange={handleChange} // Added onChange
            />
          </div>

          <div className="form-group">
            <label>Potassium Content:</label>
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange} // Added onChange
            />
          </div>

          <div className="form-group">
            <label>Soil ph:</label>
            <input
              type="number"
              name="ph"
              value={formData.ph}
              onChange={handleChange} // Added onChange
            />
          </div>

          <div className="form-group">
            <label>Area Temperature:</label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange} // Added onChange
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>Area Humidity:</label>
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange} // Added onChange
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>Area rainfall:</label>
            <input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange} // Added onChange
              step="0.01"
            />
          </div>
        </form>

        <br />
        <div className="buttons">
          <Link to="/">
            <button type="button" id="back-button">
              Back
            </button>
          </Link>
          <button type="submit" onClick={postData}>
            Confirm Crop
          </button>
        </div>

        {/* Results section */}
        <div>
          <h2>Results</h2>
          <p>Results will be displayed here...</p>
        </div>
      </div>
    </div>
  );
}

export default DataFields;
