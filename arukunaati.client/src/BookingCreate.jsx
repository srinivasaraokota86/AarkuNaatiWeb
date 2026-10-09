
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function BookingCreate() {
    const navigate = useNavigate();
    const location = useLocation();

    const editData = location.state;

    const [farmers, setFarmers] = useState([]);
    const [loadingFarmers, setLoadingFarmers] = useState(true);
    const [farmerError, setFarmerError] = useState("");

    const [booking, setBooking] = useState({
        id: editData?.id || "",
        farmerName: editData?.farmerName || "",
        mobileNumber: editData?.mobileNumber || "",
        fpoOrganization: editData?.fpoOrganization || "",
        alternateContact: editData?.alternateContact || "",

        state: editData?.state || "",
        district: editData?.district || "",
        mandal: editData?.mandal || "",
        village: editData?.village || "",
        surveyNumber: editData?.surveyNumber || "",
        landArea: editData?.landArea || "",

        serviceRequired: editData?.serviceRequired || "",
        crop: editData?.crop || "",
        cropStage: editData?.cropStage || "",
        problemPurpose: editData?.problemPurpose || "",

        preferredDate: editData?.preferredDate || "",
        preferredTime: editData?.preferredTime || "",
        additionalNotes: editData?.additionalNotes || ""
    });

    // Fetch farmers from API
    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                setLoadingFarmers(true);
                setFarmerError("");

                const response = await axios.get(
                    "https://localhost:7130/api/Farmers?page=1&pageSize=10"
                );

                console.log("Farmers API Response:", response.data);

                const data = response.data;

                let farmerList = [];

                if (Array.isArray(data)) {
                    farmerList = data;
                } else if (Array.isArray(data?.items)) {
                    farmerList = data.items;
                } else if (Array.isArray(data?.data)) {
                    farmerList = data.data;
                } else if (Array.isArray(data?.results)) {
                    farmerList = data.results;
                }

                console.log("Farmers List:", farmerList);

                setFarmers(farmerList);
            } catch (error) {
                console.error("Error fetching farmers:", error);

                setFarmerError(
                    "Unable to load farmers. Please try again."
                );
            } finally {
                setLoadingFarmers(false);
            }
        };

        fetchFarmers();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setBooking((previousBooking) => ({
            ...previousBooking,
            [name]: value
        }));
    };

    // Submit booking
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editData) {
                const updateUrl =
                    `https://localhost:7130/api/Bookings/${booking.id}`;

                console.log("PUT URL:", updateUrl);
                console.log("PUT DATA:", booking);

                await axios.put(updateUrl, booking);

                alert("Booking Updated Successfully");
            } else {
                const bookingData = { ...booking };

                delete bookingData.id;

                console.log("POST DATA:", bookingData);

                await axios.post(
                    "https://localhost:7130/api/Bookings",
                    bookingData
                );

                alert("Booking Saved Successfully");
            }

            navigate("/booking");
        } catch (error) {
            console.error("FULL ERROR:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);
                console.log(
                    "Validation Errors:",
                    error.response.data?.errors
                );
            }

            alert(
                "Failed to submit booking\n" +
                (
                    error.response?.data?.title ||
                    error.response?.data?.message ||
                    error.message
                )
            );
        }
    };

    return (
        <div className="booking-page">
            <h1>Drone Service Booking</h1>

            <p>
                Request a drone service for your farm.
            </p>

            <form onSubmit={handleSubmit}>
                {/* ================================================= */}
                {/* 1. FARMER DETAILS */}
                {/* ================================================= */}

                <div className="booking-section">
                    <h2>1. Farmer details</h2>

                    <div className="booking-form-row">
                        <div className="booking-form-group">
                            <label>Farmer name *</label>

                            <select
                                name="farmerName"
                                value={booking.farmerName}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    {loadingFarmers
                                        ? "Loading farmers..."
                                        : "Select Farmer"}
                                </option>

                                {!loadingFarmers &&
                                    farmers.map((farmer) => (
                                        <option
                                            key={farmer.id}
                                            value={farmer.name}
                                        >
                                            {farmer.name}
                                        </option>
                                    ))}
                            </select>

                            {farmerError && (
                                <small className="error-message">
                                    {farmerError}
                                </small>
                            )}
                        </div>

                        <div className="booking-form-group">
                            <label>Mobile number *</label>

                            <input
                                type="text"
                                name="mobileNumber"
                                value={booking.mobileNumber}
                                onChange={handleChange}
                                placeholder="10-digit mobile number"
                                required
                            />
                        </div>
                    </div>

                    <div className="booking-form-row">
                        <div className="booking-form-group">
                            <label>FPO / Organization</label>

                            <input
                                type="text"
                                name="fpoOrganization"
                                value={booking.fpoOrganization}
                                onChange={handleChange}
                                placeholder="Select FPO or farmer"
                            />
                        </div>

                        <div className="booking-form-group">
                            <label>Alternate contact</label>

                            <input
                                type="text"
                                name="alternateContact"
                                value={booking.alternateContact}
                                onChange={handleChange}
                                placeholder="Optional"
                            />
                        </div>
                    </div>
                </div>

                {/* ================================================= */}
                {/* 2. FARM LOCATION */}
                {/* ================================================= */}

                <div className="booking-section">
                    <h2>2. Farm location</h2>

                    <div className="booking-form-row">
                        <div className="booking-form-group">
                            <label>State *</label>

                            <select
                                name="state"
                                value={booking.state}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select state
                                </option>

                                <option value="Andhra Pradesh">
                                    Andhra Pradesh
                                </option>

                                <option value="Telangana">
                                    Telangana
                                </option>

                                <option value="Karnataka">
                                    Karnataka
                                </option>
                            </select>
                        </div>

                        <div className="booking-form-group">
                            <label>District *</label>

                            <input
                                type="text"
                                name="district"
                                value={booking.district}
                                onChange={handleChange}
                                placeholder="Select district"
                                required
                            />
                        </div>
                    </div>

                    <div className="booking-form-row">
                        <div className="booking-form-group">
                            <label>Mandal</label>

                            <input
                                type="text"
                                name="mandal"
                                value={booking.mandal}
                                onChange={handleChange}
                                placeholder="Select mandal"
                            />
                        </div>

                        <div className="booking-form-group">
                            <label>Village *</label>

                            <input
                                type="text"
                                name="village"
                                value={booking.village}
                                onChange={handleChange}
                                placeholder="Enter village"
                                required
                            />
                        </div>
                    </div>

                    <div className="booking-form-row">
                        <div className="booking-form-group">
                            <label>Survey number</label>

                            <input
                                type="text"
                                name="surveyNumber"
                                value={booking.surveyNumber}
                                onChange={handleChange}
                                placeholder="Optional"
                            />
                        </div>

                        <div className="booking-form-group">
                            <label>Land area (acres) *</label>

                            <input
                                type="text"
                                name="landArea"
                                value={booking.landArea}
                                onChange={handleChange}
                                placeholder="e.g. 5"
                                required
                            />
                        </div>
                    </div>

                    <div className="map-button">
                        🗺️ &nbsp; Select field on map
                    </div>

                    <p className="map-help">
                        Allow the farmer to mark the field boundary
                        or share the farm location.
                    </p>
                </div>

                {/* ================================================= */}
                {/* 3. CROP AND SERVICE */}
                {/* ================================================= */}

                <div className="booking-section">
                    <h2>🌱 3. Crop and service</h2>

                    <div className="booking-form-row">
                        <div className="booking-form-group full-width">
                            <label>Service required *</label>

                            <select
                                name="serviceRequired"
                                value={booking.serviceRequired}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select service
                                </option>

                                <option value="Crop Monitoring">
                                    Crop Monitoring
                                </option>

                                <option value="Pesticide Spraying">
                                    Pesticide Spraying
                                </option>

                                <option value="Fertilizer Spraying">
                                    Fertilizer Spraying
                                </option>

                                <option value="Disease Detection">
                                    Disease Detection
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="booking-form-row">
                        <div className="booking-form-group">
                            <label>Crop *</label>

                            <select
                                name="crop"
                                value={booking.crop}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select crop
                                </option>

                                <option value="Rice">
                                    Rice
                                </option>

                                <option value="Cotton">
                                    Cotton
                                </option>

                                <option value="Maize">
                                    Maize
                                </option>

                                <option value="Chilli">
                                    Chilli
                                </option>

                                <option value="Groundnut">
                                    Groundnut
                                </option>
                            </select>
                        </div>

                        <div className="booking-form-group">
                            <label>Crop stage</label>

                            <input
                                type="text"
                                name="cropStage"
                                value={booking.cropStage}
                                onChange={handleChange}
                                placeholder="e.g. 45 days"
                            />
                        </div>
                    </div>

                    <div className="booking-form-row">
                        <div className="booking-form-group full-width">
                            <label>Problem / purpose</label>

                            <textarea
                                name="problemPurpose"
                                value={booking.problemPurpose}
                                onChange={handleChange}
                                placeholder="Describe pest, disease, fertilizer need, or monitoring requirement"
                                rows="3"
                            />
                        </div>
                    </div>
                </div>

                {/* ================================================= */}
                {/* 4. SCHEDULE AND PREFERENCES */}
                {/* ================================================= */}

                <div className="booking-section">
                    <h2>📅 4. Schedule and preferences</h2>

                    <div className="booking-form-row">
                        <div className="booking-form-group">
                            <label>Preferred date *</label>

                            <input
                                type="date"
                                name="preferredDate"
                                value={booking.preferredDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="booking-form-group">
                            <label>Preferred time</label>

                            <input
                                type="time"
                                name="preferredTime"
                                value={booking.preferredTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="booking-form-row">
                        <div className="booking-form-group full-width">
                            <label>Additional notes</label>

                            <textarea
                                name="additionalNotes"
                                value={booking.additionalNotes}
                                onChange={handleChange}
                                placeholder="Any special instructions"
                                rows="3"
                            />
                        </div>
                    </div>
                </div>

                {/* ================================================= */}
                {/* SUBMIT */}
                {/* ================================================= */}

                <button
                    type="submit"
                    className="submit-booking-btn"
                >
                    {editData
                        ? "Update Booking"
                        : "Submit Booking Request"}
                </button>
            </form>
        </div>
    );
}

export default BookingCreate;