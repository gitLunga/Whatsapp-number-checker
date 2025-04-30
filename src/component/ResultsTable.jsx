import { useLocation } from 'react-router-dom';

const ResultsTable = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  const csvHeaders = location.state?.csvHeaders || [];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Verification Results</h2>
      {results.length === 0 ? (
        <div className="alert alert-info">No results to display</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                {csvHeaders.map((header, index) => (
                  <th key={index}>{header.replace(/_/g, ' ').toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.data?.phoneNumber || 'N/A'}</td>
                  <td className={result.success ? (result.data.onWhatsApp ? 'text-success' : 'text-danger') : 'text-warning'}>
                    {result.success ? 
                      (result.data.onWhatsApp ? '✅ YES' : '❌ NO') : 
                      '⚠️ ERROR'}
                  </td>
                  <td>
                    <pre className="bg-light p-2 rounded">
                      {result.success ? JSON.stringify(result.data.numberInfo, null, 2) : 'N/A'}
                    </pre>
                  </td>
                  <td>
                    <pre className="bg-light p-2 rounded">
                      {result.success ? JSON.stringify(result.data.whatsappInfo, null, 2) : 'N/A'}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;