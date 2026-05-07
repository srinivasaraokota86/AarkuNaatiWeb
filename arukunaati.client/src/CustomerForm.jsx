import { useState } from "react";
import axios from "axios";

export default function CreateCustomer() {
    const [form, setForm] = useState({
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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("https://localhost:7127/api/customers", form);
            alert("Customer created successfully!");
        } catch (err) {
            alert(err.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Customer</h2>

            <input name="customerName" placeholder="Customer Name" onChange={handleChange} required />
            <input name="customerClass" placeholder="Customer Class" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="phone" placeholder="Phone" onChange={handleChange} />

            <input name="addressLine1" placeholder="Address Line 1" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} />
            <input name="state" placeholder="State" onChange={handleChange} />

            <input name="country" placeholder="Country" onChange={handleChange} />
            <input name="postalCode" placeholder="Postal Code" onChange={handleChange} />

            <button type="submit">Save Customer</button>
        </form>
    );
}
