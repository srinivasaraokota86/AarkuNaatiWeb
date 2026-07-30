/* eslint-disable no-undef */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import axios from "axios";
import "./LocationManagement.css";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import { FaSearch } from "react-icons/fa";


const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
        <FaSearch style={{ color: "#2e7d32" }} />
    </components.DropdownIndicator>
);

export default function LocationManagement() {

    const [districts, setDistricts] = useState([]);
    const [mandals, setMandals] = useState([]);

    const [mandalName, setMandalName] = useState("");

    const [selectedDistrict, setSelectedDistrict] = useState("");

    const mandalOptions = mandals
        .filter(v => !selectedDistrict || v.districtId === Number(selectedDistrict))
        .map(v => ({
        value: v.mandalId,
        label: v.mandalName
    }));

    useEffect(() => {
        loadDistricts();
        loadMandals();
    }, []);

    const loadDistricts = async () => {
        const response = await axios.get(
            "https://localhost:7130/api/districts"
        );
        setDistricts(response.data);
    };

    const loadMandals = async () => {
        try {
            const response = await axios.get(
                "https://localhost:7130/api/mandals"
            );

            setMandals(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };


    const addMandal = async () => {

        if (!selectedDistrict) {
            alert("Please select a district");
            return;
        }

        if (!mandalName.trim()) {
            alert("Please enter mandal name");
            return;
        }

        try {
            const response = await axios.post(
                "https://localhost:7130/api/mandals",
                {
                    mandalName,
                    districtId: Number(selectedDistrict)
                }
            );

            alert(response.data.message);

            setMandalName("");
        }
        catch (error) {
            console.log(error.response?.data);
            alert(error.response?.data?.message);
        }
    };
    return (
        <div className="location-container">

            <h2>Mandals</h2>

            {/* Mandal */}
            <div className="card">
                <h3>Add Mandal</h3>

                <select
                    value={selectedDistrict}
                    onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setMandalName("");
                    }}
                >
                    <option value="">Select District</option>

                    {districts.map(district => (
                        <option
                            key={district.districtId}
                            value={district.districtId}
                        >
                            {district.districtName}
                        </option>
                    ))}
                </select>
                <CreatableSelect
                    components={{ DropdownIndicator: CustomDropdownIndicator }}
                    options={mandalOptions}
                    isClearable
                    isSearchable
                    placeholder="Select or type new mandal"
                    value={
                        mandalName
                            ? mandalOptions.find(opt => opt.label === mandalName) || { label: mandalName, value: mandalName }
                            : null
                    }
                    onChange={(selected) => {
                        setMandalName(selected?.label || "");
                    }}
                    onCreateOption={(inputValue) => {
                        setMandalName(inputValue);
                    }}
                />

                <button onClick={addMandal}>
                    Add Mandal
                </button>
            </div>
        </div>

    );
}