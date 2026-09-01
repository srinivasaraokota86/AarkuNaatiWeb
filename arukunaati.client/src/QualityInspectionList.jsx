import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
    FaEdit,
    FaTrash,
    FaFilter,
    FaPlus,
    FaAngleDoubleLeft,
    FaAngleLeft,
    FaAngleRight,
    FaAngleDoubleRight
} from "react-icons/fa";

import "./QualityInspectionList.css";


/* =========================================================
   FILTER FIELDS
========================================================= */

const FILTER_FIELDS = [
    { key: "qualityInspectionId", label: "ID" },
    { key: "procurementId", label: "Procurement ID" },
    { key: "moisture", label: "Moisture (%)" },
    { key: "size", label: "Size" },
    { key: "damage", label: "Damage (%)" },
    { key: "color", label: "Color" },
    { key: "ripeness", label: "Ripeness" },
    { key: "foreignMaterial", label: "Foreign Material (%)" },
    { key: "qualityGrade", label: "Quality Grade" },
    { key: "inspector", label: "Inspector" }
];


/* =========================================================
   EMPTY FILTERS
========================================================= */

const EMPTY_FILTERS = {
    qualityInspectionId: [],
    procurementId: [],
    moisture: [],
    size: [],
    damage: [],
    color: [],
    ripeness: [],
    foreignMaterial: [],
    qualityGrade: [],
    inspector: []
};


/* =========================================================
   COMPONENT
========================================================= */

