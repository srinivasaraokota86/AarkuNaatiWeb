import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Weighment.css";

export default function Weighment() {

    const navigate = useNavigate();
    const location = useLocation();

    const editData = location.state;

    const [weighment, setWeighment] = useState({
        weighmentId: editData?.weighmentId || 0,
        token: editData?. token || "",
        grossWeight: editData?.grossWeight || "",
        tareWeight: editData?.tareWeight || "",
        netWeight: editData?.netWeight || "",
        noOfBags: editData?.noOfBags || "",
        weightSlipNo: editData?.weightSlipNo || "",
        weighBridge: editData?.weighBridge || ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        let updated = {
            ...weighment,
            [name]: value
        };

        const gross =
            name === "grossWeight"
                ? Number(value)
                : Number(updated.grossWeight);

        const tare =
            name === "tareWeight"
                ? Number(value)
                : Number(updated.tareWeight);

        updated.netWeight =
            gross > 0 && tare >= 0 ? gross - tare : "";

        setWeighment(updated);
    };

    const handleSave = async () => {

        if (
            weighment.token === "" ||
            weighment.grossWeight === "" ||
            weighment.tareWeight === "" ||
            weighment.noOfBags === "" ||
            weighment.weightSlipNo === "" ||
            weighment.weighBridge === ""
        ) {
            alert("Please fill all fields");
            return;
        }

        const data = {

            weighmentId: weighment.weighmentId,
            token: weighment.token,
            grossWeight: Number(weighment.grossWeight),
            tareWeight: Number(weighment.tareWeight),
            netWeight: Number(weighment.netWeight),
            noOfBags: Number(weighment.noOfBags),
            weightSlipNo: weighment.weightSlipNo,
            weighBridge: weighment.weighBridge
        };

       /* try {

            await axios.post(
                "https://localhost:7130/api/Weighment",
                data
            );

            alert("Weighment Saved Successfully!");

            navigate("/weighment-list");*/

            try {

                if (editData) {

                    await axios.put(
                        `https://localhost:7130/api/Weighment/${weighment.weighmentId}`,
                        data
                    );

                    alert("Weighment Updated Successfully!");

                }
                else {

                    await axios.post(
                        "https://localhost:7130/api/Weighment",
                        data
                    );

                    alert("Weighment Saved Successfully!");
                    navigate("/weighment-list");
                }
                setWeighment({

                    weighmentId: 0,
                    token: "",
                    grossWeight: "",
                    tareWeight: "",
                    netWeight: "",
                    noOfBags: "",
                    weightSlipNo: "",
                    weighBridge: ""

                });

                navigate("/weighment-list");

        }
        catch (error) {

            console.log(error);

            alert("Unable to Save Weighment");
        }
    };

    return (

        <div className="weighment-container">

            <div className="weighment-card">

                <h2>
                    {editData ? "Edit Weighment" : "Weighment"}
                </h2>
                <hr />

                <div className="form-grid">

                    <div className="form-group">
                        <label>Token</label>

                        <input
                            type="text"
                            name="token"
                            value={weighment.token}
                            onChange={handleChange}
                            placeholder="Enter Token"
                        />
                    </div>

                    <div className="form-group">
                        <label>Gross Weight (Kg)</label>

                        <input
                            type="number"
                            name="grossWeight"
                            value={weighment.grossWeight}
                            onChange={handleChange}
                            placeholder="Enter Gross Weight"
                        />
                    </div>

                    <div className="form-group">
                        <label>Tare Weight (Kg)</label>

                        <input
                            type="number"
                            name="tareWeight"
                            value={weighment.tareWeight}
                            onChange={handleChange}
                            placeholder="Enter Tare Weight"
                        />
                    </div>

                    <div className="form-group">
                        <label>Net Weight (Kg)</label>

                        <input
                            type="number"
                            name="netWeight"
                            value={weighment.netWeight}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>No. Of Bags</label>

                        <input
                            type="number"
                            name="noOfBags"
                            value={weighment.noOfBags}
                            onChange={handleChange}
                            placeholder="Enter Bags"
                        />
                    </div>

                    <div className="form-group">
                        <label>Weight Slip No</label>

                        <input
                            type="text"
                            name="weightSlipNo"
                            value={weighment.weightSlipNo}
                            onChange={handleChange}
                            placeholder="Enter Slip Number"
                        />
                    </div>

                    <div className="form-group">
                        <label>Weigh Bridge</label>

                        <select
                            name="weighBridge"
                            value={weighment.weighBridge}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option>Weigh Bridge 1</option>
                            <option>Weigh Bridge 2</option>
                            <option>Weigh Bridge 3</option>
                        </select>
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