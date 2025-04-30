import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './screens/Register';
import Login from './screens/Login';
// import PlayerForm from './component/PlayerForm';

// import AdminDashboard from './component/AdminDashboard';
import Header from './screens/Header';
import NumberForm from './component/NumberForm';
import UploadCSV from './component/UploadCSV';
import ResultsTable from './component/ResultsTable';
import VerificationPage from './component/VerficationPage';


import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        {/* <Route exact path='/playerform' element={<PlayerForm />} /> */}

        {/* <Route exact path='/AdminDashboard' element={<AdminDashboard />} /> */}
        <Route exact path='/Header' element={<Header />} />
        <Route exact path='/NumberForm' element={<NumberForm />} />
        <Route exact path='/UploadCsv' element={<UploadCSV />} />
        <Route exact path='/ResultsTable' element={<ResultsTable />} />
        <Route exact path='/VerificationPage' element={<VerificationPage />} />
        {/* Add more routes as needed */}

      </Routes>
    </Router>
  );
}
export default App;
