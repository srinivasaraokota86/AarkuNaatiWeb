import { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
   // const [errors, setErrors] = useState({});
    //const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(email);
            console.log("Sending:", email);
            await axios.post(
                "https://localhost:7130/api/ForgotPassword/forgot-password",
                {
                    email: email
                }
            );

            alert("Reset link sent successfully");
           // navigate("/farmers");
        }
        catch (error) {
            console.log(error);
            alert("Email not found");
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-card">

                <h2>Forgot Password</h2>

                <p>
                    Enter your registered email address.
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Send Reset Link
                    </button>

                </form>

            </div>
        </div>
    );
}