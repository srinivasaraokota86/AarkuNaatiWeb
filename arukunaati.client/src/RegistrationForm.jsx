import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import { Link } from "react-router-dom";

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://localhost:7130/api/auth/register",
                formData,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            setMessage(response.data.message);
        }
        //catch (error) {
        //    setMessage("Registration failed. Try again.", error);
        //}
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
                <h2>Register</h2>

                <label>Name</label>
                <input name="name" value={formData.name} onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                <button type="submit">Register</button>


                {message && <p className="message">{message}</p>}

                <p>
                    Already registered?

                    <Link to="/login">
                        Login Here
                    </Link>
                </p>
            </form>
        </div>
    );
}









//import React, { useState } from "react";
//import axios from "axios";
//import "./RegistrationForm.css";

//export default function RegistrationForm() {
//    const [formData, setFormData] = useState({
//        name: "",
//        email: "",
//        password: "",
//    });

//    const [message, setMessage] = useState("");

//    function handleChange(e) {
//        setFormData({ ...formData, [e.target.name]: e.target.value });
//    }

//    async function handleSubmit(e) {
//        e.preventDefault();

//        try {
//            const response = await axios.post("http://localhost:5135/api/auth/register", formData);

//            setMessage(response.data.message);
//        } catch (error) {
//            setMessage("Registration failed. Try again.", error);
//        }
//    }

//    return (
//        <div className="form-container">
//            <form className="form-box" onSubmit={handleSubmit}>
//                <h2>Register</h2>

//                <label>Name</label>
//                <input name="name" value={formData.name} onChange={handleChange} required />

//                <label>Email</label>
//                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//                <label>Password</label>
//                <input type="password" name="password" value={formData.password} onChange={handleChange} required />

//                <button type="submit">Register</button>

//                {message && <p className="message">{message}</p>}
//            </form>
//        </div>
//    );
//}
