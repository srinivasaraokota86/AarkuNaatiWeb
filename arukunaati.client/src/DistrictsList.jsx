/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";
import "./ListScreens.css";
import { useNavigate } from "react-router-dom";

export default function DistrictsList() {

    const [districts, setDistricts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadDistricts();
    }, []);

    async function loadDistricts() {
        const response = await axios.get(
            "https://localhost:7130/api/districts"
        );

        setDistricts(response.data);
    }

    return (
        <div className="list-container">
            <h2 className="list-title">Districts List</h2>
            <div className="top-bar">

                <h2>Total Districts: {districts.length}</h2>

                <div className="top-actions">

                    <button
                        className="add-btn"
                        onClick={() => navigate("/districts")}
                    >

                        Add District
                    </button>

                </div>
                </div>

            <table className="list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>District Name</th>
                        <th>State Id</th>
                    </tr>
                </thead>

                <tbody>
                    {districts.map(district => (
                        <tr key={district.districtId}>
                            <td>{district.districtId}</td>
                            <td>{district.districtName}</td>
                            <td>{district.stateId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}