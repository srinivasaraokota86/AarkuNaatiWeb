//import { useEffect, useState, useRef } from "react";
//import axios from "axios";
//import "./ListScreen.css";
//import { FaEdit, FaTrash, FaFilter } from "react-icons/fa";
//import { useNavigate } from "react-router-dom";
//import {
//    FaAngleDoubleLeft,
//    FaAngleLeft,
//    FaAngleRight,
//    FaAngleDoubleRight
//} from "react-icons/fa";
////import "./PaymentList.css";

//export default function FarmersList() {

//    const [farmers, setFarmers] = useState([]);

//    const [page, setPage] = useState(1);
//    const [pageSize] = useState(20);
//    const [totalRecords, setTotalRecords] = useState(0);

//    const navigate = useNavigate();

//    // Currently opened filter
//    const [activeFilter, setActiveFilter] = useState(null);

//    // Search inside popup
//    const [filterSearch, setFilterSearch] = useState("");

//    // Temporary checkbox selections
//    const [tempSelectedValues, setTempSelectedValues] = useState([]);

//    // Applied filters
//    const [appliedFilters, setAppliedFilters] = useState({});

//    const filterPopupRef = useRef(null);


//    // =========================================================
//    // GET FARMERS
//    // =========================================================

//    async function getFarmers() {

//        try {

//            const response = await axios.get(
//                `https://localhost:7130/api/Farmers?page=${page}&pageSize=${pageSize}`
//            );

//            setFarmers(response.data.data);
//            setTotalRecords(response.data.totalRecords);

//            console.log(response.data);

//        } catch (error) {

//            console.log(error);

//        }
//    }


//    // =========================================================
//    // LOAD DATA
//    // =========================================================

//    useEffect(() => {

//        getFarmers();

//        // eslint-disable-next-line react-hooks/exhaustive-deps
//    }, [page, pageSize]);


//    // =========================================================
//    // EDIT FARMER
//    // =========================================================

//    function handleEdit(farmer) {

//        navigate("/farmers/create", {
//            state: farmer
//        });

//    }


//    // =========================================================
//    // DELETE FARMER
//    // =========================================================

//    async function handleDelete(id) {

//        if (window.confirm("Are you sure you want to delete?")) {

//            try {

//                await axios.delete(
//                    `https://localhost:7130/api/Farmers/register/${id}`
//                );

//                alert("Deleted Successfully");

//                getFarmers();

//            } catch (error) {

//                console.log(error);

//            }

//        }

//    }


//    // =========================================================
//    // COLUMN DEFINITIONS
//    // =========================================================

//    const columns = {

//        id: {
//            title: "ID",
//            getValue: (farmer) => farmer.id
//        },

//        farmerCode: {
//            title: "Farmer Code",
//            getValue: (farmer) => farmer.farmerCode
//        },

//        name: {
//            title: "Name",
//            getValue: (farmer) => farmer.name
//        },

//        mobile: {
//            title: "Mobile",
//            getValue: (farmer) => farmer.mobile
//        },

//        isActive: {
//            title: "Is Active",
//            getValue: (farmer) =>
//                farmer.isActive ? "Active" : "Inactive"
//        },

//        createdDate: {
//            title: "Created Date",
//            getValue: (farmer) =>
//                farmer.createdDate
//                    ? new Date(farmer.createdDate).toLocaleDateString()
//                    : ""
//        },

//        villageName: {
//            title: "Village",
//            getValue: (farmer) => farmer.villageName
//        },

//        mandalName: {
//            title: "Mandal",
//            getValue: (farmer) => farmer.mandalName
//        },

//        districtName: {
//            title: "District",
//            getValue: (farmer) => farmer.districtName
//        },

//        stateName: {
//            title: "State",
//            getValue: (farmer) => farmer.stateName
//        },

//        aadharNo: {
//            title: "Aadhar No",
//            getValue: (farmer) => farmer.aadharNo
//        },

//        gstno: {
//            title: "GST No",
//            getValue: (farmer) => farmer.gstno
//        },

//        pinCode: {
//            title: "Pin Code",
//            getValue: (farmer) => farmer.pinCode
//        },

//        fullAddress: {
//            title: "Full Address",
//            getValue: (farmer) => farmer.fullAddress
//        },

//        bank: {
//            title: "Bank",
//            getValue: (farmer) => farmer.bank
//        },

//        accountNo: {
//            title: "Account No",
//            getValue: (farmer) => farmer.accountNo
//        },

//        ifsc: {
//            title: "IFSC",
//            getValue: (farmer) => farmer.ifsc
//        },

//        amount: {
//            title: "Amount",
//            getValue: (farmer) => farmer.amount
//        },

//        paymentMethod: {
//            title: "Payment Method",
//            getValue: (farmer) => farmer.paymentMethod
//        },

//        referenceNo: {
//            title: "Reference No",
//            getValue: (farmer) => farmer.referenceNo
//        },

//        paymentDate: {
//            title: "Payment Date",
//            getValue: (farmer) =>
//                farmer.paymentDate
//                    ? new Date(farmer.paymentDate).toLocaleDateString()
//                    : ""
//        },

//        release: {
//            title: "Release",
//            getValue: (farmer) =>
//                farmer.release ? "Yes" : "No"
//        }
//    };


//    // =========================================================
//    // GET UNIQUE VALUES FOR COLUMN
//    // =========================================================

//    function getUniqueValues(field) {

//        if (!columns[field]) {
//            return [];
//        }

//        const values = farmers
//            .map(columns[field].getValue)
//            .filter(value =>
//                value !== null &&
//                value !== undefined &&
//                String(value).trim() !== ""
//            )
//            .map(value => String(value));

