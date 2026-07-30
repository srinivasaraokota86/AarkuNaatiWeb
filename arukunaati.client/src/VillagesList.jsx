/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";
import "./ListScreens.css";
import { useNavigate } from "react-router-dom";

export default function VillagesList() {

    const [villages, setVillages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadVillages();
    }, []);

    async function loadVillages() {
        const response = await axios.get(
            "https://localhost:7130/api/villages"
        );

        setVillages(response.data);
    }

    return (
        <div className="list-container">
            <h2 className="list-title">Villages List</h2>
                        <div className="top-bar">

                <h2>Total Villages: {villages.length}</h2>

                <div className="top-actions">

                    <button
                        className="add-btn"
                        onClick={() => navigate("/village")}
                    >

                        Add District
                    </button>

                </div>
                </div>

            <table className="list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Village Name</th>
                        <th>Mandal Id</th>
                    </tr>
                </thead>

                <tbody>
                    {villages.map(village => (
                        <tr key={village.villageId}>
                            <td>{village.villageId}</td>
                            <td>{village.villageName}</td>
                            <td>{village.mandalId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}