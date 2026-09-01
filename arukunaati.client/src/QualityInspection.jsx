import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./QualityInspection.css";

export default function QualityInspection() {

    const location = useLocation();
    const navigate = useNavigate();

    const editData = location.state;

    const [inspection, setInspection] = useState({
        

        qualityInspectionId: editData?.qualityInspectionId || 0,
        procurementId: editData?.procurementId || "",
        moisture: editData?.moisture || "",
        size: editData?.size || "",
        damage: editData?.damage || "",
        color: editData?.color || "",
        ripeness: editData?.ripeness || "",
        foreignMaterial: editData?.foreignMaterial || "",
        qualityGrade: editData?.qualityGrade || "",
        inspector: editData?.inspector || ""

    });

    // eslint-disable-next-line no-unused-vars
    const [procurements, setProcurements] = useState([]);
    useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadProcurements();
}, []);

const loadProcurements = async () => {

    try {

        const response = await axios.get(
            "https://localhost:7130/api/Procurements"
        );

        console.log(response.data);

        setProcurements(response.data);

    }
    catch (error) {

        console.log(error);

    }
};

    const handleChange = (e) => {

        setInspection({
            ...inspection,
            [e.target.name]: e.target.value
        });

    };

    const handleSave = async () => {

        if (
            inspection.moisture === "" ||
            inspection.size === "" ||
            inspection.damage === "" ||
            inspection.color === "" ||
            inspection.ripeness === "" ||
            inspection.foreignMaterial === "" ||
            inspection.qualityGrade === "" ||
            inspection.inspector === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        const data = {

            qualityInspectionId: inspection.qualityInspectionId,
           procurementId: inspection.procurementId,
            moisture: Number(inspection.moisture),
            size: inspection.size,
            damage: Number(inspection.damage),
            color: inspection.color,
            ripeness: inspection.ripeness,
            foreignMaterial: Number(inspection.foreignMaterial),
            qualityGrade: inspection.qualityGrade,
            inspector: inspection.inspector

        };

        console.log("Sending Data");
        console.log(data);

        try {

            if (editData) {

                await axios.put(
                    `https://localhost:7130/api/QualityInspection/${inspection.qualityInspectionId}`,
                    data
                );

                alert("Quality Inspection Updated Successfully!");

            }
            else {

                await axios.post(
                    "https://localhost:7130/api/QualityInspection",
                    data
                );

                alert("Quality Inspection Saved Successfully!");

            }

            setInspection({

                qualityInspectionId: 0,
                procurementId: "",
                moisture: "",
                size: "",
                damage: "",
                color: "",
                ripeness: "",
                foreignMaterial: "",
                qualityGrade: "",
                inspector: ""

            });

            navigate("/quality-inspection-list");

        }
        catch (error) {

            console.log("========== ERROR ==========");
            console.log(error);

            if (error.response) {

                console.log(error.response.data);
                alert(JSON.stringify(error.response.data));

            }
            else if (error.request) {

                alert("API not reachable.");

            }
            else {

                alert(error.message);

            }

        }

    };

 return (
    <div className="quality-container">

        <div className="quality-card">

            <h2>
                {editData ? "Edit Quality Inspection" : "Quality Inspection"}
            </h2>

            <hr />

            <div className="form-grid">

                 {/* Procurement ID */}
                <div className="form-group">
                    <label>Procurement ID</label>
                    <input
                        type="text"
                        name="procurementId"
                        placeholder="Enter Procurement ID"
                        value={inspection.procurementId}
                        onChange={handleChange}
                    />
                </div>

                 {/* Moisture */}
                <div className="form-group">
                    <label>Moisture %</label>
                    <input
                        type="number"
                        name="moisture"
                        placeholder="Enter Moisture %"
                        value={inspection.moisture}
                        onChange={handleChange}
                    />
                </div>

                 {/* Size */}
                <div className="form-group">
                    <label>Size</label>
                    <select
                        name="size"
                        value={inspection.size}
                        onChange={handleChange}
                    >
                        <option value="">Select Size</option>
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </select>
                </div>

                 {/* Damage */}
                <div className="form-group">
                    <label>Damage %</label>
                    <input
                        type="number"
                        name="damage"
                        placeholder="Enter Damage %"
                        value={inspection.damage}
                        onChange={handleChange}
                    />
                </div>

                 {/* Color */}
                <div className="form-group">
                    <label>Color</label>
                    <select
                        name="color"
                        value={inspection.color}
                        onChange={handleChange}
                    >
                        <option value="">Select Color</option>
                        <option>Green</option>
                        <option>Yellow</option>
                        <option>Brown</option>
                    </select>
                </div>

                 {/* Ripeness */}
                <div className="form-group">
                    <label>Ripeness</label>
                    <select
                        name="ripeness"
                        value={inspection.ripeness}
                        onChange={handleChange}
                    >
                        <option value="">Select Ripeness</option>
                        <option>Raw</option>
                        <option>Semi Ripe</option>
                        <option>Ripe</option>
                    </select>
                </div>

                 {/* Foreign Material */}
                <div className="form-group">
                    <label>Foreign Material %</label>
                    <input
                        type="number"
                        name="foreignMaterial"
                        placeholder="Enter Foreign Material %"
                        value={inspection.foreignMaterial}
                        onChange={handleChange}
                    />
                </div>

                 {/* Inspector*/ }
                <div className="form-group">
                    <label>Inspector</label>
                    <select
                        name="inspector"
                        value={inspection.inspector}
                        onChange={handleChange}
                    >
                        <option value="">Select Inspector</option>
                        <option>Inspector 1</option>
                        <option>Inspector 2</option>
                    </select>
                </div>

            </div>

            <div className="form-group" style={{ marginTop: "25px" }}>
                <label>Quality Grade</label>

                <div className="radio-group">

                    <label>
                        <input
                            type="radio"
                            name="qualityGrade"
                            value="Premium"
                            checked={inspection.qualityGrade === "Premium"}
                            onChange={handleChange}
                        />
                        Premium
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="qualityGrade"
                            value="Grade A"
                            checked={inspection.qualityGrade === "Grade A"}
                            onChange={handleChange}
                        />
                        Grade A
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="qualityGrade"
                            value="Grade B"
                            checked={inspection.qualityGrade === "Grade B"}
                            onChange={handleChange}
                        />
                        Grade B
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="qualityGrade"
                            value="Rejected"
                            checked={inspection.qualityGrade === "Rejected"}
                            onChange={handleChange}
                        />
                        Rejected
                    </label>

                </div>
            </div>

            <hr />

            <div className="button-area">
                <button
                    type="button"
                    className="save-btn"
                    onClick={handleSave}
                >
                    {editData ? "Update" : "Save"}
                </button>
            </div>

        </div>

    </div>
);
}
