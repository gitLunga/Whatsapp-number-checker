import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkNumber } from './services/apiService';
import './styling/numberForm.css';

const NumberForm = () => {
  const [formData, setFormData] = useState({
    sourceNumber: '',
    phoneNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      const result = await checkNumber(formData.sourceNumber, formData.phoneNumber);
      
      if (result.success) {
        navigate('/ResultsTable', { 
          state: { 
            results: [result],
            csvHeaders: ["phone_number", "on_whatsapp", "json_number_information", "json_whatsapp_information"]
          } 
        });
      } else {
        alert(`Verification failed: ${result.error}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="number-form">
      <div className="form-group">
        <label>Your 2Chat Number</label>
        <input
          type="text"
          name="sourceNumber"
          value={formData.sourceNumber}
          onChange={handleChange}
          placeholder="e.g. 254712345678"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Number to Verify</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="e.g. 254712345678"
          required
        />
      </div>
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Verifying...' : 'Verify Number'}
      </button>
    </form>
  );
};

export default NumberForm;