//        return [...new Set(values)].sort(
//            (a, b) => a.localeCompare(b)
//        );
//    }


//    // =========================================================
//    // OPEN FILTER
//    // =========================================================

//    function openFilter(field) {

//        if (activeFilter === field) {

//            setActiveFilter(null);
//            return;

//        }

//        setActiveFilter(field);

//        setFilterSearch("");

//        setTempSelectedValues(
//            appliedFilters[field]
//                ? [...appliedFilters[field]]
//                : []
//        );

//    }


//    // =========================================================
//    // SELECT / UNSELECT VALUE
//    // =========================================================

//    function toggleFilterValue(value) {

//        setTempSelectedValues(prev => {

//            if (prev.includes(value)) {

//                return prev.filter(item => item !== value);

//            }

//            return [...prev, value];

//        });

//    }


//    // =========================================================
//    // SELECT ALL
//    // =========================================================

//    function selectAllValues() {

//        const values = getUniqueValues(activeFilter);

//        setTempSelectedValues(values);

//    }


//    // =========================================================
//    // CLEAR TEMPORARY VALUES
//    // =========================================================

//    function clearTemporaryValues() {

//        setTempSelectedValues([]);

//    }


//    // =========================================================
//    // APPLY FILTER
//    // =========================================================

//    function applyFilter() {

//        if (!activeFilter) {
//            return;
//        }

//        setAppliedFilters(prev => {

//            const updated = {
//                ...prev
//            };

//            if (tempSelectedValues.length === 0) {

//                delete updated[activeFilter];

//            } else {

//                updated[activeFilter] = [
//                    ...tempSelectedValues
//                ];

//            }

//            return updated;

//        });

//        setActiveFilter(null);

//    }


//    // =========================================================
//    // CLEAR APPLIED FILTER
//    // =========================================================

//    function clearAppliedFilter() {

//        if (!activeFilter) {
//            return;
//        }

//        setTempSelectedValues([]);

//        setAppliedFilters(prev => {

//            const updated = {
//                ...prev
//            };

//            delete updated[activeFilter];

//            return updated;

//        });

//    }


//    // =========================================================
//    // SEARCH VALUES IN POPUP
//    // =========================================================

//    function getFilteredValues() {

//        if (!activeFilter) {
//            return [];
//        }

//        const values = getUniqueValues(activeFilter);

//        if (!filterSearch.trim()) {
//            return values;
//        }

//        return values.filter(value =>
//            value
//                .toLowerCase()
//                .includes(filterSearch.toLowerCase())
//        );

//    }


//    // =========================================================
//    // CHECK WHETHER FILTER IS ACTIVE
//    // =========================================================

//    function isFilterActive(field) {

//        return (
//            appliedFilters[field] &&
//            appliedFilters[field].length > 0
//        );

//    }


//    // =========================================================
//    // FILTER FARMERS
//    // =========================================================

//    const filteredFarmers = farmers.filter(farmer => {

//        return Object.keys(appliedFilters).every(field => {

//            const selectedValues = appliedFilters[field];

//            if (
//                !selectedValues ||
//                selectedValues.length === 0
//            ) {
//                return true;
//            }

//            const value = columns[field].getValue(farmer);

//            return selectedValues.includes(
//                String(value)
//            );

//        });

//    });


//    // =========================================================
//    // FILTER HEADER COMPONENT
//    // =========================================================

//    function FilterHeader({ field, title }) {

//        const values = getFilteredValues();

//        const isOpen = activeFilter === field;

//        const active = isFilterActive(field);

//        return (

//            <th className="filter-column-header">

//                <div className="filter-header-content">

//                    <span>
//                        {title}
//                    </span>

//                    <button
//                        type="button"
//                        className={`filter-icon-button ${active
//                                ? "filter-icon-active"
//                                : ""
//                            }`}
//                        onClick={() => openFilter(field)}
//                    >

//                        <FaFilter />

//                    </button>

//                </div>


//                {/* =================================================
//                    ACUMATICA STYLE POPUP
//                ================================================= */}

//                {isOpen && (

//                    <div
//                        className="acumatica-filter-popup"
//                        ref={filterPopupRef}
//                    >

//                        {/* POPUP TITLE */}

//                        <div className="filter-popup-header">

//                            <span>
//                                Filter {title}
//                            </span>

//                            <button
//                                type="button"
//                                className="filter-popup-close"
//                                onClick={() =>
//                                    setActiveFilter(null)
//                                }
//                            >
//                                ×
//                            </button>

//                        </div>


//                        {/* SEARCH */}

//                        <div className="filter-search-container">

//                            <input
//                                type="text"
//                                value={filterSearch}
//                                placeholder="Search..."
//                                onChange={(e) =>
//                                    setFilterSearch(
//                                        e.target.value
//                                    )
//                                }
//                                autoFocus
//                            />

//                        </div>


//                        {/* SELECT ALL / CLEAR */}

//                        <div className="filter-select-actions">

//                            <button
//                                type="button"
//                                onClick={selectAllValues}
//                            >
//                                Select All
//                            </button>

//                            <button
//                                type="button"
//                                onClick={clearTemporaryValues}
//                            >
//                                Clear
//                            </button>

//                        </div>


//                        {/* VALUES */}

//                        <div className="filter-values-list">

//                            {values.length === 0 ? (

//                                <div className="no-filter-values">
//                                    No values found
//                                </div>

//                            ) : (

//                                values.map((value, index) => (

