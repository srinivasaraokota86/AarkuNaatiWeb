import { useState } from "react";
import axios from "axios";
import "./CustomerForm.css";
import { useLocation, useNavigate } from "react-router-dom";
export default function CreateCustomer() {
    const location = useLocation();

    const editData = location.state;
    console.log("Edit Data:", editData);

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({

        customerId: editData?.customerId || "",

        customerName: editData?.customerName || "",

        customerClass: editData?.customerClass || "",

        email: editData?.email || "",

        phone: editData?.phone || "",

        addressLine1: editData?.addressLine1 || "",

        city: editData?.city || "",

        state: editData?.state || "",

        country: editData?.country || "",

        postalCode: editData?.postalCode || ""
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    // Validation Function
    const validate = (name, value) => {

        let error = "";

        // Customer Name Validation
        if (name === "customerName") {

            if (!value.trim()) {
                error = "Customer Name is mandatory";
            }
            else if (value.length < 3) {
                error = "Minimum 3 characters required";
            }
        }

        // Phone Validation
        if (name === "phone") {

            const phonePattern = /^[0-9]{10}$/;

            if (!value.trim()) {
                error = "Phone number is mandatory";
            }
            else if (!phonePattern.test(value)) {
                error = "Enter valid 10 digit phone number";
            }
        }

        // Email Validation
        if (name === "email") {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!value.trim()) {
                error = "Email is mandatory";
            }
            else if (!emailPattern.test(value)) {
                error = "Enter valid email";
            }
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));
    };

    const countryStateData = {
        India: [
            "Telangana",
            "Andhra Pradesh",
            "Karnataka",
            "Tamil Nadu"
        ],
        USA: [
            "California",
            "Texas",
            "Florida"
        ]
    };

    const [states, setStates] = useState([]);
    // Handle Change
    function handleChange(e) {

        const { name, value } = e.target;

        setCustomer({
            ...customer,
            [name]: value
        });

        validate(name, value);
    }

    // Submit
    async function handleSubmit(e) {

        e.preventDefault();

        Object.keys(customer).forEach((field) => {
            validate(field, customer[field]);
        });

        if (
            errors.CustomerName ||
            errors.Phone ||
            errors.Email
        ) {
            alert("Please correct validation errors");
            return;
        }

        try {
            // UPDATE
            if (editData) {

                await axios.put(
                    `https://localhost:7130/api/customers/${customer.customerId}`,
                    customer,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                alert("Customer Updated Successfully");
            }

            // CREATE
            else {

                const response = await axios.post(
                    "https://localhost:7130/api/customers",
                    customer,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                setMessage(response.data.message);

                alert("Customer Saved Successfully");
            }

            setCustomer({
                customerId: "",
                customerName: "",
                customerClass: "",
                email: "",
                phone: "",
                addressLine1: "",
                city: "",
                state: "",
                country: "",
                postalCode: ""
            });
            // Navigate back to customer list
            navigate("/customer");
        }
        catch (error) {

            console.log(error);

            if (error.response) {
                setMessage(error.response.data.message);
            }
            else {
                setMessage("Server not responding");
            }
        }
    }

    return (

        <div className="form-container">

            <form className="form-box" onSubmit={handleSubmit}>

                <h2>Create Customer</h2>
                <div className="form-grid">

                {/* Customer Name */}
                <input
                    name="customerName"
                    placeholder="Customer Name"
                    value={customer.customerName}
                    onChange={handleChange}
                    required
                />

                {errors.CustomerName && (
                    <small className="error-text">
                        {errors.CustomerName}
                    </small>
                )}

                {/* Customer Class */}
                <input
                    name="customerClass"
                    placeholder="Customer Class"
                    value={customer.customerClass}
                    onChange={handleChange}
                />

                {/* Email */}
                <input
                    name="email"
                    placeholder="Email"
                    value={customer.email}
                    onChange={handleChange}
                    required
                />

                {errors.Email && (
                    <small className="error-text">
                        {errors.Email}
                    </small>
                )}

                {/* Phone */}
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    maxLength="10"
                    value={customer.phone}
                    onChange={(e) => {

                        const value =
                            e.target.value.replace(/[^0-9]/g, "");

                        setCustomer({
                            ...customer,
                            Phone: value
                        });

                        validate("Phone", value);
                    }}
                    required
                />

                {errors.Phone && (
                    <small className="error-text">
                        {errors.Phone}
                    </small>
                )}

                {/* Address */}
                <input
                    name="addressLine1"
                    placeholder="Address Line 1"
                    value={customer.addressLine1}
                    onChange={handleChange}
                />

                    {/* City */ }
                <input
                    name="city"
                    placeholder="City"
                    value={customer.city}
                    onChange={handleChange}
                />

                {/* Country Dropdown */}
                <select
                    name="Country"
                    value={customer.Country}
                    onChange={(e) => {

                        const selectedCountry = e.target.value;

                        setCustomer({
                            ...customer,
                            Country: selectedCountry,
                            State: ""
                        });

                        setStates(
                            countryStateData[selectedCountry] || []
                        );
                    }}
                >
                    <option value="">
                        Select Country
                    </option>

                    {Object.keys(countryStateData).map((country) => (

                        <option
                            key={country}
                            value={country}
                        >
                            {country}
                        </option>

                    ))}

                </select>

                {/* State Dropdown */}
                <select
                    name="State"
                    value={customer.State}
                    onChange={handleChange}
                >

                    <option value="">
                        Select State
                    </option>

                    {states.map((state) => (

                        <option
                            key={state}
                            value={state}
                        >
                            {state}
                        </option>

                    ))}

                </select>

                    {/* Postal Code */}
                <input
                    name="postalCode"
                    placeholder="Postal Code"
                    value={customer.postalCode}
                    onChange={handleChange}
                    />

                </div>
                <button type="submit">
                    {editData ? "Update Customer" : "Save Customer"}
                </button>

                {message && (
                    <p>{message}</p>
                )}

            </form>

        </div>
    );
}