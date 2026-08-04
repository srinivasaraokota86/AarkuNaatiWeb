import React, { useState } from "react";
//import "./Farmers.css";
import "./IntegrationSettings.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";



export default function IntegrationSettings() {

    // eslint-disable-next-line react-refresh/only-export-components
    const location = useLocation();

    const editData = location.state;
   // console.log("Edit Data:", editData);
    console.log("Edit Data:", JSON.stringify(editData, null, 2));
    const navigate = useNavigate();

    const [integrationSettings, setIntegrationSettings] = useState({
        id: editData?.id || "0",
        baseUrl: editData?.baseUrl || "",
        userName: editData?.userName || "",
        password: editData?.password || "",
        endpointName: editData?.endpointName || "",
        endpointVersion: editData?.endpointVersion || "",
        secretKey: editData?.secretKey || "",
        isActive: editData?.isActive ?? true

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIntegrationSettings((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       /* try {
            const response = await fetch("https://localhost:7130/api/IntegrationSettings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(integrationSettings)
            });

            if (response.ok) {
                alert("Settings saved successfully.");
            } else {
                alert("Failed to save settings.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }*/
        try {
            // UPDATE
            if (editData) {
                const response = await axios.put(
                    `https://localhost:7130/api/IntegrationSettings/${integrationSettings.id}`,
                    integrationSettings,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                console.log(response.data);
                alert("Integration Settings Updated Successfully");
            }
            // CREATE
            else {
                // alert("3. handleSubmit called");
                console.log(integrationSettings);
                const response = await axios.post(
                    "https://localhost:7130/api/IntegrationSettings",
                    integrationSettings,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                console.log(response.data);
                alert("Integration Settings Saved Successfully");
            }

        }
        catch (error) {
            console.log(error);
            alert(
                JSON.stringify(
                    error.response?.data,
                    null,
                    2
                )
            );

        }


        setIntegrationSettings({
            id: "0",
            baseUrl: "",
            userName: "",
            password: "",
            endpointName: "",
            endpointVersion: "",
            secretKey: "",
            isActive: true
        });

        // navigate("/integrationSettings");
        navigate("/integrationSettings", {
            state: integrationSettings
        });

    };

    return (
        <div className="form-container">

        <form className="form-box" onSubmit={handleSubmit}>
            <h2>Integration Settings</h2>

            <div className="form-grid">

                <div className="form-field">
                    <label>Base URL <span className="required">*</span></label>
                    <input
                        type="text"
                        name="baseUrl"
                            value={integrationSettings.baseUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>User Name <span className="required">*</span></label>
                    <input
                        type="text"
                        name="userName"
                            value={integrationSettings.userName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Password <span className="required">*</span></label>
                    <input
                        type="password"
                        name="password"
                            value={integrationSettings.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Endpoint Name <span className="required">*</span></label>
                    <input
                        type="text"
                        name="endpointName"
                            value={integrationSettings.endpointName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Endpoint Version <span className="required">*</span></label>
                    <input
                        type="text"
                        name="endpointVersion"
                            value={integrationSettings.endpointVersion}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Secret Key <span className="required">*</span></label>
                    <input
                        type="text"
                        name="secretKey"
                            value={integrationSettings.secretKey}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="checkbox-group">
                <span>Active</span>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="isActive"
                            checked={integrationSettings.isActive}
                        onChange={(e) =>
                            setIntegrationSettings({
                                ...integrationSettings,
                                isActive: e.target.checked
                            })
                        }
                    />
                </label>
            </div>
            
                <button type="submit">
                    {editData ? "Update Integration Settings" : "Save Integration Settings"}
                </button>

            </form>
        </div>
    );
}
