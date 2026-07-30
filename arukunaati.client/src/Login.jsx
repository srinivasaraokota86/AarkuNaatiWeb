import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        userName: "",
        password: ""
    });

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response = await axios.post(
                "https://localhost:7130/api/users/login",
                login
            );

            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userName", response.data.userName);
            localStorage.setItem("email", response.data.email);

            navigate("/farmers");

        } catch {
            alert("Invalid Username or Password");
        }
    }

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Araku Naati</h1>

                <p>Sign in to continue</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={login.userName}
                        onChange={(e) =>
                            setLogin({
                                ...login,
                                userName: e.target.value
                            })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={login.password}
                        onChange={(e) =>
                            setLogin({
                                ...login,
                                password: e.target.value
                            })
                        }
                    />

                    <div className="forgot-password">
                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit">
                        Login
                    </button>

                    <div className="powered-by">
                        Powered by <strong>ERPXPERT</strong>
                    </div>
                </form>

            </div>

        </div>
    );
}