/*import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const token = params.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await axios.post(
                "https://localhost:7130/api/ForgotPassword/reset-password",
                {
                    token,
                    password
                }
            );

            alert("Password reset successful. Please login.");

            navigate("/");
        }
        catch {
            alert("Unable to reset password");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}*/
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

export default function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            await axios.post(
                "https://localhost:7130/api/ForgotPassword/reset-password",
                {
                    token,
                    password
                }
            );

            alert("Password reset successful");

            navigate("/");

        } catch {
            alert("Invalid or expired token");
        }
    };

    return (
        <div className="reset-container">

            <div className="reset-card">

                <h1>Reset Password</h1>

                <p>Create a new password for your account</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Reset Password
                    </button>

                </form>

            </div>

        </div>
    );
}