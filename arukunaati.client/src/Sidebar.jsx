 import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userName");
        navigate("/");
    }


    return (
        <div className="sidebar">
            <div className="sidebar-title">Araku Naati</div>
            <div className="sidebar-content">
                <div className="menu-heading">Farmer Management</div>
                <ul className="menu-list">
                    <li><a href="/farmers">Farmers</a></li>
                    <li><a href="/customer">Customers</a></li>
                </ul>
                {/* Procurement */}

                <div className="menu-heading">
                    Procurement
                </div>

                <ul className="menu-list">

                    <li>
                        <Link to="/procurement-dashboard">
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link to="/procurement">
                            Procurements
                        </Link>
                    </li>

                    <li>
                        <Link to="/quality-inspection-list">
                            Quality Inspection
                        </Link>
                    </li>

                    <li>
                        <Link to="/farmer-payments">
                            Farmer Payments
                        </Link>
                    </li>

                    {/* NEW MENU */}

                    <li>
                        <Link to="/weighment-list">
                            Weighment
                        </Link>
                    </li>

                    <li>
                        <Link to="/stock-management">
                            Stock Management
                        </Link>
                    </li>

                    <li>
                        <Link to="/reports">
                            Reports
                        </Link>
                    </li>

                </ul>


                <div className="menu-heading">Configuration</div>
                <ul className="menu-list">
                    <li>
                        <Link to="/states-list">

                            States

                        </Link>

                    </li>



                    <li>

                        <Link to="/districts-list">

                            Districts

                        </Link>

                    </li>



                    <li>

                        <Link to="/mandals">

                            Mandals

                        </Link>

                    </li>



                    <li>

                        <Link to="/villages">

                            Villages

                        </Link>

                    </li>

                    <div className="menu-heading">Settings</div>
                    <li><a href="/integrationSettingsList"> Integration Settings Form</a></li>




                </ul>
            </div>
            <button

                className="logout-btn"

                onClick={handleLogout}

            >

                Logout

            </button>
        </div>
    );
}
