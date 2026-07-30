// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

    const isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";
    //console.log("ProtectedRoute:", isAuthenticated);
    return isAuthenticated
        ? children
        : <Navigate to="/" />;
}