/* eslint-disable react-hooks/static-components */
import { useState } from "react";
import "./Header.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {
    FaUser,
    FaKey,
    FaSignOutAlt,
    FaRegCalendarAlt
} from "react-icons/fa";

export default function Header() {

    const [showMenu, setShowMenu] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");
    const handleLogout = () => {

        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
        const confirmLogout =
            window.confirm("Are you sure you want to logout?");

        if (!confirmLogout) return;

        localStorage.clear();

        navigate("/");
    };

    const CalendarInput = ({ value, onClick }) => (
        <button className="date-picker-input" onClick={onClick} type="button">
            <FaRegCalendarAlt style={{ marginRight: 8, color: "#1976d2" }} />
            {value}
        </button>
    );

    return (
        <header className="header">

            <h2></h2>
            <div className="header-datepicker">
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="MMMM d, yyyy"
                    customInput={<CalendarInput />}
                />
            </div>

            <div className="profile-section">

                <div
                    className="profile-icon"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {userName?.charAt(0).toUpperCase()}
                </div>


                {showMenu && (
                    <div className="profile-menu">

                        <p>{userName}</p>

                        <hr />

                        <button onClick={() => navigate("/profile")}>
                            <FaUser />
                            <span>My Profile</span>
                        </button>

                        <button>
                            <FaKey />
                            <span>Change Password</span>
                        </button>

                        <button onClick={handleLogout}>
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>

                    </div>
                )}
            </div>

        </header>
    );
}