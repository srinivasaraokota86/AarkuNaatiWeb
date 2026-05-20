import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LoginForm() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response = await axios.post(
                "https://localhost:7130/api/auth/login",
                formData
            );

            setMessage(response.data.message);

            // Store user
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

        }
        catch (error) {

            if (error.response) {
                setMessage(error.response.data.message);
            }
            else {
                setMessage("Server Error");
            }
        }
    }

    return (
        <div className="form-container">

            <form className="form-box" onSubmit={handleSubmit}>

                <h2>Login</h2>

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p>{message}</p>

                <p>
                    New User?

                    <Link to="/">
                        Register Here
                    </Link>
                </p>
            </form>

        </div>
    );
}