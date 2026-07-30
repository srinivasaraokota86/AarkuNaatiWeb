/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";
import "./ListScreens.css";
import { useNavigate } from "react-router-dom";

export default function MandalsList() {

    const [mandals, setMandals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadMandals();
    }, []);

    async function loadMandals() {
        const response = await axios.get(
            "https://localhost:7130/api/mandals"
        );

        setMandals(response.data);
    }

    return (
        <div className="list-container">
            <h2 className="list-title">Mandals List</h2>
            <div className="top-bar">

                <h2>Total Villages: {mandals.length}</h2>

                <div className="top-actions">

                    <button
                        className="add-btn"
                        onClick={() => navigate("/mandal")}
                    >

                        Add District
                    </button>

                </div>
            </div>

            <table className="list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mandal Name</th>
                        <th>District Id</th>
                    </tr>
                </thead>

                <tbody>
                    {mandals.map(mandal => (
                        <tr key={mandal.mandalId}>
                            <td>{mandal.mandalId}</td>
                            <td>{mandal.mandalName}</td>
                            <td>{mandal.districtId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}