export default function QualityInspectionList() {

    const navigate = useNavigate();


    /* =====================================================
       DATA
    ===================================================== */

    const [qualityInspections, setQualityInspections] = useState([]);
    const [loading, setLoading] = useState(false);


    /* =====================================================
       PAGINATION
    ===================================================== */

    const [page, setPage] = useState(1);

    const pageSize = 20;


    /* =====================================================
       FILTER STATE
    ===================================================== */

    const [activeFilter, setActiveFilter] = useState(null);

    const [selectedFilterValues, setSelectedFilterValues] =
        useState([]);

    const [filterSearch, setFilterSearch] = useState("");

    const [filterPosition, setFilterPosition] = useState({
        top: 0,
        left: 0
    });

    const [filters, setFilters] = useState(EMPTY_FILTERS);


    /* =====================================================
       LOAD QUALITY INSPECTION DATA
    ===================================================== */

    const loadQualityInspections = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                "https://localhost:7130/api/QualityInspection"
            );

            console.log(
                "Quality Inspection Data:",
                response.data
            );


            if (Array.isArray(response.data)) {

                setQualityInspections(response.data);

            } else if (
                Array.isArray(response.data?.data)
            ) {

                setQualityInspections(
                    response.data.data
                );

            } else {

                setQualityInspections([]);

            }

        } catch (error) {

            console.error(
                "Error loading quality inspections:",
                error
            );

            alert(
                "Unable to load Quality Inspection records."
            );

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       LOAD ON PAGE LOAD
    ===================================================== */

    useEffect(() => {

        loadQualityInspections();

    }, []);


    /* =====================================================
       DELETE
    ===================================================== */

    const deleteQualityInspection = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this record?"
        );

        if (!confirmDelete) return;


        try {

            await axios.delete(
                `https://localhost:7130/api/QualityInspection/${id}`
            );

            alert(
                "Quality Inspection Deleted Successfully!"
            );

            loadQualityInspections();


        } catch (error) {

            console.error(error);

            alert("Delete Failed.");

        }

    };


    /* =====================================================
       GET FIELD VALUE
    ===================================================== */

    const getFieldValue = (item, field) => {

        switch (field) {

            case "qualityInspectionId":
                return String(
                    item.qualityInspectionId ?? ""
                );

            case "procurementId":
                return String(
                    item.procurementId ?? ""
                );

            case "moisture":
                return String(
                    item.moisture ?? ""
                );

            case "size":
                return String(
                    item.size ?? ""
                );

            case "damage":
                return String(
                    item.damage ?? ""
                );

            case "color":
                return String(
                    item.color ?? ""
                );

            case "ripeness":
                return String(
                    item.ripeness ?? ""
                );

            case "foreignMaterial":
                return String(
                    item.foreignMaterial ?? ""
                );

            case "qualityGrade":
                return String(
                    item.qualityGrade ?? ""
                );

            case "inspector":
                return String(
                    item.inspector ?? ""
                );

            default:
                return "";
        }

    };


    /* =====================================================
       UNIQUE FILTER VALUES
    ===================================================== */

    const getUniqueValues = (field) => {

        const values = qualityInspections

            .map((item) =>
                getFieldValue(item, field).trim()
            )

            .filter(
                (value) => value !== ""
            );


        return [
            ...new Set(values)
        ].sort(
            (a, b) =>
                a.localeCompare(
                    b,
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                )
        );

    };


    /* =====================================================
       FILTER OPTIONS
    ===================================================== */

    const filterOptions = useMemo(() => {

        if (!activeFilter) {
            return [];
        }


        const search =
            filterSearch
                .trim()
                .toLowerCase();


        return getUniqueValues(
            activeFilter
        ).filter(
            (value) =>
                value
                    .toLowerCase()
                    .includes(search)
        );

    }, [
        qualityInspections,
        activeFilter,
        filterSearch
    ]);


    /* =====================================================
       OPEN FILTER
    ===================================================== */

    const openFilter = (
        field,
        event
    ) => {

        const rect =
            event.currentTarget.getBoundingClientRect();


        const popupWidth = 280;
        const popupHeight = 440;
        const gap = 4;


        let left =
            rect.left -
            popupWidth +
            rect.width;


        let top =
            rect.bottom +
            gap;


        /* LEFT POSITION */

        if (left < 8) {

            left = 8;

        }


        /* RIGHT POSITION */

        if (
            left + popupWidth >
            window.innerWidth - 8
        ) {

            left =
                window.innerWidth -
                popupWidth -
                8;

        }


        /* BOTTOM POSITION */

        if (
            top + popupHeight >
            window.innerHeight - 8
        ) {

            top =
                Math.max(
                    8,
                    rect.top -
                    popupHeight -
                    gap
                );

        }


        setActiveFilter(field);

        setSelectedFilterValues(
            filters[field] || []
        );

        setFilterSearch("");

        setFilterPosition({
            top,
            left
        });

    };


    /* =====================================================
       TOGGLE FILTER VALUE
    ===================================================== */

    const toggleFilterValue = (value) => {

        setSelectedFilterValues(
            (previous) => {

                if (
                    previous.includes(value)
                ) {

                    return previous.filter(
                        (item) =>
                            item !== value
                    );

                }


                return [
                    ...previous,
                    value
                ];

            }
        );

    };


    /* =====================================================
       SELECT ALL
    ===================================================== */

    const toggleSelectAll = () => {

        setSelectedFilterValues(
            (previous) => {

                const allSelected =
                    filterOptions.length > 0 &&
                    filterOptions.every(
                        (value) =>
                            previous.includes(value)
                    );


                if (allSelected) {

                    return previous.filter(
                        (value) =>
                            !filterOptions.includes(
                                value
                            )
                    );

                }


                return [
                    ...new Set([
                        ...previous,
                        ...filterOptions
                    ])
                ];

            }
        );

    };


    /* =====================================================
       APPLY FILTER
    ===================================================== */

    const applyFilter = () => {

        if (!activeFilter) {
            return;
        }


        setFilters(
            (previous) => ({
                ...previous,
                [activeFilter]:
                    selectedFilterValues
            })
        );


        setPage(1);

        setActiveFilter(null);

        setFilterSearch("");

    };


    /* =====================================================
       CLEAR CURRENT FILTER
    ===================================================== */

    const clearCurrentFilter = () => {

        if (!activeFilter) {
            return;
        }


        setFilters(
            (previous) => ({
                ...previous,
                [activeFilter]: []
            })
        );


        setSelectedFilterValues([]);

        setFilterSearch("");

        setPage(1);

        setActiveFilter(null);

    };


    /* =====================================================
       CLEAR ALL FILTERS
    ===================================================== */

    const clearAllFilters = () => {

        setFilters({
            ...EMPTY_FILTERS
        });

        setSelectedFilterValues([]);

        setFilterSearch("");

        setPage(1);

        setActiveFilter(null);

    };


    /* =====================================================
       CHECK FILTER
    ===================================================== */

    const hasFilter = (field) => {

        return (
            filters[field]?.length > 0
        );

    };


    /* =====================================================
       CHECK ANY FILTER
    ===================================================== */

    const anyFilterApplied =
        Object.values(filters).some(
            (values) =>
                values.length > 0
        );


    /* =====================================================
       FILTER DATA
    ===================================================== */

    const filteredQualityInspections =
        useMemo(() => {

            return qualityInspections.filter(
                (item) => {

                    return FILTER_FIELDS.every(
                        ({ key }) => {

                            const selectedValues =
                                filters[key];


                            if (
                                !selectedValues ||
                                selectedValues.length === 0
                            ) {

                                return true;

                            }


                            const itemValue =
                                getFieldValue(
                                    item,
                                    key
                                ).trim();


                            return selectedValues.some(
                                (selectedValue) =>
                                    itemValue
                                        .toLowerCase() ===
                                    selectedValue
                                        .toLowerCase()
                            );

                        }
                    );

                }
            );

        }, [
            qualityInspections,
            filters
        ]);


    /* =====================================================
       PAGINATION
    ===================================================== */

    const totalRecords =
        filteredQualityInspections.length;


    const totalPages =
        Math.ceil(
            totalRecords / pageSize
        );


    const startIndex =
        (page - 1) * pageSize;


    const endIndex =
        startIndex + pageSize;


    const currentQualityInspections =
        filteredQualityInspections.slice(
            startIndex,
            endIndex
        );


    /* =====================================================
       PAGINATION FUNCTIONS
    ===================================================== */

    const goFirst = () => {

        setPage(1);

    };


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


    /* =====================================================
       FILTER LABEL
    ===================================================== */

    const activeFilterLabel =
        FILTER_FIELDS.find(
            (field) =>
                field.key === activeFilter
        )?.label || "";


    /* =====================================================
       SELECT ALL STATUS
    ===================================================== */

    const allVisibleSelected =
        filterOptions.length > 0 &&
        filterOptions.every(
            (value) =>
                selectedFilterValues.includes(
                    value
                )
        );


    /* =====================================================
       UI
    ===================================================== */

    return (

        <div className="list-container">


            {/* =================================================
                TOP BAR
            ================================================= */}

            <div className="top-bar">

                <div className="payment-list-top">

                    <div className="procurement-top-buttons">

                        <button
                            type="button"
                            className="add-btn"
                            onClick={() =>
                                navigate(
                                    "/quality-inspection/create"
                                )
                            }
                        >

                            <FaPlus />

                            Add Quality Inspection

                        </button>

                    </div>

                </div>

            </div>


            {/* =================================================
                ACTIVE FILTER BAR
            ================================================= */}

            {anyFilterApplied && (

                <div className="active-filter-bar">

                    <span>
                        Filters Applied
                    </span>


                    <button
                        type="button"
                        onClick={
                            clearAllFilters
                        }
                    >
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

                            {/* ACTION COLUMN */}

                            <th className="action-column">
                               
                            </th>


                            {/* FILTER HEADERS */}

                            {FILTER_FIELDS.map(
                                (field) => (

                                    <th
                                        key={
                                            field.key
                                        }
                                    >

                                        <div className="th-content">

                                            <span>
                                                {
                                                    field.label
                                                }
                                            </span>


                                            <button
                                                type="button"
                                                className={
                                                    hasFilter(
                                                        field.key
                                                    )
                                                        ? "filter-btn active"
                                                        : "filter-btn"
                                                }
                                                onClick={(
                                                    event
                                                ) =>
                                                    openFilter(
                                                        field.key,
                                                        event
                                                    )
                                                }
                                                data-tooltip={
                                                    `Filter ${field.label}`
                                                }
                                                aria-label={
                                                    `Filter ${field.label}`
                                                }
                                            >

                                                <FaFilter />

                                            </button>

                                        </div>

                                    </th>

                                )
                            )}

                        </tr>

                    </thead>


                    <tbody>

                        {/* LOADING */}

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="11"
                                    className="no-data"
                                >
                                    Loading Quality
                                    Inspection records...
                                </td>

                            </tr>

                        ) : currentQualityInspections.length >
                            0 ? (

                            /* DATA */

                            currentQualityInspections.map(
                                (item) => (

                                    <tr
                                        key={
                                            item.qualityInspectionId
                                        }
                                    >

                                        {/* ACTIONS */}

                                        <td>

                                            <div className="action-icons">

                                                {/* EDIT */}

                                                <button className="edit-btn icon-tooltip"
                                                    title="Edit"
                                                    data-tooltip="Edit"
                                                    onClick={() =>
                                                        navigate("/quality-inspection/create",
                                                            {
                                                                state: item
                                                            }
                                                        )
                                                    }
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button className="delete-btn icon-tooltip"
                                                    title="Delete"
                                                    data-tooltip="Delete"
                                                    onClick={() =>
                                                        deleteQualityInspection(
                                                            item.qualityInspectionId
                                                        )
                                                    }
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>

                                        </td>


                                        {/* DATA COLUMNS */}

                                        <td>
                                            {
                                                item.qualityInspectionId
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.procurementId
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.moisture
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.size
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.damage
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.color
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.ripeness
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.foreignMaterial
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.qualityGrade
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.inspector
                                            }
                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            /* NO DATA */

                            <tr>

                                <td
                                    colSpan="11"
                                    className="no-data"
                                >
                                    No Quality Inspection
                                    Records Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


            {/* =================================================
                FILTER POPUP
            ================================================= */}

            {activeFilter && (

                <div className="filter-overlay">

                    <div
                        className="filter-popup"
                        style={{
                            top:
                                `${filterPosition.top}px`,
                            left:
                                `${filterPosition.left}px`
                        }}
                    >


                        {/* FILTER HEADER */}

                        <div className="filter-popup-header">

                            <span>
                                Filter{" "}
                                {
                                    activeFilterLabel
                                }
                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    setActiveFilter(
                                        null
                                    )
                                }
                            >
                                ×
                            </button>

                        </div>


                        {/* SEARCH */}

                        <div className="filter-popup-search">

                            <input
                                type="text"
                                value={
                                    filterSearch
                                }
                                onChange={(event) =>
                                    setFilterSearch(
                                        event.target.value
                                    )
                                }
                                placeholder="Search..."
                                autoFocus
                            />

                        </div>


                        {/* SELECT ALL / CLEAR */}

                        <div className="filter-select-actions">

                            <button
                                type="button"
                                onClick={
                                    toggleSelectAll
                                }
                            >
                                {
                                    allVisibleSelected
                                        ? "Unselect All"
                                        : "Select All"
                                }
                            </button>


                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedFilterValues(
                                        []
                                    )
                                }
                            >
                                Clear
                            </button>

                        </div>


                        {/* FILTER OPTIONS */}

                        <div className="filter-options">

                            {filterOptions.length >
                                0 ? (

                                filterOptions.map(
                                    (value) => (

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

                                            <span>
                                                {
                                                    value
                                                }
                                            </span>

                                        </label>

                                    )
                                )

                            ) : (

                                <div className="filter-no-values">

                                    No values found

                                </div>

                            )}

                        </div>


                        {/* FILTER FOOTER */}

                        <div className="filter-popup-actions">

                            <button
                                type="button"
                                className="clear-filter-btn"
                                onClick={
                                    clearCurrentFilter
                                }
                            >
                                Clear
                            </button>


                            <button
                                type="button"
                                className="apply-filter-btn"
                                onClick={
                                    applyFilter
                                }
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


                {/* =================================================
                    LEFT - RECORD INFORMATION
                ================================================= */}

                <div className="record-info">

                    Records{" "}

                    {
                        totalRecords === 0
                            ? 0
                            : startIndex + 1
                    }

                    {" - "}

                    {
                        Math.min(
                            endIndex,
                            totalRecords
                        )
                    }

                    {" of "}

                    {totalRecords}

                </div>


                {/* =================================================
                    RIGHT - PAGINATION BUTTONS
                ================================================= */}

                <div className="pagination-buttons">


                    {/* FIRST */}

                    <button
                        type="button"
                        className="pagination-icon-btn"
                        onClick={goFirst}
                        disabled={
                            page === 1 ||
                            totalPages === 0
                        }
                        aria-label="First"
                    >

                        <FaAngleDoubleLeft />

                        <span className="icon-tooltip">
                            First
                        </span>

                    </button>


                    {/* PREVIOUS */}

                    <button
                        type="button"
                        className="pagination-icon-btn"
                        onClick={goPrevious}
                        disabled={
                            page === 1 ||
                            totalPages === 0
                        }
                        aria-label="Previous"
                    >

                        <FaAngleLeft />

                        <span className="icon-tooltip">
                            Previous
                        </span>

                    </button>


                    {/* PAGE */}

                    <span className="page-number">

                        Page{" "}

                        {
                            totalPages === 0
                                ? 0
                                : page
                        }

                        {" / "}

                        {totalPages}

                    </span>


                    {/* NEXT */}

                    <button
                        type="button"
                        className="pagination-icon-btn"
                        onClick={goNext}
                        disabled={
                            page === totalPages ||
                            totalPages === 0
                        }
                        aria-label="Next"
                    >

                        <FaAngleRight />

                        <span className="icon-tooltip">
                            Next
                        </span>

                    </button>


                    {/* LAST */}

                    <button
                        type="button"
                        className="pagination-icon-btn"
                        onClick={goLast}
                        disabled={
                            page === totalPages ||
                            totalPages === 0
                        }
                        aria-label="Last"
                    >

                        <FaAngleDoubleRight />

                        <span className="icon-tooltip">
                            Last
                        </span>

                    </button>

                </div>

            </div>

        </div>

    );

}