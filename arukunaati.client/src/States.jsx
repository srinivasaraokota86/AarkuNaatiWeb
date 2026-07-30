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
    const [stateName, setStateName] = useState("");

    const stateOptions = states.map(state => ({
        value: state.stateId,
        label: state.stateName
    }));

    useEffect(() => {
        loadStates();
    }, []);

    const loadStates = async () => {
        const res = await axios.get("https://localhost:7130/api/states");
        setStates(res.data);
    };
    const addState = async () => {

        if (!stateName.trim()) {
            alert("Please enter state name");
            return;
        }

        await axios.post(
            "https://localhost:7130/api/states",
            {
                stateName
            }
        );

        setStateName("");

        loadStates(); 
    };
    return (
        <div className="location-container">

            <h2>States</h2>

            {/* State */}
            <div className="card">
                <h3>Add State</h3>
                <CreatableSelect
                    components={{ DropdownIndicator: CustomDropdownIndicator }}
                    options={stateOptions}
                    isClearable
                    isSearchable
                    placeholder="Select or type new state"
                    value={
                        stateName
                            ? { label: stateName, value: stateName }
                            : null
                    }
                    onChange={(selected) => {
                        setStateName(selected?.label || "");
                    }}
                    onCreateOption={(inputValue) => {
                        setStateName(inputValue);
                    }}
                />


                <button onClick={addState}>
                    Add State
                </button>
            </div>
        </div>
    );
}