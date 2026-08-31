import FarmerSelector from "./FarmerSelector";
import { useState, useEffect } from "react";
import axios from "axios";
//import "./CustomerForm.css";
import "./Farmers.css";

//import "./procurement.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Procurement() {

    const location = useLocation();
    const navigate = useNavigate();

    const editData = location.state;
    console.log("Edit Data:", editData);

    const [procurement, setProcurement] = useState({

        procurementId: editData?.procurementId || "",
        procurementDate: editData?.procurementDate
            ? editData.procurementDate.split("T")[0]
            : "",

        farmer: editData?.farmerName || "",
        farmerCode: editData?.farmerCode || "",
        mobile: editData?.mobileNumber || "",
        village: editData?.village || "",
        fpo: editData?.fpo || "",

        commodity: editData?.commodity || "",
        variety: editData?.cropType || "",
        grade: editData?.grade || "",
        lotNo: editData?.lotNo || "",
        quantity: editData?.quantity || "",
        bags: editData?.bags || "",
        moisture: editData?.moisture || "",
        quality: editData?.quality || "",
        remarks: editData?.remarks || ""

    });

    const [farmers, setFarmers] = useState([]);

// eslint-disable-next-line no-unused-vars
const [errors, setErrors] = useState({});

    function validate(name, value) {

        let error = "";

        if (name === "mobile") {

            const mobilePattern = /^[0-9]{10}$/;

            if (!mobilePattern.test(value)) {
                error = "Enter valid 10 digit mobile number";
            }
        }

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }
    useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadFarmers();
}, []);

