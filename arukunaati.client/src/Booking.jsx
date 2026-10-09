
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

// =====================================================
// Column Filter Header
// =====================================================
const FilterHeader = ({
    label,
    field,
    filters,
    setFilters,
    openFilter,
    setOpenFilter
}) => {
    const isOpen = openFilter === field;

    return (
        <th className="filter-header">
            <div className="header-content">
                <span>{label}</span>

                <button
                    type="button"
                    className="filter-icon-btn"
                    onClick={() =>
                        setOpenFilter(isOpen ? null : field)
                    }
                    title={`Filter ${label}`}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <path d="M3 5H21L14 13V19L10 21V13L3 5Z" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="column-filter-popup">
                    <input
                        type="text"
                        placeholder={`Search ${label}`}
                        value={filters[field] || ""}
                        onChange={(e) =>
                            setFilters((previousFilters) => ({
                                ...previousFilters,
                                [field]: e.target.value
                            }))
                        }
                        autoFocus
                    />

                    <button
                        type="button"
                        className="popup-clear-btn"
                        onClick={() => {
                            setFilters((previousFilters) => ({
                                ...previousFilters,
                                [field]: ""
                            }));
                        }}
                    >
                        Clear
                    </button>
                </div>
            )}
        </th>
    );
};

// =====================================================
// Booking Component
// =====================================================
function Booking() {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [openFilter, setOpenFilter] = useState(null);

    // Filter state
    const [filters, setFilters] = useState({
        farmerName: "",
        mobileNumber: "",
        fpoOrganization: "",
        alternateContact: "",
        state: "",
        district: "",
        mandal: "",
        village: "",
        surveyNumber: "",
        landArea: ""
    });

    // GET all bookings
    const getBookings = async () => {
        try {
            const response = await fetch(
                "https://localhost:7130/api/Bookings"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch bookings");
            }

            const data = await response.json();

            console.log("Bookings:", data);

            if (Array.isArray(data)) {
                setBookings(data);
            } else if (Array.isArray(data?.items)) {
                setBookings(data.items);
            } else if (Array.isArray(data?.data)) {
                setBookings(data.data);
            } else {
                setBookings([]);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            alert("Failed to load bookings");
        }
    };

    // Load bookings when page opens
    useEffect(() => {
        getBookings();
    }, []);

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            farmerName: "",
            mobileNumber: "",
            fpoOrganization: "",
            alternateContact: "",
            state: "",
            district: "",
            mandal: "",
            village: "",
            surveyNumber: "",
            landArea: ""
        });

        setOpenFilter(null);
    };

    // Apply filters
    const filteredBookings = bookings.filter((booking) => {
        return Object.keys(filters).every((field) => {
            const filterValue = String(filters[field] || "")
                .toLowerCase()
                .trim();

            const bookingValue = String(booking[field] ?? "")
                .toLowerCase();

            return bookingValue.includes(filterValue);
        });
    });

    // Edit booking
    const handleEdit = async (id) => {
        try {
            const response = await axios.get(
                `https://localhost:7130/api/Bookings/${id}`
            );

            console.log("Booking for Edit:", response.data);

            navigate("/booking/create", {
                state: response.data
            });
        } catch (error) {
            console.error("Edit Error:", error);
            alert("Unable to load booking details");
        }
    };

    // Delete booking
    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this booking?"
            )
        ) {
            return;
        }

        try {
            await axios.delete(
                `https://localhost:7130/api/Bookings/${id}`
            );

            alert("Booking Deleted Successfully");

            getBookings();
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Unable to delete booking");
        }
    };

    return (
        <div className="booking-list">
            <div className="booking-header">
                <h1>Drone Service Bookings</h1>

                <button
                    type="button"
                    className="new-booking-btn"
                    onClick={() => navigate("/booking/create")}
                >
                    + New Booking
                </button>
            </div>

            {/* Clear All Filters Button */}
            <div className="booking-filter-actions">
                <button
                    type="button"
                    className="clear-filter-btn"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>
            </div>

            {/* Booking Table */}
            <div className="booking-table-container">
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>Actions</th>

                            <FilterHeader
                                label="Farmer Name"
                                field="farmerName"
                                filters={filters}
                                setFilters={setFilters}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                            />

                            <FilterHeader
                                label="Mobile Number"
                                field="mobileNumber"
                                filters={filters}
                                setFilters={setFilters}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                            />

                            <FilterHeader
                                label="FPO / Organization"
                                field="fpoOrganization"
                                filters={filters}
                                setFilters={setFilters}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                            />

                            <FilterHeader
                                label="Alternate Contact"
                                field="alternateContact"
                                filters={filters}
                                setFilters={setFilters}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                            />

                            <FilterHeader
                                label="State"
                                field="state"
                                filters={filters}
                                setFilters={setFilters}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                            />

                            <FilterHeader
                                label="District"
                                field="district"
                                filters={filters}
                                setFilters={setFilters}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                            />

                            <FilterHeader
                                label="Mandal"
                                field="mandal"
                                filters={filters}
                                setFilters={setFilters}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                            />

                            <FilterHeader
                                label="Village"
                                field="village"
                                filters={filters}
                                setFilters={setFilters}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                            />

                            <FilterHeader
                                label="Survey Number"
                                field="surveyNumber"
                                filters={filters}
                                setFilters={setFilters}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                            />

                            <FilterHeader
                                label="Land Area"
                                field="landArea"
                                filters={filters}
                                setFilters={setFilters}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                            />
                        </tr>
                    </thead>

                    <tbody>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <tr key={booking.id}>
                                    {/* Actions */}
                                    <td className="action-cell">
                                        <div className="action-buttons">
                                            <button
                                                type="button"
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEdit(booking.id)
                                                }
                                                title="Edit"
                                            >
                                                <svg
                                                    viewBox="0 0 576 512"
                                                    fill="currentColor"
                                                >
                                                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2z" />
                                                </svg>
                                            </button>

                                            <button
                                                type="button"
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(booking.id)
                                                }
                                                title="Delete"
                                            >
                                                <svg
                                                    viewBox="0 0 448 512"
                                                    fill="currentColor"
                                                >
                                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.5 6.7 296.7 0 284.9 0H163.1c-11.8 0-22.6 6.7-27.9 17.7zM416 128H32L53.2 467c1.6 25.5 22.8 45 48.4 45H346.4c25.6 0 46.8-19.5 48.4-45L416 128z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>

                                    <td>{booking.farmerName}</td>
                                    <td>{booking.mobileNumber}</td>
                                    <td>{booking.fpoOrganization}</td>
                                    <td>{booking.alternateContact}</td>
                                    <td>{booking.state}</td>
                                    <td>{booking.district}</td>
                                    <td>{booking.mandal}</td>
                                    <td>{booking.village}</td>
                                    <td>{booking.surveyNumber}</td>
                                    <td>{booking.landArea}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="11"
                                    style={{
                                        textAlign: "center",
                                        padding: "20px"
                                    }}
                                >
                                    {bookings.length > 0
                                        ? "No bookings match your filters"
                                        : "No bookings found"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Booking;