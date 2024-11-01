import { useState } from "react";
import { Link } from "react-router-dom";
import {OrbitProgress} from "react-loading-indicators";
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

  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const preprocessData = (data) => {
    // Convert string values to appropriate types
    const nitrogen = parseFloat(data.nitrogen);
    const phosphorous = parseFloat(data.phosphorous);
    const potassium = parseFloat(data.potassium);
    const temperature = parseFloat(data.temperature);
    const humidity = parseFloat(data.humidity);
    const ph = parseFloat(data.ph);
    const rainfall = parseFloat(data.rainfall);
  
    // Return the preprocessed data in the desired format
    return {
      nitrogen,
      phosphorous,
      potassium,
      temperature,
      humidity,
      ph,
      rainfall,
    };
  };


  // query API by feeding the data to the model and get the result
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Call handleConfirmInput to preprocess data
      // await handleConfirmInput();
  
      // Use preprocessed data
      const data = preprocessData({
        nitrogen: formData.nitrogen,
        phosphorous: formData.phosphorous,
        potassium: formData.potassium,
        temperature: formData.temperature,
        humidity: formData.humidity,
        ph: formData.ph,
        rainfall: formData.rainfall,
      });
  
      // Log data before sending the request
      console.log('Data being sent:', data);
  
      setIsLoading(true); // Set loading state while waiting for response
  
      const response = await fetch('http://127.0.0.1:8080/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      setIsLoading(false); // Reset loading state after response received
  
      if (response.ok) {
        // Check if the response body has been consumed
        if (!response.bodyUsed) {
          const responseBody = await response.text();
          const prediction = JSON.parse(responseBody).prediction;
          setResult(prediction);
          console.log(prediction);
        } else {
          console.error('Error: Response body already read.');
          setResult('');
        }
      } else {
        // Display error message
        console.error('Error:', response.statusText);
        setResult('');
      }
    } catch (error) {
      // Display error message
      console.error('Error:', error);
      setResult('');
      setIsLoading(false); // Reset loading state in case of error
    }
  };


  return (
    <div className="agriData-page">
      <div className="agriData-container">
        <h1>Farmer Information Form</h1>
        <h2>Farmer Information Form</h2>
        <form>
          <div className="form-group">
            <label>Nitrogen Content (N):</label>
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange} // Added onChange
            />
          </div>

          <div className="form-group">
            <label>Phosphorous Content (P):</label>
            <input
              type="number"
              name="phosphorous"
              value={formData.phosphorous}
              onChange={handleChange} // Added onChange
            />
          </div>

          <div className="form-group">
            <label>Potassium Content (K):</label>
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
          <button type="submit" onClick={handleSubmit}>
            Confirm Crop
          </button>
        </div>

        {/* Results section */}
        <div>
          <h2>Results</h2>
          {isLoading && <h2>The best crop for these conditions is:</h2> }
          
          {isLoading && <OrbitProgress variant="spokes" dense color="#32cd32" size="large" text="Loading..." textColor="#070707" /> }
      
          {/* {result && <p>{result}</p>} */}
          {!isLoading && <p>{result}</p>}
        </div>
      </div>
    </div>
  );
}

export default DataFields;
