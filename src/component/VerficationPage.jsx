import { useNavigate } from 'react-router-dom';
import Header from './Header';
import NumberForm from './NumberForm';
import UploadCSV from './UploadCSV';
import './styling/verificationPage.css';

const VerificationPage = () => {
    const navigate = useNavigate();

    const handleBulkResults = (bulkResults) => {
        navigate('/results', { state: { results: bulkResults } });
    };

    return (
        <div className="verification-page">
            <Header />
            <div className="verification-container">
                <div className="verification-card">
                    <h2 className="card-title">Single Number Verification</h2>
                    <NumberForm />
                </div>

                <div className="verification-card">
                    <h2 className="card-title">Bulk CSV Verification</h2>
                    <UploadCSV onBulkResults={handleBulkResults} />
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;