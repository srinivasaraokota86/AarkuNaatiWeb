import { useState } from "react";
import "./CustomerForm.css";
import "./Farmers.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Farmers() {

    const location = useLocation();
    //const [CropTypes, setCropTypes] = useState([]);

    const editData = location.state;
    console.log("Edit Data:", editData);

   /* useEffect(() => {
        axios.get("https://localhost:7130/api/CropTypes")
            .then(res => setCropTypes(res.data))
            .catch(err => console.log(err));
    }, []);*/

    const navigate = useNavigate();

    const [farmer, setFarmer] = useState({
        id: editData?.id || "",
        farmerCode: editData?.farmerCode || "",
        name: editData?.name || "",
        mobile: editData?.mobile || "",
       // village: editData?.village || "",
        aadharNo: editData?.aadharNo || "",
        gstno: editData?.gstno || "",
        isActive: editData?.isActive ?? true,
        createdDate: editData?.createdDate || ""
    });
    /*const [address, setAddress] = useState({
        FarmerId: farmer.id || "",
        villageId: null,
       // villageName: "",
        mandalId: null,
       // mandalName:"",
        districtId: null,
       // districtName:"",
        stateId: null,
       // stateName:"",
        pinCode: "",
        fullAddress: ""
    });*/
        const [address, setAddress] = useState({

        villageId: editData?.villageId || "",
            mandalId: editData?.mandalId || "",
            districtId: editData?.districtId || "",
            stateId: editData?.stateId || "",
            pinCode: editData?.pinCode || "",
            fullAddress: editData?.fullAddress || ""
    });

   /* const [land, setLand] = useState({
        farmerId: farmer.id || "",
        totalAcres: "",
        ownershipType: "",
        surveyNumber: "",
        irrigationTypeId: "",
        soilTypeId: "",
        latitude: "",
        longitude: ""
    });*/

    /*const [crop, setCrop] = useState({
        farmerId: farmer.id || "",
        cropTypeId: "",
        season: ""
    });*/

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [mandals, setMandals] = useState([]);
    const [villages, setVillages] = useState([]);
    //const [cropTypes, setCropTypes] = useState([]);
    //const [soilTypes, setSoilTypes] = useState([]);
    //const [irrigationTypes, setIrrigationTypes] = useState([]);

    useEffect(() => {

        axios.get("https://localhost:7130/api/States")
            .then(res => {
                console.log("States:", res.data);
                setStates(res.data);
            });

        axios.get("https://localhost:7130/api/Districts")
            .then(res => {
                console.log("Districts:", res.data);
                setDistricts(res.data);
            });

        axios.get("https://localhost:7130/api/Mandals")
            .then(res => {
                console.log("Mandals:", res.data);
                setMandals(res.data);
            });

        axios.get("https://localhost:7130/api/Villages")
            .then(res => {
                console.log("Villages:", res.data);
                setVillages(res.data);
            });

        //axios.get("https://localhost:7130/api/CropTypes")
        // .then(res => setCropTypes(res.data));

       // axios.get("https://localhost:7130/api/CropTypes")
           // .then(res => {
             //   console.log("CropTypes API response:", res.data);
             //   setCropTypes(res.data);
           // })
          //  .catch(err => {
           //     console.error("Error fetching crop types:", err);
           //     setCropTypes([]); // fallback to empty array
          //  });


       // axios.get("https://localhost:7130/api/SoilTypes")
            //.then(res => setSoilTypes(res.data));

       // axios.get("https://localhost:7130/api/IrrigationTypes")
          //  .then(res => setIrrigationTypes(res.data));

    }, []);

    const [errors, setErrors] = useState({});

    //const [message, setMessage] = useState("");

    // Validation Function
    const validate = (name, value) => {

        let error = "";

            //aadhar Validation
            if (name === "aadharNo") {
                const AadharNoPattern = /^[0-9]{12}$/;

                if (!value.trim()) {
                    error = "AadharNumber is mandatory";
                }
                else if (!AadharNoPattern.test(value)) {
                    error = "Aadhar Number must be 12 digits";
                }
            }

            // mobile Validation
            if (name === "mobile") {

                const mobilePattern = /^[0-9]{10}$/;

                if (!value.trim()) {
                    error = "Mobile number is mandatory";
                }
                else if (!mobilePattern.test(value)) {
                    error = "Enter valid 10 digit mobile number";
                }
            }

            // gst Validation
            if (name === "gstno") {
                const GSTNoPattern =
                    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;

                if (!value.trim()) {
                    error = "GST Number is mandatory";
                }
                else if (!GSTNoPattern.test(value)) {
                    error = "Invalid GST Number";
                }
            }

            setErrors((prev) => ({
                ...prev,
                [name]: error
            }));
        };

    /*function getLocation() {

        navigator.geolocation.getCurrentPosition(
            (position) => {

                setLand({
                    ...land,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
    );*/


    // Handle Change
    function handleChange(e) {

        const { name, value } = e.target;

        setFarmer({
            ...farmer,
            [name]: value
        });

        validate(name, value);
    }
    // Submit
