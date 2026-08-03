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

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [districtName, setDistrictName] = useState("");
    const [selectedState, setSelectedState] = useState("");


    useEffect(() => {
        loadStates();
        loadDistricts();
    }, []);

    const districtOptions = districts
        .filter(v => !selectedState || v.stateId === Number(selectedState))
        .map(v => ({
            value: v.districtId,
            label: v.districtName
        }));

    const loadStates = async () => {
        const res = await axios.get("https://localhost:7130/api/states");
        setStates(res.data);
    };
    const loadDistricts = async () => {
        const response = await axios.get(
            "https://localhost:7130/api/districts"
        );
        setDistricts(response.data);
    };

    const addDistrict = async () => {

        if (!selectedState) {
            alert("Please select a state");
            return;
        }

        if (!districtName.trim()) {
            alert("Please enter district name");
            return;
        }

        try {
            const response = await axios.post(
                "https://localhost:7130/api/districts",
                {
                    districtName,
                    stateId: Number(selectedState)
                }
            );

            alert(response.data.message);
        }
        catch (error) {
            console.log(error.response?.data);
        }
    };
    return (
        <div className="location-container">

            <h2>Districts</h2>
            {/* District */}
            <div className="card">
                <h3>Add District</h3>

                <select
                    value={selectedState}
                    onChange={(e) => {
                        setSelectedState(e.target.value);

                        setDistrictName("");
                    }}

                    >
                   <option value="">Select State</option>

                    {states.map(state => (
                        <option
                            key={state.stateId}
                            value={state.stateId}
                        >
                            {state.stateName}
                        </option>
                    ))}
                </select>
                <CreatableSelect
                    components={{ DropdownIndicator: CustomDropdownIndicator }}
                    options={districtOptions}
                    isClearable
                    isSearchable
                    placeholder="Select or type new district"
                    value={
                        districtName
                            ? { label: districtName, value: districtName }
                            : null
                    }
                    onChange={(selected) => {
                        setDistrictName(selected?.label || "");
                    }}
                    onCreateOption={(inputValue) => {
                        setDistrictName(inputValue);
                    }}
                />

                <button onClick={addDistrict}>
                    Add District
                </button>
            </div>

        </div>
    );
}