//                                    <label
//                                        key={`${value}-${index}`}
//                                        className="filter-value-row"
//                                    >

//                                        <input
//                                            type="checkbox"
//                                            checked={tempSelectedValues.includes(
//                                                value
//                                            )}
//                                            onChange={() =>
//                                                toggleFilterValue(
//                                                    value
//                                                )
//                                            }
//                                        />

//                                        <span title={value}>
//                                            {value}
//                                        </span>

//                                    </label>

//                                ))

//                            )}

//                        </div>


//                        {/* BOTTOM BUTTONS */}

//                        <div className="filter-popup-footer">

//                            <button
//                                type="button"
//                                className="filter-bottom-clear"
//                                onClick={clearAppliedFilter}
//                            >
//                                Clear
//                            </button>

//                            <button
//                                type="button"
//                                className="filter-bottom-apply"
//                                onClick={applyFilter}
//                            >
//                                ✓ Apply
//                            </button>

//                        </div>

//                    </div>

//                )}

//            </th>

//        );

//    }


//    return (

//        <div className="list-container">


//            {/* =====================================================
//                TOP BAR
//            ===================================================== */}

//            <div className="top-bar">

//                <div className="top-row">

//                    <div className="add-btn-container">

//                        <button
//                            className="add-btn"
//                            onClick={() =>
//                                navigate("/farmers/create")
//                            }
//                        >
//                            Add Farmer
//                        </button>

//                    </div>

//                </div>

//            </div>


//            {/* =====================================================
//                TABLE
//            ===================================================== */}

//            <div className="table-container">
//                <div className="table-scroll-container">
//                <table className="list-table">

//                    <thead>

//                        <tr>

//                            <th>

//                            </th>


//                            <FilterHeader
//                                field="id"
//                                title="ID"
//                            />

//                            <FilterHeader
//                                field="farmerCode"
//                                title="Farmer Code"
//                            />

//                            <FilterHeader
//                                field="name"
//                                title="Name"
//                            />

//                            <FilterHeader
//                                field="mobile"
//                                title="Mobile"
//                            />

//                            <FilterHeader
//                                field="isActive"
//                                title="Is Active"
//                            />

//                            <FilterHeader
//                                field="createdDate"
//                                title="Created Date"
//                            />

//                            <FilterHeader
//                                field="villageName"
//                                title="Village"
//                            />

//                            <FilterHeader
//                                field="mandalName"
//                                title="Mandal"
//                            />

//                            <FilterHeader
//                                field="districtName"
//                                title="District"
//                            />

//                            <FilterHeader
//                                field="stateName"
//                                title="State"
//                            />

//                            <FilterHeader
//                                field="aadharNo"
//                                title="Aadhar No"
//                            />

//                            <FilterHeader
//                                field="gstno"
//                                title="GST No"
//                            />

//                            <FilterHeader
//                                field="pinCode"
//                                title="Pin Code"
//                            />

//                            <FilterHeader
//                                field="fullAddress"
//                                title="Full Address"
//                            />

//                            <FilterHeader
//                                field="bank"
//                                title="Bank"
//                            />

//                            <FilterHeader
//                                field="accountNo"
//                                title="Account No"
//                            />

//                            <FilterHeader
//                                field="ifsc"
//                                title="IFSC"
//                            />

//                            <FilterHeader
//                                field="amount"
//                                title="Amount"
//                            />

//                            <FilterHeader
//                                field="paymentMethod"
//                                title="Payment Method"
//                            />

//                            <FilterHeader
//                                field="referenceNo"
//                                title="Reference No"
//                            />

//                            <FilterHeader
//                                field="paymentDate"
//                                title="Payment Date"
//                            />

//                            <FilterHeader
//                                field="release"
//                                title="Release"
//                            />

//                        </tr>

//                    </thead>


//                    <tbody>

//                        {filteredFarmers.map((farmer) => (

//                            <tr key={farmer.id}>


//                                {/* ACTIONS */}

//                                <td>

//                                    <div className="action-buttons">

//                                        <button
//                                            onClick={() =>
//                                                handleEdit(farmer)
//                                            }
//                                            className="edit-btn tooltip"
//                                        >

//                                            <FaEdit />

//                                            <span className="tooltip-text">
//                                                Edit
//                                            </span>

//                                        </button>


//                                        <button
//                                            onClick={() =>
//                                                handleDelete(
//                                                    farmer.id
//                                                )
//                                            }
//                                            className="delete-btn tooltip"
//                                        >

//                                            <FaTrash />

//                                            <span className="tooltip-text">
//                                                Delete
//                                            </span>

//                                        </button>

//                                    </div>

//                                </td>


//                                <td>
//                                    {farmer.id}
//                                </td>

//                                <td>
//                                    {farmer.farmerCode}
//                                </td>

//                                <td>
//                                    {farmer.name}
//                                </td>

//                                <td>
//                                    {farmer.mobile}
//                                </td>

//                                <td className={
//                                    farmer.isActive
//                                        ? "active-text"
//                                        : "inactive-text"
//                                }>
//                                    {farmer.isActive
//                                        ? "Active"
//                                        : "Inactive"}
//                                </td>

//                                <td>
//                                    {farmer.createdDate
//                                        ? new Date(
//                                            farmer.createdDate
//                                        ).toLocaleDateString()
//                                        : ""}
//                                </td>

//                                <td>
//                                    {farmer.villageName}
//                                </td>

//                                <td>
//                                    {farmer.mandalName}
//                                </td>

//                                <td>
//                                    {farmer.districtName}
//                                </td>

//                                <td>
//                                    {farmer.stateName}
//                                </td>

