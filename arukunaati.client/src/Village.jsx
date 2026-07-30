/* eslint-disable react-hooks/exhaustive-deps */
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

    const [mandals, setMandals] = useState([]);
    const [villages, setVillages] = useState([]);

    const [villageName, setVillageName] = useState("");
    const [selectedMandal, setSelectedMandal] = useState("");

    const villageOptions = villages
        .filter(v => !selectedMandal || v.mandalId === Number(selectedMandal))
        .map(v => ({
            value: v.villageId,
            label: v.villageName
        }));

    useEffect(() => {
        loadMandals();
        loadVillages();
    }, []);

    const loadMandals = async () => {
        const response = await axios.get(
            `https://localhost:7130/api/mandals`
        );
        setMandals(response.data);
    };

    const loadVillages = async () => {
        try {
            const response = await axios.get(
                "https://localhost:7130/api/villages"
            );

            setVillages(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };

        const addVillage = async () => {

            if (!selectedMandal) {
                alert("Please select a mandal");
                return;
            }

            if (!villageName.trim()) {
                alert("Please enter village name");
                return;
            }

            try {
                const response = await axios.post(
                    "https://localhost:7130/api/villages",
                    {
                        villageName,
                        mandalId: Number(selectedMandal)
                    }
                );

                alert(response.data.message);

                setVillageName("");
            }
            catch (error) {
                console.log(error.response?.data);
                alert(error.response?.data?.message);
            }
        };


        return (
            <div className="location-container">

                <h2>Villages</h2>

                {/* Village */}
                <div className="card">
                    <h3>Add Village</h3>

                    <select
                        value={selectedMandal}
                        onChange={(e) => {
                            setSelectedMandal(e.target.value);
                        
                    setVillageName("");
                    }}
                    >
                        <option value="">Select Mandal</option>

                        {mandals.map(mandal => (
                            <option
                                key={mandal.mandalId}
                                value={mandal.mandalId}
                            >
                                {mandal.mandalName}
                            </option>
                        ))}
                    </select>

                    <CreatableSelect
                        components={{ DropdownIndicator: CustomDropdownIndicator }}
                        options={villageOptions}
                        isClearable
                        isSearchable
                        placeholder="Select or type new village"
                        value={
                            villageName
                                ? { label: villageName, value: villageName }
                                : null
                        }
                        onChange={(selected) => {
                            setVillageName(selected?.label || "");
                        }}
                        onCreateOption={(inputValue) => {
                            setVillageName(inputValue);
                        }}
                    />

                    <button onClick={addVillage}>
                        Add Village
                    </button>
                </div>
            </div>
        );
    }

