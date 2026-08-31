import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Components/FarmerSelector.css";

export default function FarmerSelector({
    farmers,
    selectedFarmer,
    onSelect
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredFarmers = farmers.filter(f =>
        (f.name || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (f.farmerCode || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (f.mobile || "")
            .includes(search)
    );

    return (
        <>
           <div className="selector-box">

    <input
        type="text"
        className="selector-input"
        placeholder="Select Farmer"
        value={selectedFarmer}
        readOnly
    />

    <button
        type="button"
        className="selector-btn"
        onClick={() => setOpen(true)}
    >
        <SearchIcon />
    </button>

</div>

            {open && (
                <div className="selector-popup">
                    <div className="selector-header">
                        <span>Farmer Selector</span>

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            ✖
                        </button>
                    </div>

                    <input
                        type="text"
                        className="popup-search"
                        placeholder="Search Farmer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="selector-table-container">
                        <table className="selector-table">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Village</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredFarmers.map((farmer) => (
                                    <tr
                                        key={farmer.farmerCode}
                                        onClick={() => {
                                            onSelect(farmer);
                                            setOpen(false);
                                        }}
                                    >
                                        <td>{farmer.farmerCode}</td>
                                        <td>{farmer.name}</td>
                                        <td>{farmer.mobile}</td>
                                        <td>{farmer.villageName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}