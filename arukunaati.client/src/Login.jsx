import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

import agricultureImg from "./assets/agriculture-conventionnelle-traitement.jpg";
import droneImg from "./assets/image 6.jpg";

// Background Images
import image1 from "./assets/image 1.jpg";
import image2 from "./assets/image 2.jpg";
import image3 from "./assets/image 3.jpg";
import image4 from "./assets/image 4.jpg";
import image5 from "./assets/image 5.jpg";
import image6 from "./assets/image 6.jpg";

export default function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    userName: "",
    password: "",
  });

  // Background slideshow images
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
     const response = await axios.post(
  "http://localhost:5135/api/users/login",
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

      {/* Left Side Background */}
      <div
        className="left-side"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      ></div>

      {/* Right Side Login */}
      <div className="right-side">

        <div className="login-card">

          <div className="image-container">
            <img
              src={agricultureImg}
              alt="Agriculture"
              className="login-image"
            />

            <img
              src={droneImg}
              alt="Drone"
              className="login-image"
            />
          </div>

          <h1>Araku Naati</h1>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Username"
              value={login.userName}
              onChange={(e) =>
                setLogin({
                  ...login,
                  userName: e.target.value,
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
                  password: e.target.value,
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

    </div>
  );
}