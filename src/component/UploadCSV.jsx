import { useState } from 'react';
import Papa from 'papaparse';
import { checkBulkNumbers } from './services/apiService';

const UploadCSV = ({ onBulkResults }) => {
  const [sourceNumber, setSourceNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !sourceNumber) return;

    setIsProcessing(true);
    
    Papa.parse(file, {
      complete: async (results) => {
        const numbers = results.data
          .map(row => row[0]?.trim())
          .filter(num => num && !isNaN(num.replace(/\D/g, '')));
        
        const verificationResults = await checkBulkNumbers(
          sourceNumber, 
          numbers,
          (progress) => setProgress(progress)
        );
        
        onBulkResults(verificationResults);
        setIsProcessing(false);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        setIsProcessing(false);
      },
      skipEmptyLines: true,
      header: false
    });
  };

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Your 2Chat Number:</label>
        <input
          type="text"
          className="form-control"
          value={sourceNumber}
          onChange={(e) => setSourceNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Upload CSV File:</label>
        <input
          type="file"
          className="form-control"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={isProcessing}
        />
        <div className="form-text">
          CSV should contain phone numbers in the first column (one per row)
        </div>
      </div>
      {isProcessing && (
        <div className="progress mt-3">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: `${progress}%` }}
          >
            {Math.round(progress)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCSV;