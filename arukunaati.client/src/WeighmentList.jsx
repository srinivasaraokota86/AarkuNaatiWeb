import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./WeighmentList.css";
import {
    FaEdit,
    FaTrash,
    FaFilter,
    FaAngleDoubleLeft,
    FaAngleLeft,
    FaAngleRight,
    FaAngleDoubleRight
} from "react-icons/fa";

const FILTER_FIELDS = [
    { key: "weighmentId", label: "ID" },
    { key: "token", label: "Token" },
    { key: "grossWeight", label: "Gross Weight (Kg)" },
    { key: "tareWeight", label: "Tare Weight (Kg)" },
    { key: "netWeight", label: "Net Weight (Kg)" },
    { key: "noOfBags", label: "No. Of Bags" },
    { key: "weightSlipNo", label: "Weight Slip No" },
    { key: "weighBridge", label: "Weigh Bridge" }
];

const EMPTY_FILTERS = {
    weighmentId: [],
    token: [],
    grossWeight: [],
    tareWeight: [],
    netWeight: [],
    noOfBags: [],
    weightSlipNo: [],
    weighBridge: []
};

export default function WeighmentList() {
    const navigate = useNavigate();

    const [weighments, setWeighments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const pageSize = 20;

    // Acumatica-style filter popup
    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedFilterValues, setSelectedFilterValues] = useState([]);
    const [filterSearch, setFilterSearch] = useState("");
    const [filterPosition, setFilterPosition] = useState({
        top: 0,
        left: 0
    });

    const [filters, setFilters] = useState(EMPTY_FILTERS);

    // =========================================================
    // LOAD WEIGHMENTS
    // =========================================================

    useEffect(() => {
        loadWeighments();
    }, []);

    const loadWeighments = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "https://localhost:7130/api/Weighment"
            );

            console.log("Weighment Data:", response.data);

            if (Array.isArray(response.data)) {
                setWeighments(response.data);
            } else if (Array.isArray(response.data?.data)) {
                setWeighments(response.data.data);
            } else {
                setWeighments([]);
            }
        } catch (error) {
            console.error("Error loading weighments:", error);
            alert("Unable to load Weighment records.");
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) {
            return;
        }

        try {
            await axios.delete(
                `https://localhost:7130/api/Weighment/${id}`
            );

            alert("Deleted Successfully");
            loadWeighments();
        } catch (error) {
            console.error(error);
            alert("Delete Failed");
        }
    };

    // =========================================================
    // GET FIELD VALUE
    // =========================================================

    const getFieldValue = (item, field) => {
        switch (field) {
            case "weighmentId":
                return String(item.weighmentId ?? "");

            case "token":
                return String(item.token ?? "");

            case "grossWeight":
                return String(item.grossWeight ?? "");

            case "tareWeight":
                return String(item.tareWeight ?? "");

            case "netWeight":
                return String(item.netWeight ?? "");

            case "noOfBags":
                return String(item.noOfBags ?? "");

            case "weightSlipNo":
                return String(item.weightSlipNo ?? "");

            case "weighBridge":
                return String(item.weighBridge ?? "");

            default:
                return "";
        }
    };

    // =========================================================
    // UNIQUE VALUES FOR FILTER
    // =========================================================

    const getUniqueValues = (field) => {
        const values = weighments
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
        if (!activeFilter) return [];

        const search = filterSearch.trim().toLowerCase();

        return getUniqueValues(activeFilter).filter((value) =>
            value.toLowerCase().includes(search)
        );
    }, [weighments, activeFilter, filterSearch]);

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
    // FILTER SELECTION
    // =========================================================

    const toggleFilterValue = (value) => {
        setSelectedFilterValues((previous) => {
            if (previous.includes(value)) {
                return previous.filter((item) => item !== value);
            }

            return [...previous, value];
        });
    };

    const toggleSelectAll = () => {
        setSelectedFilterValues((previous) => {
            const allSelected =
                filterOptions.length > 0 &&
                filterOptions.every((value) => previous.includes(value));

            if (allSelected) {
                return previous.filter(
                    (value) => !filterOptions.includes(value)
                );
            }

            return [...new Set([...previous, ...filterOptions])];
        });
    };

    const applyFilter = () => {
        if (!activeFilter) return;

        setFilters((previous) => ({
            ...previous,
            [activeFilter]: selectedFilterValues
        }));

        setPage(1);
        setActiveFilter(null);
        setFilterSearch("");
    };

    const clearCurrentFilter = () => {
        if (!activeFilter) return;

        setFilters((previous) => ({
            ...previous,
            [activeFilter]: []
        }));

        setSelectedFilterValues([]);
        setFilterSearch("");
        setPage(1);
        setActiveFilter(null);
    };

    const clearAllFilters = () => {
        setFilters(EMPTY_FILTERS);
        setSelectedFilterValues([]);
        setFilterSearch("");
        setPage(1);
        setActiveFilter(null);
    };

    const hasFilter = (field) => {
        return filters[field]?.length > 0;
    };

    const anyFilterApplied = Object.values(filters).some(
        (values) => values.length > 0
    );

    // =========================================================
    // FILTER DATA
    // =========================================================

    const filteredData = useMemo(() => {
        return weighments.filter((item) => {
            return FILTER_FIELDS.every(({ key }) => {
                const selectedValues = filters[key];

                if (!selectedValues || selectedValues.length === 0) {
                    return true;
                }

                const itemValue = getFieldValue(item, key).trim();

                return selectedValues.some(
                    (selectedValue) =>
                        itemValue.toLowerCase() ===
                        selectedValue.toLowerCase()
                );
            });
        });
    }, [weighments, filters]);

    // =========================================================
    // PAGINATION
    // =========================================================

    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentData = filteredData.slice(startIndex, endIndex);

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

    const activeFilterLabel =
        FILTER_FIELDS.find((field) => field.key === activeFilter)?.label || "";

    const allVisibleSelected =
        filterOptions.length > 0 &&
        filterOptions.every((value) =>
            selectedFilterValues.includes(value)
        );

    return (
        <div className="list-container">

            {/* =================================================
                TOP CARD
            ================================================= */}

            <div className="list-card">

                <div className="header">
                    <div></div>

                    <button
                        className="add-btn"
                        onClick={() => navigate("/weighment")}
                    >
                        + Add Weighment
                    </button>
                </div>

                {/* =================================================
                    ACTIVE FILTER BAR
                ================================================= */}

                {anyFilterApplied && (
                    <div className="active-filter-bar">
                        <span>Filters Applied</span>

                        <button
                            type="button"
                            onClick={clearAllFilters}
                        >
                            Clear All
                        </button>
                    </div>
                )}

                {/* =================================================
                    TABLE
                ================================================= */}

                <div className="table-container">
                    <table>

                        <thead>
                            <tr>

                                <th className="action-column">
                                    
                                </th>

                                {FILTER_FIELDS.map((field) => (
                                    <th key={field.key}>
                                        <div className="th-content">

                                            <span>
                                                {field.label}
                                            </span>

                                            <button
                                                type="button"
                                                className={
                                                    hasFilter(field.key)
                                                        ? "filter-btn active"
                                                        : "filter-btn"
                                                }
                                                onClick={(event) =>
                                                    openFilter(
                                                        field.key,
                                                        event
                                                    )
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
                                    <td
                                        colSpan="9"
                                        className="no-data"
                                    >
                                        Loading Weighment records...
                                    </td>
                                </tr>
                            ) : currentData.length > 0 ? (
                                currentData.map((item) => (
                                    <tr key={item.weighmentId}>

                                        <td className="action-icons">

                                            <button
                                                className="edit-btn icon-tooltip"
                                                title="Edit"
                                                data-tooltip="Edit"
                                                onClick={() =>
                                                    navigate(
                                                        "/weighment",
                                                        {
                                                            state: item
                                                        }
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
                                                        item.weighmentId
                                                    )
                                                }
                                            >
                                                <FaTrash />
                                            </button>

                                        </td>

                                        <td>{item.weighmentId}</td>
                                        <td>{item.token}</td>
                                        <td>{item.grossWeight}</td>
                                        <td>{item.tareWeight}</td>
                                        <td>{item.netWeight}</td>
                                        <td>{item.noOfBags}</td>
                                        <td>{item.weightSlipNo}</td>
                                        <td>{item.weighBridge}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="no-data"
                                    >
                                        No Records Found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                </div>

                {/* =================================================
                    PAGINATION
                ================================================= */}

                <div className="pagination-container">

                    <div className="record-info">
                        Records{" "}
                        {totalRecords === 0
                            ? 0
                            : startIndex + 1}
                        {" - "}
                        {Math.min(endIndex, totalRecords)}
                        {" of "}
                        {totalRecords}
                    </div>

                    <div className="pagination-buttons">

                        <button
                            type="button"
                            className="pagination-icon-btn"
                            onClick={goFirst}
                            disabled={page === 1 || totalPages === 0}
                            data-tooltip="First Page"
                            aria-label="First Page"
                        >
                            <FaAngleDoubleLeft />
                        </button>

                        <button
                            type="button"
                            className="pagination-icon-btn"
                            onClick={goPrevious}
                            disabled={page === 1 || totalPages === 0}
                            data-tooltip="Previous Page"
                            aria-label="Previous Page"
                        >
                            <FaAngleLeft />
                        </button>

                        <span className="page-number">
                            Page {totalPages === 0 ? 0 : page}
                            {" / "}
                            {totalPages}
                        </span>

                        <button
                            type="button"
                            className="pagination-icon-btn"
                            onClick={goNext}
                            disabled={
                                page === totalPages ||
                                totalPages === 0
                            }
                            data-tooltip="Next Page"
                            aria-label="Next Page"
                        >
                            <FaAngleRight />
                        </button>

                        <button
                            type="button"
                            className="pagination-icon-btn"
                            onClick={goLast}
                            disabled={
                                page === totalPages ||
                                totalPages === 0
                            }
                            data-tooltip="Last Page"
                            aria-label="Last Page"
                        >
                            <FaAngleDoubleRight />
                        </button>

                    </div>

                </div>

            </div>

            {/* =================================================
                ACUMATICA FILTER POPUP
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

                            <span>
                                Filter {activeFilterLabel}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveFilter(null)
                                }
                                aria-label="Close filter"
                            >
                                ×
                            </button>

                        </div>

                        <div className="filter-popup-search">

                            <input
                                type="text"
                                value={filterSearch}
                                onChange={(event) =>
                                    setFilterSearch(
                                        event.target.value
                                    )
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
                                filterOptions.map((value) => (
                                    <label
                                        className="filter-option"
                                        key={value}
                                    >

                                        <input
                                            type="checkbox"
                                            checked={selectedFilterValues.includes(
                                                value
                                            )}
                                            onChange={() =>
                                                toggleFilterValue(
                                                    value
                                                )
                                            }
                                        />

                                        <span>{value}</span>

                                    </label>
                                ))
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

        </div>
    );
}