async function handleSubmit(e) {

    e.preventDefault();


    Object.keys(farmer).forEach((field) => {
        validate(field, farmer[field]);
    });

    if (
        errors.mobile ||
        errors.aadharNo ||
        errors.gstno
    ) {
        alert("Please correct validation errors");
        return;
    }

    // Always use PascalCase property names to match your C# DTO
    const updatedAddress = { ...address, FarmerId: farmer.id };
    // const updatedLand = { ...land, FarmerId: farmer.id };
    // If you have crop, include it; otherwise, send null or an empty object as needed by your API
    // const updatedCrop = { ...crop, CropTypeId: crop.cropTypeId ? parseInt(crop.cropTypeId, 10) : null, FarmerId: farmer.id, Season: crop.season || "Kharif" };

    const FarmerRegistrationDto = {
        Farmer: {
            Id: farmer.id,
            FarmerCode: farmer.farmerCode,
            Name: farmer.name,
            Mobile: farmer.mobile,
            AadharNo: farmer.aadharNo,
            GSTNO: farmer.gstno,
            ISActive: farmer.isActive,
            CreatedDate: farmer.createdDate
        },
        Address: updatedAddress,
        //Land: updatedLand,
        // Crop: null // or updatedCrop if you have crop info
    };

    try {
        // UPDATE
        if (editData) {
            const response = await axios.put(
                'https://localhost:7130/api/Farmers/register/${id}',
                FarmerRegistrationDto,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(response.data);
            alert("Farmer Updated Successfully");
        }
        // CREATE
        else {
            // alert("3. handleSubmit called");

            const response = await axios.post(
                "https://localhost:7130/api/Farmers/register",
                FarmerRegistrationDto,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            /* console.log(
                 "Submitting DTO:",
                 registrationDto
             );
             await axios.post(
                 "https://localhost:7130/api/Farmers/register",
                 registrationDto,
             );*/


            console.log(response.data);
            alert("Farmer Saved Successfully");
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


    setFarmer({
        id: "",
        farmerCode: "",
        name: "",
        mobile: "",
        //village: "",
        aadharNo: "",
        gstno: "",
        isActive: "",
        createdDate: "",
    });

    setAddress({
        villageId: "",
        //villageName: "",
        mandalId: "",
       // mandalName: "",
        districtId: "",
       // districtName: "",
        stateId: "",
       // stateName: "",
        pinCode: "",
        fullAddress: ""
    });

    /* setLand({
         totalAcres: "",
         ownershipType: "",
         surveyNumber: "",
         irrigationTypeId: "",
         soilTypeId: "",
         latitude: "",
         longitude: ""
     });*/


    // navigate("/farmers");
    navigate("/farmers", {
        state: farmer
    });
}


         return (

            <div className="form-container">

                <form className="form-box" onSubmit={handleSubmit}>

                    <h2>Farmer Membership</h2>

                     <div className="form-grid">
                    {/* Farmer code */}

                    <input
                        name="farmerCode"
                        placeholder="farmerCode"
                        value={farmer.farmerCode}
                        onChange={handleChange}
                        required
                    />

                    {/* Name */}

                    <input
                        name="name"
                        placeholder="name"
                        value={farmer.name}
                        onChange={handleChange}
                        required
                    />

                    {errors.CustomerName && (
                        <small style={{ color: "red" }}>
                            {errors.CustomerName}
                        </small>
                    )}



                         {/* mobile */}
                         <div className="form-group">
                    <div className="mobile-container">

                        <span className="country-code">
                            +91
                        </span>
                        <input
                            type="text"
                            name="mobile"
                            value={farmer.mobile}
                            placeholder="Enter Mobile Number"
                            maxLength="10"
                            className="mobile-input"
                            onChange={(e) => {

                                const value =
                                    e.target.value.replace(/[^0-9]/g, "");

                                setFarmer({
                                    ...farmer,
                                    mobile: value
                                });

                                validate("mobile", value);
                            }}
                            required
                        />

                    </div>

                    {errors.mobile && (
                        <small style={{ color: "red" }}>
                            {errors.mobile}
                        </small>
                    )}
                         </div>

                         {/* AadharNumber */}
                         <div className="form-group">
                    <input
                        type="text"
                        name="aadharNo"
                        placeholder="aadhar No"
                        maxLength="12"
                        value={farmer.aadharNo}
                        inputMode="numeric"

                        onChange={(e) => {

                            const onlyNumbers =
                                e.target.value.replace(/[^0-9]/g, "");

                            setFarmer({
                                ...farmer,
                                aadharNo: onlyNumbers
                            });

                            validate("aadharNo", onlyNumbers);
                        }}

                        required
                    />
                    {errors.aadharNo && (
                        <small style={{ color: "red" }}>
                            {errors.aadharNo}
                        </small>
                    )}
                    </div>

                         {/* Gst NO */}
                         <div className="form-group">
                    <input
                        type="text"
                        name="gstno"
                        value={farmer.gstno}
                        placeholder="GST No"
                        maxLength="15"
                        onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            handleChange({
                                target: {
                                    name: "gstno",
                                    value
                                }
                            });
                        }}
                        required
                    />
                    {errors.gstno && (
                        <small style={{ color: "red" }}>
                            {errors.gstno}
                        </small>
                    )}
                         </div>

                    {/* Is active */}
                    <select
                        name="isActive"
                        value={farmer.isActive}
                        onChange={(e) =>
                            setFarmer({
                                ...farmer,
                                isActive: e.target.value === "true"
                            })
                        }
                    >
                        <option value="">
                            Select Status
                        </option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    {/*  created date*/}

                    <input
                    type="date"
                        name="createdDate"
                        value={
                            farmer.createdDate
                                ? new Date(farmer.createdDate)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                        }
                        onChange={handleChange}
                        />
                    </div>

                    <h3 className="section-title">
                        Address Information
                    </h3>


                    <div className="form-grid">

                         <select
                             value={address.stateId || ""}
                             onChange={e =>
                                 setAddress({
                                     ...address,
                                     stateId: Number(e.target.value),
                                     districtId: null,
                                     mandalId: null,
                                     villageId: null
                                 })
                             }
                         >
                             <option value="">Select State</option>
                             {states.map(state => (
                                 <option key={state.stateId} value={state.stateId}>
                                     {state.stateName}
                                 </option>
                             ))}
                         </select>

                         <select
                             value={address.districtId || ""}
                             onChange={e =>
                                 setAddress({
                                     ...address,
                                     districtId: Number(e.target.value),
                                     mandalId: null,
                                     villageId: null
                                 })
                             }
                         >
                             <option value="">Select District</option>
                             {districts
                                 .filter(d => d.stateId === address.stateId)
                                 .map(district => (
                                     <option
                                         key={district.districtId}
                                         value={district.districtId}
                                     >
                                         {district.districtName}
                                     </option>
                                 ))}
                         </select>

                         <select
                             value={address.mandalId || ""}
                             onChange={e =>
                                 setAddress({
                                     ...address,
                                     mandalId: Number(e.target.value),
                                     villageId: null
                                 })
                             }
                         >
                             <option value="">Select Mandal</option>
                             {mandals
                                 .filter(m => m.districtId === address.districtId)
                                 .map(mandal => (
                                     <option
                                         key={mandal.mandalId}
                                         value={mandal.mandalId}
                                     >
                                         {mandal.mandalName}
                                     </option>
                                 ))}
                         </select>

                         <select
                             value={address.villageId}
                             onChange={e =>
                                 setAddress({
                                     ...address,
                                     villageId: Number(e.target.value)
                                 })
                             }
                         >
                             <option value="">Select village</option>

                             {villages
                                 .filter(v => v.mandalId === address.mandalId)
                                 .map(village => (
                                     <option key={village.villageId} value={village.villageId}>
                                         {village.villageName}
                                     </option>
                                 ))}
                         </select>



                    <input
                        placeholder="PIN Code"
                        value={address.pinCode}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                pinCode: e.target.value
                            })
                        }
                    />

                    <textarea
                        placeholder="Full Address"
                        value={address.fullAddress}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                fullAddress: e.target.value
                            })
                        }
                    />
                    </div>


                    <button type="submit">
                        {editData ? "Update Farmer" : "Save Farmer"}
                    </button>


                </form>

            </div>
        );
    }
    
