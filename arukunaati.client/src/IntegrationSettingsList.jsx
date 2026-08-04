import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IntegrationSettingsList.css";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function IntegrationSettingsList() {
    const [integrationSettings, setIntegrationSettings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        getIntegrationSettings();

    }, []);
    console.log("IntegrationSettings:", integrationSettings);


    // Get Farmers
    async function getIntegrationSettings() {

        try {

            const response = await axios.get(
                "https://localhost:7130/api/IntegrationSettings"
            );

            console.log(response.data);

            setIntegrationSettings(response.data);

        } catch (error) {

            console.log(error);
        }
    }
    function handleEdit(integrationSettings) {

        console.log("Selected Record:", JSON.stringify(integrationSettings, null, 2));
        navigate("/integrationSettings", {
            state: integrationSettings
        });
    }
    async function handleDelete(id) {

        if (window.confirm("Are you sure you want to delete?")) {

            try {

                await axios.delete(`https://localhost:7130/api/IntegrationSettings/${id}`);

                alert("Deleted Successfully");

                // Refresh data after delete
                getIntegrationSettings();

            } catch (error) {

                console.log(error);
            }
        }
    }


    return (
        <div className="list-container">
            <div className="top-section">
                <div className="top-row">
                <h2 className="record-count">Total Records: {integrationSettings.length}</h2>

                <button
                    className="add-btn"
                    onClick={() => navigate("/integrationSettings")}
                >
                    Add Integration
                        </button>
                    </div>
                    <h1 className="page-title">
                        Integration Settings
                    </h1>
            </div>
            <table className="integration-table">

                <thead>
                    <tr>
                        <th></th>
                        <th>Base URL</th>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Endpoint Name</th>
                        <th>Endpoint Version</th>
                        <th>SecretKey</th>
                        <th>Active</th>

                    </tr>
                </thead>

                <tbody>

                    {integrationSettings.map(integrationSettings => (


                        <tr key={integrationSettings.id}>
                            <td>
                                <div className="action-buttons">
                                    <button
                                        className="edit-btn tooltip"
                                        onClick={() => handleEdit(integrationSettings)}
                                    >
                                        <FaEdit />
                                        <span className="tooltip-text">Edit</span>
                                    </button>

                                    <button
                                        className="delete-btn tooltip"
                                        onClick={() =>
                                            handleDelete(integrationSettings.id)
                                        }

                                    >
                                        <FaTrash />
                                        <span className="tooltip-text">Delete</span>
                                    </button>
                                </div>
                            </td>

                            <td>{integrationSettings.baseUrl}</td>

                            <td>{integrationSettings.userName}</td>
                            <td>{integrationSettings.password}</td>

                            <td>{integrationSettings.endpointName}</td>
                            <td>{integrationSettings.endpointVersion}</td>
                            <td>{integrationSettings.secretKey}</td>

                            <td>
                                {integrationSettings.isActive ? "Active" : "Inactive"}
                            </td>


                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default IntegrationSettingsList;