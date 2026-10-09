
import { useEffect, useState } from "react";
import axios from "axios";
import "./PilotManagement.css";

const API_URL = "https://localhost:7130/api/Pilots";

const emptyPilot = {
    fullName: "",
    mobileNumber: "",
    email: "",
    aadhaarOrIdProof: "",
    address: "",
    village: "",
    mandal: "",
    district: "",
    state: "",
    profilePhotoUrl: ""
};

const filterColumns = [
    { key: "fullName", label: "Full Name" },
    { key: "mobileNumber", label: "Mobile Number" },
    { key: "email", label: "Email" },
    { key: "aadhaarOrIdProof", label: "Aadhaar / ID" },
    { key: "village", label: "Village" },
    { key: "mandal", label: "Mandal" },
    { key: "district", label: "District" },
    { key: "state", label: "State" }
];

const emptyFilters = Object.fromEntries(
    filterColumns.map(({ key }) => [key, ""])
);

function FilterIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="13"
            height="13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M4 5h16l-6.5 7.5v5l-3 1.5v-6.5L4 5z" />
        </svg>
    );
}

export default function PilotManagement() {
    const [pilots, setPilots] = useState([]);
    const [form, setForm] = useState({ ...emptyPilot });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [filters, setFilters] = useState({ ...emptyFilters });
    const [openFilter, setOpenFilter] = useState(null);

    const loadPilots = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setPilots(
                Array.isArray(response.data) ? response.data : []
            );
        } catch (error) {
            console.error("Error loading pilots:", error);
            alert("Unable to load pilots.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPilots();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const resetForm = () => {
        setForm({ ...emptyPilot });
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.fullName.trim()) {
            alert("Please enter Full Name.");
            return;
        }

        if (!form.mobileNumber.trim()) {
            alert("Please enter Mobile Number.");
            return;
        }

        try {
            setSaving(true);

            if (editingId !== null) {
                await axios.put(`${API_URL}/${editingId}`, form);
                alert("Pilot updated successfully.");
            } else {
                await axios.post(API_URL, form);
                alert("Pilot added successfully.");
            }

            resetForm();
            await loadPilots();
        } catch (error) {
            console.error("Save Pilot Error:", error);
            if (error.response?.data) {
                console.error("API Error:", error.response.data);
            }
            alert(
                editingId !== null
                    ? "Unable to update pilot."
                    : "Unable to add pilot."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (pilot) => {
        setEditingId(pilot.id);
        setForm({
            fullName: pilot.fullName || "",
            mobileNumber: pilot.mobileNumber || "",
            email: pilot.email || "",
            aadhaarOrIdProof: pilot.aadhaarOrIdProof || "",
            address: pilot.address || "",
            village: pilot.village || "",
            mandal: pilot.mandal || "",
            district: pilot.district || "",
            state: pilot.state || "",
            profilePhotoUrl: pilot.profilePhotoUrl || ""
        });
        setShowForm(true);
        setOpenFilter(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this pilot?"
        );

        if (!confirmed) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            alert("Pilot deleted successfully.");
            await loadPilots();
        } catch (error) {
            console.error("Delete Pilot Error:", error);
            alert("Unable to delete pilot.");
        }
    };

    const updateFilter = (key, value) => {
        setFilters((previous) => ({
            ...previous,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setFilters({ ...emptyFilters });
        setOpenFilter(null);
    };

    const hasActiveFilters = Object.values(filters).some(
        (value) => value !== ""
    );

    const filteredPilots = pilots.filter((pilot) =>
        filterColumns.every(({ key }) => {
            const selectedValue = filters[key];

            if (!selectedValue) return true;

            return String(pilot[key] ?? "") === selectedValue;
        })
    );

    const getFilterOptions = (key) => [
        ...new Set(
            pilots
                .map((pilot) => String(pilot[key] ?? "").trim())
                .filter(Boolean)
        )
    ].sort((a, b) => a.localeCompare(b));

    return (
        <div className="pilot-management booking-list">
            <div className="booking-header">
                <h1>Pilot Management</h1>

                <button
                    type="button"
                    className="new-booking-btn"
                    onClick={() => {
                        setForm({ ...emptyPilot });
                        setEditingId(null);
                        setShowForm(true);
                        setOpenFilter(null);
                    }}
                >
                    + New Pilot
                </button>
            </div>

            {showForm ? (
                <div className="pilot-form-card">
                    <h2>{editingId !== null ? "Edit Pilot" : "New Pilot"}</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="pilot-form-grid">
                            {[
                                ["fullName", "Full Name", true],
                                ["mobileNumber", "Mobile Number", true],
                                ["email", "Email"],
                                ["aadhaarOrIdProof", "Aadhaar / ID Proof"],
                                ["village", "Village"],
                                ["mandal", "Mandal"],
                                ["district", "District"],
                                ["state", "State"],
                                ["address", "Address"],
                                ["profilePhotoUrl", "Profile Photo URL"]
                            ].map(([name, label, required]) => (
                                <div className="form-group" key={name}>
                                    <label>
                                        {label}{required ? " *" : ""}
                                    </label>

                                    {name === "address" ? (
                                        <textarea
                                            name={name}
                                            value={form[name]}
                                            onChange={handleChange}
                                            rows="2"
                                        />
                                    ) : (
                                        <input
                                            type={name === "email" ? "email" : "text"}
                                            name={name}
                                            value={form[name]}
                                            onChange={handleChange}
                                            required={Boolean(required)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="pilot-form-actions">
                            <button
                                type="submit"
                                className="new-booking-btn"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId !== null
                                        ? "Update Pilot"
                                        : "Save Pilot"}
                            </button>

                            <button
                                type="button"
                                className="pilot-cancel-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="pilot-list-card">
                    <div className="pilot-filter-toolbar">
                        <span>
                            Pilots ({filteredPilots.length})
                        </span>

                        <button
                            type="button"
                            className="pilot-clear-filters"
                            onClick={clearFilters}
                            disabled={!hasActiveFilters}
                        >
                            Clear Filters
                        </button>
                    </div>

                    <div className="pilot-table-container">
                        <table className="booking-table pilot-table">
                            <thead>
                                <tr>
                                    <th>Actions</th>

                                    {filterColumns.map(({ key, label }) => (
                                        <th key={key}>
                                            <div className="pilot-th-content">
                                                <span>{label}</span>

                                                <button
                                                    type="button"
                                                    className={`pilot-filter-icon ${filters[key]
                                                            ? "active"
                                                            : ""
                                                        }`}
                                                    title={`Filter ${label}`}
                                                    aria-label={`Filter ${label}`}
                                                    aria-expanded={openFilter === key}
                                                    onClick={() =>
                                                        setOpenFilter(
                                                            openFilter === key
                                                                ? null
                                                                : key
                                                        )
                                                    }
                                                >
                                                    <FilterIcon />
                                                </button>
                                            </div>

                                            {openFilter === key && (
                                                <div className="pilot-filter-dropdown">
                                                    <label>
                                                        Filter by {label}
                                                    </label>

                                                    <select
                                                        value={filters[key]}
                                                        onChange={(e) =>
                                                            updateFilter(
                                                                key,
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            All {label}
                                                        </option>

                                                        {getFilterOptions(key).map(
                                                            (option) => (
                                                                <option
                                                                    key={option}
                                                                    value={option}
                                                                >
                                                                    {option}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateFilter(key, "")
                                                        }
                                                    >
                                                        Clear this filter
                                                    </button>
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="9" className="pilot-empty">
                                            Loading pilots...
                                        </td>
                                    </tr>
                                ) : filteredPilots.length > 0 ? (
                                    filteredPilots.map((pilot) => (
                                        <tr key={pilot.id}>
                                            <td className="action-cell">
                                                <div className="action-buttons">
                                                    <button
                                                        type="button"
                                                        className="edit-btn"
                                                        title="Edit"
                                                        onClick={() =>
                                                            handleEdit(pilot)
                                                        }
                                                    >
                                                        ✎
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="delete-btn"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(pilot.id)
                                                        }
                                                    >
                                                        🗑
                                                    </button>
                                                </div>
                                            </td>

                                            <td>{pilot.fullName}</td>
                                            <td>{pilot.mobileNumber}</td>
                                            <td>{pilot.email || "-"}</td>
                                            <td>{pilot.aadhaarOrIdProof || "-"}</td>
                                            <td>{pilot.village || "-"}</td>
                                            <td>{pilot.mandal || "-"}</td>
                                            <td>{pilot.district || "-"}</td>
                                            <td>{pilot.state || "-"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="pilot-empty">
                                            No pilots match the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