const loadFarmers = async () => {
    try {

        const response = await axios.get(
            "https://localhost:7130/api/Farmers?page=1&pageSize=10000"
        );

        console.log("Farmers API Response:", response.data);

        setFarmers(response.data.data || []);
        //setFarmers(response.data);

    } catch (err) {
        console.log(err);
    }
};

    function handleChange(e) {

        const { name, value } = e.target;

        setProcurement(prev => ({
            ...prev,
            [name]: value
        }));

        validate(name, value);
    }

        const getFarmerDetails = async (farmerName) => {

    if (!farmerName) return;

    try {

        const response = await axios.get(
            `https://localhost:7130/api/Procurements/last-procurement/${farmerName}`
        );

        const data = response.data;
        

      setProcurement(prev => ({
    ...prev,
    

    procurementId: data.procurementId || prev.procurementId,

procurementDate: data.procurementDate
    ? data.procurementDate.split("T")[0]
    : prev.procurementDate,

farmer: data.farmerName || "",
    farmerCode: data.farmerCode || "",
    mobile: data.mobileNumber || "",
    village: data.village || "",
    fpo: data.fpo || "",

    commodity: data.commodity || "",
    variety: data.cropType || "",
    grade: data.grade || "",
    lotNo: data.lotNo || "",
    quantity: data.quantity?.toString() || "",
    bags: data.bags?.toString() || "",
    moisture: data.moisture?.toString() || "",
    quality: data.quality || "",
    remarks: data.remarks || ""
}));

    } catch (err) {
        console.log(err);
    }
};
   async function handleSubmit(e) {

    e.preventDefault();

    try {
console.log("STATE", procurement);
     const data = {
    procurementId: procurement.procurementId,
    procurementDate: procurement.procurementDate,

    farmerCode: procurement.farmerCode,
    farmerName: procurement.farmer,
    mobileNumber: procurement.mobile,

    village: procurement.village,
    fpo: procurement.fpo,

    mandal: "",
    district: "",
    state: "",

    commodity: procurement.commodity,
    cropType: procurement.variety,

    grade: procurement.grade,
    lotNo: procurement.lotNo,
    bags: Number(procurement.bags),
    moisture: Number(procurement.moisture),
    quality: procurement.quality,

    quantity: Number(procurement.quantity),
    unit: "Kg",

    price: 0,
    totalAmount: 0,

    remarks: procurement.remarks,

    latitude: null,
    longitude: null
};

       if (editData) {

    const updateData = {
        ...editData,
        ...data
    };
console.log(JSON.stringify(updateData, null, 2));
    await axios.put(
        `https://localhost:7130/api/Procurements/${editData.procurementId}`,
        updateData
    );

    alert("Procurement Updated Successfully");

} else {
await axios.post(
    "https://localhost:7130/api/Procurements",
    data
);

            alert("Procurement Saved Successfully");
        }

        navigate("/procurement");

    }
   catch (error) {

    console.log(error.response);

    alert(JSON.stringify(error.response.data, null, 2));

}
}

    return (

        <div className="form-container">

            <form className="form-box" onSubmit={handleSubmit}>

                <h2>Procurement Form</h2>

                {/* Procurement Information*/ }

                <h3 className="section-title">
                    Procurement Information
                </h3>

                <div className="form-grid">

                    <input
                        type="text"
                        name="procurementId"
                        placeholder="Procurement ID"
                        value={procurement.procurementId}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="procurementDate"
                        value={procurement.procurementDate}
                        onChange={handleChange}
                        required
                    />

                </div>
                                {/* ================= Farmer Details =================*/ }

               <h3 className="section-title">
    Farmer Details
</h3>

<div className="form-grid">

    <FarmerSelector
    farmers={farmers}
    selectedFarmer={procurement.farmer}
    onSelect={(farmer) => {

        setProcurement(prev => ({
            ...prev,
            farmer: farmer.name,
            farmerCode: farmer.farmerCode,
            mobile: farmer.mobile,
            village: farmer.villageName,
            fpo: farmer.fpo || ""
        }));

        getFarmerDetails(farmer.name);

    }}
/>

    <input
        type="text"
        name="farmerCode"
        placeholder="Farmer Code"
        value={procurement.farmerCode}
        onChange={handleChange}
    />

    <div className="form-group">

        <div className="mobile-container">

            <span className="country-code">+91</span>

            <input
                className="mobile-input"
                type="text"
                name="mobile"
                value={procurement.mobile}
                onChange={handleChange}
            />

        </div>

    </div>

    <input
        type="text"
        name="village"
        placeholder="Village"
        value={procurement.village}
        onChange={handleChange}
    />

    <input
        type="text"
        name="fpo"
        placeholder="FPO Name"
        value={procurement.fpo}
        onChange={handleChange}
    />

</div>
                {/* ================= Commodity Details ================= */}

                <h3 className="section-title">
                    Commodity Details
                </h3>

                <div className="form-grid">

                    <input
                        type="text"
                        name="commodity"
                        placeholder="Commodity"
                        value={procurement.commodity}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="variety"
                        placeholder="Variety"
                        value={procurement.variety}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="grade"
                        placeholder="Grade"
                        value={procurement.grade}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="lotNo"
                        placeholder="Lot Number"
                        value={procurement.lotNo}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity (Kg)"
                        value={procurement.quantity}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="bags"
                        placeholder="No. of Bags"
                        value={procurement.bags}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="moisture"
                        placeholder="Moisture %"
                        value={procurement.moisture}
                        onChange={handleChange}
                    />

                    <select
                        name="quality"
                        value={procurement.quality}
                        onChange={handleChange}
                    >
                        <option value="">Select Quality</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Average">Average</option>
                        <option value="Poor">Poor</option>
                    </select>

                </div>

                {/* ================= Remarks ================= */}

                <h3 className="section-title">
                    Remarks
                </h3>

                <textarea
                    name="remarks"
                    placeholder="Enter Remarks"
                    value={procurement.remarks}
                    onChange={handleChange}
                    rows="4"
                />
                {/* ================= Buttons =================*/ }

                <div className="button-group">

                 

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        {editData ? "Update Procurement" : "Save Procurement"}
                    </button>


                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() =>
                            setProcurement({
                                procurementId: "",
                                procurementDate: "",
                                farmer: "",
                                farmerCode: "",
                                mobile: "",
                                village: "",
                                fpo: "",
                                commodity: "",
                                variety: "",
                                grade: "",
                                lotNo: "",
                                quantity: "",
                                bags: "",
                                moisture: "",
                                quality: "",
                                remarks: ""
                            })
                        }
                    >
                        Clear
                    </button>

                    

                </div>

            </form>

        </div>

    );

}