/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";
import "./ListScreens.css";
import { useNavigate } from "react-router-dom";

export default function StatesList() {

    const [states, setStates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadStates();
    }, []);

    async function loadStates() {
        const response = await axios.get(
            "https://localhost:7130/api/states"
        );

        setStates(response.data);
    }

    return (
        <div className="list-container">
            <h2 className="list-title">States List</h2>
            <div className="top-bar">

                <h2>Total States: {states.length}</h2>

                <div className="top-actions">

                    <button
                        className="add-btn"
                        onClick={() => navigate("/states")}
                    >

                        Add State
                    </button>

                </div>
            </div>

            <table className="list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>State Name</th>
                    </tr>
                </thead>

                <tbody>
                    {states.map(state => (
                        <tr key={state.stateId}>
                            <td>{state.stateId}</td>
                            <td>{state.stateName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}