//                                <td>
//                                    {farmer.aadharNo}
//                                </td>

//                                <td>
//                                    {farmer.gstno}
//                                </td>

//                                <td>
//                                    {farmer.pinCode}
//                                </td>

//                                <td>
//                                    {farmer.fullAddress}
//                                </td>

//                                <td>
//                                    {farmer.bank}
//                                </td>

//                                <td>
//                                    {farmer.accountNo}
//                                </td>

//                                <td>
//                                    {farmer.ifsc}
//                                </td>

//                                <td>
//                                    {farmer.amount}
//                                </td>

//                                <td>
//                                    {farmer.paymentMethod}
//                                </td>

//                                <td>
//                                    {farmer.referenceNo}
//                                </td>

//                                <td>
//                                    {farmer.paymentDate
//                                        ? new Date(
//                                            farmer.paymentDate
//                                        ).toLocaleDateString()
//                                        : ""}
//                                </td>

//                                <td>
//                                    {farmer.release
//                                        ? "Yes"
//                                        : "No"}
//                                </td>

//                            </tr>

//                        ))}

//                    </tbody>

//                </table>
//                </div>
//            </div>

//            {/* =====================================================
//    PAGINATION
//===================================================== */}

//            <div className="pagination-container">

//                <div className="record-count">

//                    Records{" "}

//                    {totalRecords === 0
//                        ? 0
//                        : (page - 1) * pageSize + 1}

//                    -

//                    {Math.min(
//                        page * pageSize,
//                        totalRecords
//                    )}

//                    {" "}of {totalRecords}

//                </div>


//                <div className="pagination-buttons">


//                    {/* =================================================
//            FIRST BUTTON
//        ================================================= */}

//                    <div className="pagination-tooltip">

//                        <button
//                            onClick={() => setPage(1)}
//                            disabled={page === 1}
//                        >
//                            <FaAngleDoubleLeft />
//                        </button>

//                        <span className="pagination-tooltip-text">
//                            First
//                        </span>

//                    </div>


//                    {/* =================================================
//            PREVIOUS BUTTON
//        ================================================= */}

//                    <div className="pagination-tooltip">

//                        <button
//                            onClick={() =>
//                                setPage(page - 1)
//                            }
//                            disabled={page === 1}
//                        >
//                            <FaAngleLeft />
//                        </button>

//                        <span className="pagination-tooltip-text">
//                            Previous
//                        </span>

//                    </div>


//                    {/* =================================================
//            PAGE INFORMATION
//        ================================================= */}

//                    <span className="page-info">

//                        Page {page} of{" "}

//                        {Math.max(
//                            1,
//                            Math.ceil(
//                                totalRecords / pageSize
//                            )
//                        )}

//                    </span>


//                    {/* =================================================
//            NEXT BUTTON
//        ================================================= */}

//                    <div className="pagination-tooltip">

//                        <button
//                            onClick={() =>
//                                setPage(page + 1)
//                            }
//                            disabled={
//                                page ===
//                                Math.ceil(
//                                    totalRecords / pageSize
//                                )
//                            }
//                        >
//                            <FaAngleRight />
//                        </button>

//                        <span className="pagination-tooltip-text">
//                            Next
//                        </span>

//                    </div>


//                    {/* =================================================
//            LAST BUTTON
//        ================================================= */}

//                    <div className="pagination-tooltip">

//                        <button
//                            onClick={() =>
//                                setPage(
//                                    Math.ceil(
//                                        totalRecords / pageSize
//                                    )
//                                )
//                            }
//                            disabled={
//                                page ===
//                                Math.ceil(
//                                    totalRecords / pageSize
//                                )
//                            }
//                        >
//                            <FaAngleDoubleRight />
//                        </button>

//                        <span className="pagination-tooltip-text">
//                            Last
//                        </span>

//                    </div>


//                </div>

//            </div>
//                </div>
//            );
//                    }

import { useEffect, useState } from "react";
import axios from "axios";
import "./ListScreen.css";

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

import { useNavigate } from "react-router-dom";


// =========================================================
// FARMERS LIST
// =========================================================

