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
                    <li><a href="/customers">Customers</a></li>
                </ul>
                <div className="menu-heading">FPO Management</div>
                <ul className="menu-list">
                    {/* ... */}
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
