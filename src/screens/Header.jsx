import { Link } from "react-router-dom";


function Header() {

    return (<div id="header">
        <Link to='/login' className="nav_button">Login</Link> 
        <Link to='/'  className="nav_button">Register</Link>
       

    

        <Link to='/NumberForm'  className="nav_button">Number Form</Link>
        <Link to='/UploadCsv'  className="nav_button">Upload CSV</Link>
        <Link to='/ResultsTable'  className="nav_button">Results Table</Link>
        {/* Add more links as needed */}
        <Link to='/Header'  className="nav_button">Header</Link>



    </div>)


}

export default Header;