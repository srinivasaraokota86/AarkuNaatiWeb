import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaFilter } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./PaymentList.css";
import {
    FaAngleDoubleLeft,
    FaAngleLeft,
    FaAngleRight,
    FaAngleDoubleRight
} from "react-icons/fa";

const FILTER_FIELDS = [
    { key: "procurementId", label: "Procurement ID" },
    { key: "procurementDate", label: "Date" },
    { key: "farmerName", label: "Farmer" },
    { key: "farmerCode", label: "Farmer Code" },
    { key: "commodity", label: "Commodity" },
    { key: "quantity", label: "Quantity (Kg)" },
    { key: "unit", label: "Unit" }
];

const EMPTY_FILTERS = {
    procurementId: [],
    procurementDate: [],
    farmerName: [],
    farmerCode: [],
    commodity: [],
    quantity: [],
    unit: []
};

export default function ProcurementList() {
    const navigate = useNavigate();

    const [procurements, setProcurements] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const pageSize = 20;

    // =========================================================
    // ACUMATICA-STYLE FILTER
    // =========================================================
    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedFilterValues, setSelectedFilterValues] = useState([]);
    const [filterSearch, setFilterSearch] = useState("");
    const [filterPosition, setFilterPosition] = useState({
        top: 0,
        left: 0
    });

    const [filters, setFilters] = useState(EMPTY_FILTERS);

    // =========================================================
    // LOAD PROCUREMENT
    // =========================================================
    const loadProcurements = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "https://localhost:7130/api/Procurements"
            );

            console.log("Procurement Data:", response.data);

            if (Array.isArray(response.data)) {
                setProcurements(response.data);
            } else if (Array.isArray(response.data?.data)) {
                setProcurements(response.data.data);
            } else {
                setProcurements([]);
            }
        } catch (error) {
            console.error("Error loading procurements:", error);
            alert("Unable to load procurement records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProcurements();
    }, []);

    // =========================================================
    // DELETE
    // =========================================================
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this procurement?")) {
            return;
        }

        try {
            await axios.delete(
                `https://localhost:7130/api/Procurements/${id}`
            );

            alert("Deleted Successfully");
            loadProcurements();
        } catch (error) {
            console.error(error);
            alert("Delete Failed");
        }
    };

    // =========================================================
    // DISPLAY VALUE
    // =========================================================
    const getFieldValue = (item, field) => {
        switch (field) {
            case "procurementId":
                return String(item.procurementId ?? "");

            case "procurementDate":
                return item.procurementDate
                    ? new Date(item.procurementDate).toLocaleDateString("en-IN")
                    : "";

            case "farmerName":
                return String(item.farmerName ?? "");

            case "farmerCode":
                return String(item.farmerCode ?? "");

            case "commodity":
                return String(item.commodity ?? "");

            case "quantity":
                return String(item.quantity ?? "");

            case "unit":
                return String(item.unit ?? "");

            default:
                return "";
        }
    };

    // =========================================================
    // UNIQUE VALUES FOR EACH FILTER
    // =========================================================
    const getUniqueValues = (field) => {
        const values = procurements
            .map((item) => getFieldValue(item, field).trim())
            .filter((value) => value !== "");

        return [...new Set(values)].sort((a, b) =>
            a.localeCompare(b, undefined, {
                numeric: true,
                sensitivity: "base"
            })
        );
    };

    const filterOptions = useMemo(() => {
        if (!activeFilter) {
            return [];
        }

        const search = filterSearch.trim().toLowerCase();

        return getUniqueValues(activeFilter).filter((value) =>
            value.toLowerCase().includes(search)
        );
    }, [procurements, activeFilter, filterSearch]);

    // =========================================================
    // OPEN FILTER
    // =========================================================
    const openFilter = (field, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const popupWidth = 280;
        const popupHeight = 440;
        const gap = 4;

        let left = rect.left - popupWidth + rect.width;
        let top = rect.bottom + gap;

        if (left < 8) {
            left = 8;
        }

        if (left + popupWidth > window.innerWidth - 8) {
            left = window.innerWidth - popupWidth - 8;
        }

        if (top + popupHeight > window.innerHeight - 8) {
            top = Math.max(8, rect.top - popupHeight - gap);
        }

        setActiveFilter(field);
        setSelectedFilterValues(filters[field] || []);
        setFilterSearch("");
        setFilterPosition({ top, left });
    };

    // =========================================================
    // SELECT / UNSELECT VALUE
    // =========================================================
    const toggleFilterValue = (value) => {
        setSelectedFilterValues((previous) => {
            if (previous.includes(value)) {
                return previous.filter((item) => item !== value);
            }

            return [...previous, value];
        });
    };

    // =========================================================
    // SELECT ALL VISIBLE VALUES
    // =========================================================
    const toggleSelectAll = () => {
        setSelectedFilterValues((previous) => {
            const allVisibleSelected =
                filterOptions.length > 0 &&
                filterOptions.every((value) => previous.includes(value));

            if (allVisibleSelected) {
                return previous.filter(
                    (value) => !filterOptions.includes(value)
                );
            }

            return [...new Set([...previous, ...filterOptions])];
        });
    };

    // =========================================================
    // CLEAR CURRENT FILTER
    // =========================================================
    const clearCurrentFilter = () => {
        if (!activeFilter) {
            return;
        }

        setFilters((previous) => ({
            ...previous,
            [activeFilter]: []
        }));

        setSelectedFilterValues([]);
        setFilterSearch("");
        setPage(1);
        setActiveFilter(null);
    };

    // =========================================================
    // APPLY CURRENT FILTER
    // =========================================================
    const applyFilter = () => {
        if (!activeFilter) {
            return;
        }

        setFilters((previous) => ({
            ...previous,
            [activeFilter]: selectedFilterValues
        }));

        setPage(1);
        setActiveFilter(null);
        setFilterSearch("");
    };

    // =========================================================
    // CLEAR ALL FILTERS
    // =========================================================
    const clearAllFilters = () => {
        setFilters(EMPTY_FILTERS);
        setSelectedFilterValues([]);
        setFilterSearch("");
        setPage(1);
        setActiveFilter(null);
    };

    // =========================================================
    // CHECK FILTER
    // =========================================================
    const hasFilter = (field) => {
        return filters[field]?.length > 0;
    };

    const anyFilterApplied = Object.values(filters).some(
        (values) => values.length > 0
    );

    // =========================================================
    // FILTER DATA
    // =========================================================
    const filteredProcurements = useMemo(() => {
        return procurements.filter((item) => {
            return FILTER_FIELDS.every(({ key }) => {
                const selectedValues = filters[key];

                if (!selectedValues || selectedValues.length === 0) {
                    return true;
                }

                const itemValue = getFieldValue(item, key).trim();

                return selectedValues.some(
                    (selectedValue) =>
                        itemValue.toLowerCase() === selectedValue.toLowerCase()
                );
            });
        });
    }, [procurements, filters]);

    // =========================================================
    // PAGINATION
    // =========================================================
    const totalRecords = filteredProcurements.length;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentProcurements = filteredProcurements.slice(
        startIndex,
        endIndex
    );

    const goFirst = () => setPage(1);

    const goPrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const goLast = () => {
        if (totalPages > 0) {
            setPage(totalPages);
        }
    };

    // =========================================================
    // FILTER LABEL
    // =========================================================
    const activeFilterLabel =
        FILTER_FIELDS.find((field) => field.key === activeFilter)?.label ||
        "";

    const allVisibleSelected =
        filterOptions.length > 0 &&
        filterOptions.every((value) => selectedFilterValues.includes(value));

    // =========================================================
    // UI
    // =========================================================
    return (
        <div className="list-container">
            {/* =================================================
                TOP BAR
            ================================================= */}
            <div className="top-bar">
                <div className="payment-list-top">

                <div className="procurement-top-buttons">
                    <button
                        className="add-payment-btn"
                        onClick={() => navigate("/procurement/create")}
                    >
                        <FaPlus />
                        Add Procurement
                    </button>
                </div>
                </div>
            </div>

            {/* =================================================
                ACTIVE FILTER BAR
            ================================================= */}
            {anyFilterApplied && (
                <div className="active-filter-bar">
                    <span>Filters Applied</span>

                    <button onClick={clearAllFilters}>
                        Clear All
                    </button>
                </div>
            )}

            {/* =================================================
                TABLE
            ================================================= */}
            <div className="table-container">
                <table className="list-table">
                    <thead>
                        <tr>
                            <th className="action-column">
                               
                            </th>

                            {FILTER_FIELDS.map((field) => (
                                <th key={field.key}>
                                    <div className="th-content">
                                        <span>{field.label}</span>

                                        <button
                                            type="button"
                                            className={
                                                hasFilter(field.key)
                                                    ? "filter-btn active"
                                                    : "filter-btn"
                                            }
                                            onClick={(event) =>
                                                openFilter(field.key, event)
                                            }
                                            data-tooltip={`Filter ${field.label}`}
                                            aria-label={`Filter ${field.label}`}
                                        >
                                            <FaFilter />
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8" className="no-data">
                                    Loading procurements...
                                </td>
                            </tr>
                        ) : currentProcurements.length > 0 ? (
                            currentProcurements.map((item) => (
                                <tr key={item.procurementId}>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-btn icon-tooltip"
                                                title="Edit"
                                                data-tooltip="Edit"
                                                onClick={() =>
                                                    navigate(
                                                        "/procurement/create",
                                                        { state: item }
                                                    )
                                                }
                                                >
                                                <FaEdit />
                                                </button>

                                            <button
                                                className="delete-btn icon-tooltip"
                                                title="Delete"
                                                data-tooltip="Delete"
                                                onClick={() =>
                                                    handleDelete(
                                                        item.procurementId
                                                    )
                                                }
                                                >
                                            <FaTrash />
                                            </button>
                                        </div>
                                    </td>

                                    <td>{item.procurementId}</td>

                                    <td>
                                        {item.procurementDate
                                            ? new Date(
                                                item.procurementDate
                                            ).toLocaleDateString("en-IN")
                                            : "-"}
                                    </td>

                                    <td>{item.farmerName}</td>
                                    <td>{item.farmerCode}</td>
                                    <td>{item.commodity}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unit}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="no-data">
                                    No Procurement Records Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* =================================================
                ACUMATICA-STYLE FILTER POPUP
            ================================================= */}
            {activeFilter && (
                <div className="filter-overlay">
                    <div
                        className="filter-popup"
                        style={{
                            top: `${filterPosition.top}px`,
                            left: `${filterPosition.left}px`
                        }}
                    >
                        <div className="filter-popup-header">
                            <span>Filter {activeFilterLabel}</span>

                            <button
                                type="button"
                                onClick={() => setActiveFilter(null)}
                                title="Close"
                            >
                                ×
                            </button>
                        </div>

                        <div className="filter-popup-search">
                            <input
                                type="text"
                                value={filterSearch}
                                onChange={(event) =>
                                    setFilterSearch(event.target.value)
                                }
                                placeholder="Search..."
                                autoFocus
                            />
                        </div>

                        <div className="filter-select-actions">
                            <button
                                type="button"
                                onClick={toggleSelectAll}
                            >
                                {allVisibleSelected
                                    ? "Unselect All"
                                    : "Select All"}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedFilterValues([])
                                }
                            >
                                Clear
                            </button>
                        </div>

                        <div className="filter-options">
                            {filterOptions.length > 0 ? (
                                filterOptions.map((value) => {
                                    const checked =
                                        selectedFilterValues.includes(value);

                                    return (
                                        <label
                                            className="filter-option"
                                            key={value}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() =>
                                                    toggleFilterValue(value)
                                                }
                                            />

                                            <span>{value}</span>
                                        </label>
                                    );
                                })
                            ) : (
                                <div className="filter-no-values">
                                    No values found
                                </div>
                            )}
                        </div>

                        <div className="filter-popup-actions">
                            <button
                                type="button"
                                className="clear-filter-btn"
                                onClick={clearCurrentFilter}
                            >
                                Clear
                            </button>

                            <button
                                type="button"
                                className="apply-filter-btn"
                                onClick={applyFilter}
                            >
                                ✓ Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* =================================================
    PAGINATION
================================================= */}
            <div className="pagination-container">

                {/* LEFT - RECORD INFORMATION */}
                <div className="record-info">
                    Records{" "}
                    {totalRecords === 0 ? 0 : startIndex + 1}
                    {" - "}
                    {Math.min(endIndex, totalRecords)}
                    {" of "}
                    {totalRecords}
                </div>

                {/* RIGHT - PAGINATION */}
                <div className="pagination-buttons">

                    {/* FIRST */}
                    <button
                        className="pagination-icon-btn"
                        onClick={goFirst}
                        disabled={page === 1 || totalPages === 0}
                    >
                        <FaAngleDoubleLeft />
                        <span className="icon-tooltip">First</span>
                    </button>

                    {/* PREVIOUS */}
                    <button
                        className="pagination-icon-btn"
                        onClick={goPrevious}
                        disabled={page === 1 || totalPages === 0}
                    >
                        <FaAngleLeft />
                        <span className="icon-tooltip">Previous</span>
                    </button>

                    {/* PAGE */}
                    <span className="page-number">
                        Page {totalPages === 0 ? 0 : page} / {totalPages}
                    </span>

                    {/* NEXT */}
                    <button
                        className="pagination-icon-btn"
                        onClick={goNext}
                        disabled={
                            page === totalPages || totalPages === 0
                        }
                    >
                        <FaAngleRight />
                        <span className="icon-tooltip">Next</span>
                    </button>

                    {/* LAST */}
                    <button
                        className="pagination-icon-btn"
                        onClick={goLast}
                        disabled={
                            page === totalPages || totalPages === 0
                        }
                    >
                        <FaAngleDoubleRight />
                        <span className="icon-tooltip">Last</span>
                    </button>

                </div>
            </div>
        </div>
    );
}