export default function FarmersList() {

    const navigate = useNavigate();


    // =========================================================
    // FARMER DATA
    // =========================================================

    const [farmers, setFarmers] = useState([]);


    // =========================================================
    // PAGINATION
    // =========================================================

    const [page, setPage] = useState(1);

    const pageSize = 20;

    const [totalRecords, setTotalRecords] = useState(0);


    // =========================================================
    // FILTER STATES
    // =========================================================

    const [activeFilter, setActiveFilter] = useState(null);

    const [filterSearch, setFilterSearch] = useState("");

    const [tempSelectedValues, setTempSelectedValues] =
        useState([]);

    const [appliedFilters, setAppliedFilters] =
        useState({});


    // =========================================================
    // GET FARMERS
    // =========================================================

    async function getFarmers() {

        try {

            const response = await axios.get(
                `https://localhost:7130/api/Farmers?page=${page}&pageSize=${pageSize}`
            );

            console.log(
                "Farmers API Response:",
                response.data
            );


            if (
                response.data &&
                Array.isArray(response.data.data)
            ) {

                setFarmers(response.data.data);

                setTotalRecords(
                    response.data.totalRecords ?? 0
                );

            } else if (
                Array.isArray(response.data)
            ) {

                setFarmers(response.data);

                setTotalRecords(
                    response.data.length
                );

            } else {

                setFarmers([]);

                setTotalRecords(0);

            }

        } catch (error) {

            console.error(
                "Get Farmers Error:",
                error
            );

            setFarmers([]);

            setTotalRecords(0);

        }

    }


    // =========================================================
    // LOAD FARMERS
    // =========================================================

    useEffect(() => {

        getFarmers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);


    // =========================================================
    // EDIT FARMER
    // =========================================================

    function handleEdit(farmer) {

        navigate(
            "/farmers/create",
            {
                state: farmer
            }
        );

    }


    // =========================================================
    // DELETE FARMER
    // =========================================================

    async function handleDelete(id) {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `https://localhost:7130/api/Farmers/register/${id}`
            );

            alert(
                "Deleted Successfully"
            );

            getFarmers();

        } catch (error) {

            console.error(
                "Delete Farmer Error:",
                error
            );

            alert(
                "Unable to delete farmer."
            );

        }

    }


    // =========================================================
    // COLUMN DEFINITIONS
    // =========================================================

    const columns = {

        id: {
            title: "ID",
            getValue: farmer => farmer.id
        },

        farmerCode: {
            title: "Farmer Code",
            getValue: farmer => farmer.farmerCode
        },

        name: {
            title: "Name",
            getValue: farmer => farmer.name
        },

        mobile: {
            title: "Mobile",
            getValue: farmer => farmer.mobile
        },

        isActive: {
            title: "Is Active",
            getValue: farmer =>
                farmer.isActive
                    ? "Active"
                    : "Inactive"
        },

        createdDate: {
            title: "Created Date",
            getValue: farmer =>
                farmer.createdDate
                    ? new Date(
                        farmer.createdDate
                    ).toLocaleDateString()
                    : ""
        },

        villageName: {
            title: "Village",
            getValue: farmer =>
                farmer.villageName
        },

        mandalName: {
            title: "Mandal",
            getValue: farmer =>
                farmer.mandalName
        },

        districtName: {
            title: "District",
            getValue: farmer =>
                farmer.districtName
        },

        stateName: {
            title: "State",
            getValue: farmer =>
                farmer.stateName
        },

        aadharNo: {
            title: "Aadhar No",
            getValue: farmer =>
                farmer.aadharNo
        },

        gstno: {
            title: "GST No",
            getValue: farmer =>
                farmer.gstno
        },

        pinCode: {
            title: "Pin Code",
            getValue: farmer =>
                farmer.pinCode
        },

        fullAddress: {
            title: "Full Address",
            getValue: farmer =>
                farmer.fullAddress
        },

        bank: {
            title: "Bank",
            getValue: farmer =>
                farmer.bank
        },

        accountNo: {
            title: "Account No",
            getValue: farmer =>
                farmer.accountNo
        },

        ifsc: {
            title: "IFSC",
            getValue: farmer =>
                farmer.ifsc
        },

        amount: {
            title: "Amount",
            getValue: farmer =>
                farmer.amount
        },

        paymentMethod: {
            title: "Payment Method",
            getValue: farmer =>
                farmer.paymentMethod
        },

        referenceNo: {
            title: "Reference No",
            getValue: farmer =>
                farmer.referenceNo
        },

        paymentDate: {
            title: "Payment Date",
            getValue: farmer =>
                farmer.paymentDate
                    ? new Date(
                        farmer.paymentDate
                    ).toLocaleDateString()
                    : ""
        },

        release: {
            title: "Release",
            getValue: farmer =>
                farmer.release
                    ? "Yes"
                    : "No"
        }

    };


    // =========================================================
    // GET UNIQUE VALUES
    // =========================================================

    function getUniqueValues(field) {

        if (!columns[field]) {
            return [];
        }

        const values = farmers
            .map(farmer =>
                columns[field].getValue(farmer)
            )
            .filter(value =>
                value !== null &&
                value !== undefined &&
                String(value).trim() !== ""
            )
            .map(value =>
                String(value).trim()
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

    }


    // =========================================================
    // GET FILTERED POPUP VALUES
    // =========================================================

    function getFilteredValues() {

        if (!activeFilter) {
            return [];
        }

        const values =
            getUniqueValues(
                activeFilter
            );

        if (!filterSearch.trim()) {
            return values;
        }

        return values.filter(
            value =>
                value
                    .toLowerCase()
                    .includes(
                        filterSearch.toLowerCase()
                    )
        );

    }


    // =========================================================
    // OPEN FILTER
    // =========================================================

    function openFilter(field) {

        if (activeFilter === field) {

            setActiveFilter(null);

            setFilterSearch("");

            return;

        }

        setActiveFilter(field);

        setFilterSearch("");

        setTempSelectedValues(
            appliedFilters[field]
                ? [...appliedFilters[field]]
                : []
        );

    }


    // =========================================================
    // TOGGLE FILTER VALUE
    // =========================================================

    function toggleFilterValue(value) {

        setTempSelectedValues(
            previousValues => {

                if (
                    previousValues.includes(value)
                ) {

                    return previousValues.filter(
                        item =>
                            item !== value
                    );

                }

                return [
                    ...previousValues,
                    value
                ];

            }
        );

    }


    // =========================================================
    // SELECT ALL
    // =========================================================

    function selectAllValues() {

        const values =
            getFilteredValues();

        setTempSelectedValues(
            previousValues => {

                const combined = [
                    ...previousValues,
                    ...values
                ];

                return [
                    ...new Set(combined)
                ];

            }
        );

    }


    // =========================================================
    // CLEAR TEMPORARY VALUES
    // =========================================================

    function clearTemporaryValues() {

        setTempSelectedValues([]);

    }


    // =========================================================
    // APPLY FILTER
    // =========================================================

    function applyFilter() {

        if (!activeFilter) {
            return;
        }

        setAppliedFilters(
            previousFilters => {

                const updatedFilters = {
                    ...previousFilters
                };

                if (
                    tempSelectedValues.length === 0
                ) {

                    delete updatedFilters[
                        activeFilter
                    ];

                } else {

                    updatedFilters[
                        activeFilter
                    ] = [
                            ...tempSelectedValues
                        ];

                }

                return updatedFilters;

            }
        );

        setPage(1);

        setActiveFilter(null);

        setFilterSearch("");

    }


    // =========================================================
    // CLEAR CURRENT FILTER
    // =========================================================

    function clearAppliedFilter() {

        if (!activeFilter) {
            return;
        }

        setAppliedFilters(
            previousFilters => {

                const updatedFilters = {
                    ...previousFilters
                };

                delete updatedFilters[
                    activeFilter
                ];

                return updatedFilters;

            }
        );

        setTempSelectedValues([]);

        setPage(1);

        setActiveFilter(null);

        setFilterSearch("");

    }


    // =========================================================
    // CLEAR ALL FILTERS
    // =========================================================

    function clearAllFilters() {

        setAppliedFilters({});

        setTempSelectedValues([]);

        setActiveFilter(null);

        setFilterSearch("");

        setPage(1);

    }


    // =========================================================
    // CHECK ACTIVE FILTER
    // =========================================================

    function isFilterActive(field) {

        return (
            appliedFilters[field] &&
            appliedFilters[field].length > 0
        );

    }


    // =========================================================
    // FILTER FARMERS
    // =========================================================

    const filteredFarmers =
        farmers.filter(
            farmer => {

                return Object.keys(
                    appliedFilters
                ).every(
                    field => {

                        const selectedValues =
                            appliedFilters[field];

                        if (
                            !selectedValues ||
                            selectedValues.length === 0
                        ) {

                            return true;

                        }

                        if (!columns[field]) {
                            return true;
                        }

                        const value =
                            columns[field]
                                .getValue(farmer);

                        return selectedValues.includes(
                            String(
                                value ?? ""
                            ).trim()
                        );

                    }
                );

            }
        );


    // =========================================================
    // ANY FILTER APPLIED
    // =========================================================

    const anyFilterApplied =
        Object.keys(
            appliedFilters
        ).some(
            field =>
                appliedFilters[field] &&
                appliedFilters[field].length > 0
        );


    // =========================================================
    // TOTAL PAGES
    // =========================================================

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalRecords /
                pageSize
            )
        );


    // =========================================================
    // RECORD RANGE
    // =========================================================

    const startRecord =
        totalRecords === 0
            ? 0
            : (
                (page - 1) *
                pageSize
            ) + 1;


    const endRecord =
        totalRecords === 0
            ? 0
            : Math.min(
                page * pageSize,
                totalRecords
            );


    // =========================================================
    // PAGE CHANGE
    // =========================================================

    function goToPage(newPage) {

        if (
            newPage < 1 ||
            newPage > totalPages
        ) {

            return;

        }

        setPage(newPage);

    }


    // =========================================================
    // FILTER HEADER COMPONENT
    // =========================================================

    function FilterHeader({
        field,
        title
    }) {

        const values =
            getFilteredValues();

        const isOpen =
            activeFilter === field;

        const active =
            isFilterActive(field);

        return (

            <th className="filter-column-header">

                {/* =================================================
                    HEADER CONTENT
                ================================================= */}

                <div className="filter-header-content">

                    <span className="filter-column-title">
                        {title}
                    </span>


                    {/* FILTER TOOLTIP */}
                    <div className="filter-tooltip-wrapper">

                        <button
                            type="button"
                            className={
                                `filter-icon-button ${active
                                    ? "filter-icon-active"
                                    : ""
                                }`
                            }
                            onClick={() =>
                                openFilter(field)
                            }
                            aria-label={`Filter ${title}`}
                        >

                            <FaFilter />

                        </button>


                        <span className="filter-tooltip-text">
                            Filter {title}
                        </span>

                    </div>

                </div>


                {/* =================================================
                    FILTER POPUP
                ================================================= */}

                {isOpen && (

                    <div className="acumatica-filter-popup">

                        {/* POPUP HEADER */}

                        <div className="filter-popup-header">

                            <span>
                                Filter {title}
                            </span>

                            <button
                                type="button"
                                className="filter-popup-close"
                                onClick={() => {

                                    setActiveFilter(null);

                                    setFilterSearch("");

                                }}
                            >
                                ×
                            </button>

                        </div>


                        {/* SEARCH */}

                        <div className="filter-search-container">

                            <input
                                type="text"
                                value={filterSearch}
                                placeholder={`Search ${title}`}
                                onChange={event =>
                                    setFilterSearch(
                                        event.target.value
                                    )
                                }
                                autoFocus
                            />

                        </div>


                        {/* SELECT ALL / CLEAR */}

                        <div className="filter-select-actions">

                            <button
                                type="button"
                                onClick={
                                    selectAllValues
                                }
                            >
                                Select All
                            </button>

                            <button
                                type="button"
                                onClick={
                                    clearTemporaryValues
                                }
                            >
                                Clear
                            </button>

                        </div>


                        {/* VALUES */}

                        <div className="filter-values-list">

                            {values.length === 0 ? (

                                <div className="no-filter-values">
                                    No values found
                                </div>

                            ) : (

                                values.map(
                                    (value, index) => (

                                        <label
                                            key={
                                                `${field}-${value}-${index}`
                                            }
                                            className="filter-value-row"
                                        >

                                            <input
                                                type="checkbox"
                                                checked={
                                                    tempSelectedValues.includes(
                                                        value
                                                    )
                                                }
                                                onChange={() =>
                                                    toggleFilterValue(
                                                        value
                                                    )
                                                }
                                            />

                                            <span title={value}>
                                                {value}
                                            </span>

                                        </label>

                                    )
                                )

                            )}

                        </div>


                        {/* FOOTER */}

                        <div className="filter-popup-footer">

                            <button
                                type="button"
                                className="filter-bottom-clear"
                                onClick={
                                    clearAppliedFilter
                                }
                            >
                                Clear
                            </button>

                            <button
                                type="button"
                                className="filter-bottom-apply"
                                onClick={
                                    applyFilter
                                }
                            >
                                ✓ Apply
                            </button>

                        </div>

                    </div>

                )}

            </th>

        );

    }


    // =========================================================
    // RETURN
    // =========================================================

    return (

        <div className="list-container">


            {/* =====================================================
                TOP BAR
            ===================================================== */}

            <div className="top-bar">

                <div className="top-row">

                    <div className="add-btn-container">

                    {/* LEFT SIDE */}

                    <div className="page-title-area">

                        {/*<h2>*/}
                        {/*    Farmers*/}
                        {/*</h2>*/}

                    </div>


                    {/* RIGHT SIDE */}

                    <div className="top-actions">


                        {/* ADD FARMER */}

                        <button
                            type="button"
                            className="add-btn"
                            onClick={() =>
                                navigate(
                                    "/farmers/create"
                                )
                            }
                        >

                            <FaPlus />

                            <span>
                                Add Farmer
                            </span>

                        </button>
                        {/* CLEAR ALL FILTERS */}

                        {anyFilterApplied && (

                            <button
                                type="button"
                                className="clear-all-btn"
                                onClick={
                                    clearAllFilters
                                }
                            >

                                <span>
                                    Clear All Filters
                                </span>

                            </button>

                        )}


                    </div>
                    </div>
                </div>

            </div>


            {/* =====================================================
                TABLE
            ===================================================== */}

            <div className="table-container">

                <div className="table-scroll-container">

                    <table className="list-table">

                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <thead>

                            <tr>

                                {/* ACTIONS */}

                                <th className="actions-header">
                                   
                                </th>


                                <FilterHeader
                                    field="id"
                                    title="ID"
                                />

                                <FilterHeader
                                    field="farmerCode"
                                    title="Farmer Code"
                                />

                                <FilterHeader
                                    field="name"
                                    title="Name"
                                />

                                <FilterHeader
                                    field="mobile"
                                    title="Mobile"
                                />

                                <FilterHeader
                                    field="isActive"
                                    title="Is Active"
                                />

                                <FilterHeader
                                    field="createdDate"
                                    title="Created Date"
                                />

                                <FilterHeader
                                    field="villageName"
                                    title="Village"
                                />

                                <FilterHeader
                                    field="mandalName"
                                    title="Mandal"
                                />

                                <FilterHeader
                                    field="districtName"
                                    title="District"
                                />

                                <FilterHeader
                                    field="stateName"
                                    title="State"
                                />

                                <FilterHeader
                                    field="aadharNo"
                                    title="Aadhar No"
                                />

                                <FilterHeader
                                    field="gstno"
                                    title="GST No"
                                />

                                <FilterHeader
                                    field="pinCode"
                                    title="Pin Code"
                                />

                                <FilterHeader
                                    field="fullAddress"
                                    title="Full Address"
                                />

                                <FilterHeader
                                    field="bank"
                                    title="Bank"
                                />

                                <FilterHeader
                                    field="accountNo"
                                    title="Account No"
                                />

                                <FilterHeader
                                    field="ifsc"
                                    title="IFSC"
                                />

                                <FilterHeader
                                    field="amount"
                                    title="Amount"
                                />

                                <FilterHeader
                                    field="paymentMethod"
                                    title="Payment Method"
                                />

                                <FilterHeader
                                    field="referenceNo"
                                    title="Reference No"
                                />

                                <FilterHeader
                                    field="paymentDate"
                                    title="Payment Date"
                                />

                                <FilterHeader
                                    field="release"
                                    title="Release"
                                />

                            </tr>

                        </thead>


                        {/* =================================================
                            BODY
                        ================================================= */}

                        <tbody>

                            {filteredFarmers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="24"
                                        className="no-data-row"
                                    >
                                        No farmers found
                                    </td>

                                </tr>

                            ) : (

                                filteredFarmers.map(
                                    farmer => (

                                        <tr
                                            key={
                                                farmer.id
                                            }
                                        >

                                            {/* ACTIONS */}

                                            <td>

                                                <div className="action-buttons">

                                                    {/* EDIT */}

                                                    <button
                                                        type="button"
                                                        className="edit-btn tooltip"
                                                        onClick={() =>
                                                            handleEdit(
                                                                farmer
                                                            )
                                                        }
                                                        aria-label="Edit"
                                                    >

                                                        <FaEdit />

                                                        <span className="tooltip-text">
                                                            Edit
                                                        </span>

                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        type="button"
                                                        className="delete-btn tooltip"
                                                        onClick={() =>
                                                            handleDelete(
                                                                farmer.id
                                                            )
                                                        }
                                                        aria-label="Delete"
                                                    >

                                                        <FaTrash />

                                                        <span className="tooltip-text">
                                                            Delete
                                                        </span>

                                                    </button>

                                                </div>

                                            </td>


                                            {/* ID */}

                                            <td>
                                                {farmer.id}
                                            </td>


                                            {/* FARMER CODE */}

                                            <td>
                                                {farmer.farmerCode}
                                            </td>


                                            {/* NAME */}

                                            <td>
                                                {farmer.name}
                                            </td>


                                            {/* MOBILE */}

                                            <td>
                                                {farmer.mobile}
                                            </td>


                                            {/* ACTIVE */}

                                            <td
                                                className={
                                                    farmer.isActive
                                                        ? "active-text"
                                                        : "inactive-text"
                                                }
                                            >

                                                {
                                                    farmer.isActive
                                                        ? "Active"
                                                        : "Inactive"
                                                }

                                            </td>


                                            {/* CREATED DATE */}

                                            <td>
                                                {
                                                    farmer.createdDate
                                                        ? new Date(
                                                            farmer.createdDate
                                                        ).toLocaleDateString()
                                                        : ""
                                                }
                                            </td>


                                            {/* VILLAGE */}

                                            <td>
                                                {
                                                    farmer.villageName
                                                }
                                            </td>


                                            {/* MANDAL */}

                                            <td>
                                                {
                                                    farmer.mandalName
                                                }
                                            </td>


                                            {/* DISTRICT */}

                                            <td>
                                                {
                                                    farmer.districtName
                                                }
                                            </td>


                                            {/* STATE */}

                                            <td>
                                                {
                                                    farmer.stateName
                                                }
                                            </td>


                                            {/* AADHAR */}

                                            <td>
                                                {
                                                    farmer.aadharNo
                                                }
                                            </td>


                                            {/* GST */}

                                            <td>
                                                {
                                                    farmer.gstno
                                                }
                                            </td>


                                            {/* PIN */}

                                            <td>
                                                {
                                                    farmer.pinCode
                                                }
                                            </td>


                                            {/* ADDRESS */}

                                            <td>
                                                {
                                                    farmer.fullAddress
                                                }
                                            </td>


                                            {/* BANK */}

                                            <td>
                                                {
                                                    farmer.bank
                                                }
                                            </td>


                                            {/* ACCOUNT */}

                                            <td>
                                                {
                                                    farmer.accountNo
                                                }
                                            </td>


                                            {/* IFSC */}

                                            <td>
                                                {
                                                    farmer.ifsc
                                                }
                                            </td>


                                            {/* AMOUNT */}

                                            <td>
                                                {
                                                    farmer.amount
                                                }
                                            </td>


                                            {/* PAYMENT METHOD */}

                                            <td>
                                                {
                                                    farmer.paymentMethod
                                                }
                                            </td>


                                            {/* REFERENCE */}

                                            <td>
                                                {
                                                    farmer.referenceNo
                                                }
                                            </td>


                                            {/* PAYMENT DATE */}

                                            <td>
                                                {
                                                    farmer.paymentDate
                                                        ? new Date(
                                                            farmer.paymentDate
                                                        ).toLocaleDateString()
                                                        : ""
                                                }
                                            </td>


                                            {/* RELEASE */}

                                            <td>
                                                {
                                                    farmer.release
                                                        ? "Yes"
                                                        : "No"
                                                }
                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =====================================================
                PAGINATION
            ===================================================== */}

            <div className="pagination-container">


                {/* RECORD COUNT */}

                <div className="record-count">

                    Records{" "}

                    {startRecord}

                    {" - "}

                    {endRecord}

                    {" of "}

                    {totalRecords}

                </div>


                {/* PAGINATION BUTTONS */}

                <div className="pagination-buttons">


                    {/* FIRST */}

                    <div className="pagination-tooltip">

                        <button
                            type="button"
                            className="pagination-icon"
                            onClick={() =>
                                goToPage(1)
                            }
                            disabled={
                                page === 1 ||
                                totalRecords === 0
                            }
                            aria-label="First page"
                        >

                            <FaAngleDoubleLeft />

                        </button>

                        <span className="pagination-tooltip-text">
                            First
                        </span>

                    </div>


                    {/* PREVIOUS */}

                    <div className="pagination-tooltip">

                        <button
                            type="button"
                            className="pagination-icon"
                            onClick={() =>
                                goToPage(
                                    page - 1
                                )
                            }
                            disabled={
                                page === 1 ||
                                totalRecords === 0
                            }
                            aria-label="Previous page"
                        >

                            <FaAngleLeft />

                        </button>

                        <span className="pagination-tooltip-text">
                            Previous
                        </span>

                    </div>


                    {/* PAGE */}

                    <span className="page-info">

                        Page{" "}

                        {totalRecords === 0
                            ? 0
                            : page}

                        {" "}of{" "}

                        {totalRecords === 0
                            ? 0
                            : totalPages}

                    </span>


                    {/* NEXT */}

                    <div className="pagination-tooltip">

                        <button
                            type="button"
                            className="pagination-icon"
                            onClick={() =>
                                goToPage(
                                    page + 1
                                )
                            }
                            disabled={
                                page === totalPages ||
                                totalRecords === 0
                            }
                            aria-label="Next page"
                        >

                            <FaAngleRight />

                        </button>

                        <span className="pagination-tooltip-text">
                            Next
                        </span>

                    </div>


                    {/* LAST */}

                    <div className="pagination-tooltip">

                        <button
                            type="button"
                            className="pagination-icon"
                            onClick={() =>
                                goToPage(
                                    totalPages
                                )
                            }
                            disabled={
                                page === totalPages ||
                                totalRecords === 0
                            }
                            aria-label="Last page"
                        >

                            <FaAngleDoubleRight />

                        </button>

                        <span className="pagination-tooltip-text">
                            Last
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}