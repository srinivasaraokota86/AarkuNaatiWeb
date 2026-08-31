import { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerList.css";
//import "./PaymentList.css";
//import "./QualityInspectionList.css";

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
// FILTER HEADER COMPONENT
// =========================================================

function FilterHeader({
    field,
    title,
    activeFilter,
    appliedFilters,
    filterSearch,
    tempSelectedValues,

    openFilter,
    setFilterSearch,
    setActiveFilter,

    getFilteredValues,
    toggleFilterValue,
    selectAllValues,
    clearTemporaryValues,
    clearAppliedFilter,
    applyFilter
}) {

    const values =
        activeFilter === field
            ? getFilteredValues()
            : [];

    const isOpen =
        activeFilter === field;

    const isActive =
        appliedFilters[field] &&
        appliedFilters[field].length > 0;

    return (
        <th className="filter-column-header">

            {/* =====================================================
                HEADER CONTENT
            ===================================================== */}

            <div className="filter-header-content">

                <span>
                    {title}
                </span>

                {/* FILTER ICON + TOOLTIP */}

                <div className="filter-tooltip-wrapper">

                    <button
                        type="button"
                        className={
                            `filter-icon-button ${isActive
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


            {/* =====================================================
                FILTER POPUP
            ===================================================== */}

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
                            onChange={(event) =>
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


                    {/* FILTER VALUES */}

                    <div className="filter-values-list">

                        {values.length === 0 ? (

                            <div className="no-filter-values">
                                No values found
                            </div>

                        ) : (

                            values.map(
                                (value, index) => (

                                    <label
                                        key={`${field}-${value}-${index}`}
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
// CUSTOMER LIST
// =========================================================

export default function CustomerList() {

    const navigate = useNavigate();


    // =========================================================
    // CUSTOMER DATA
    // =========================================================

    const [
        customers,
        setCustomers
    ] = useState([]);


    // =========================================================
    // PAGINATION
    // =========================================================

    const [
        page,
        setPage
    ] = useState(1);

    const pageSize = 20;

    const [
        totalRecords,
        setTotalRecords
    ] = useState(0);


    // =========================================================
    // FILTER STATES
    // =========================================================

    const [
        activeFilter,
        setActiveFilter
    ] = useState(null);

    const [
        filterSearch,
        setFilterSearch
    ] = useState("");

    const [
        tempSelectedValues,
        setTempSelectedValues
    ] = useState([]);

    const [
        appliedFilters,
        setAppliedFilters
    ] = useState({});


    // =========================================================
    // LOAD CUSTOMERS
    // =========================================================

    useEffect(() => {

        getCustomers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);


    // =========================================================
    // GET CUSTOMERS
    // =========================================================

    async function getCustomers() {

        try {

            const response = await axios.get(
                "https://localhost:7130/api/customers",
                {
                    params: {
                        page: page,
                        pageSize: pageSize
                    }
                }
            );

            console.log(
                "Customer API Response:",
                response.data
            );


            // =====================================================
            // PAGINATED RESPONSE
            // =====================================================

            if (
                response.data &&
                Array.isArray(response.data.data)
            ) {

                setCustomers(
                    response.data.data
                );

                setTotalRecords(
                    response.data.totalRecords ??
                    response.data.totalCount ??
                    0
                );

            }


            // =====================================================
            // DIRECT ARRAY RESPONSE
            // =====================================================

            else if (
                Array.isArray(response.data)
            ) {

                setCustomers(
                    response.data
                );

                setTotalRecords(
                    response.data.length
                );

            }


            // =====================================================
            // OTHER RESPONSE FORMAT
            // =====================================================

            else {

                const data =
                    response.data?.customers ??
                    response.data?.items ??
                    response.data?.records ??
                    [];

                setCustomers(data);

                setTotalRecords(
                    response.data?.totalRecords ??
                    response.data?.totalCount ??
                    data.length
                );

            }

        } catch (error) {

            console.error(
                "Get customers error:",
                error
            );

            setCustomers([]);
            setTotalRecords(0);

        }

    }


    // =========================================================
    // EDIT CUSTOMER
    // =========================================================

    function handleEdit(customer) {

        navigate(
            "/customer/create",
            {
                state: customer
            }
        );

    }


    // =========================================================
    // DELETE CUSTOMER
    // =========================================================

    async function handleDelete(id) {

        if (
            !window.confirm(
                "Are you sure want to delete?"
            )
        ) {
            return;
        }

        try {

            await axios.delete(
                `https://localhost:7130/api/customers/${id}`
            );

            alert(
                "Customer Deleted Successfully"
            );

            getCustomers();

        } catch (error) {

            console.error(
                "Delete customer error:",
                error
            );

            alert(
                "Unable to delete customer."
            );

        }

    }


    // =========================================================
    // COLUMN DEFINITIONS
    // =========================================================

    const columns = {

        customerId: {
            title: "Customer ID",
            getValue: customer =>
                customer.customerId
        },

        customerName: {
            title: "Customer Name",
            getValue: customer =>
                customer.customerName
        },

        customerClass: {
            title: "Customer Class",
            getValue: customer =>
                customer.customerClass
        },

        email: {
            title: "Email",
            getValue: customer =>
                customer.email
        },

        phone: {
            title: "Phone",
            getValue: customer =>
                customer.phone
        },

        addressLine1: {
            title: "Address",
            getValue: customer =>
                customer.addressLine1
        },

        city: {
            title: "City",
            getValue: customer =>
                customer.city
        },

        state: {
            title: "State",
            getValue: customer =>
                customer.state
        },

        country: {
            title: "Country",
            getValue: customer =>
                customer.country
        },

        postalCode: {
            title: "Postal Code",
            getValue: customer =>
                customer.postalCode
        }

    };


    // =========================================================
    // GET UNIQUE VALUES
    // =========================================================

    function getUniqueValues(field) {

        if (!columns[field]) {
            return [];
        }

        const values =
            customers
                .map(customer => {

                    const value =
                        columns[field].getValue(
                            customer
                        );

                    return value;

                })
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
        ].sort((a, b) =>
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
    // GET FILTERED VALUES
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
                        filterSearch
                            .toLowerCase()
                    )
        );

    }


    // =========================================================
    // OPEN FILTER
    // =========================================================

    function openFilter(field) {

        if (
            activeFilter === field
        ) {

            setActiveFilter(null);
            setFilterSearch("");

            return;

        }

        setActiveFilter(field);
        setFilterSearch("");

        setTempSelectedValues(

            appliedFilters[field]
                ? [
                    ...appliedFilters[field]
                ]
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
                    previousValues.includes(
                        value
                    )
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
            values
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

        // IMPORTANT
        // Start filtered result from page 1

        setPage(1);

        setActiveFilter(null);
        setFilterSearch("");

    }


    // =========================================================
    // CLEAR APPLIED FILTER
    // =========================================================

    function clearAppliedFilter() {

        if (!activeFilter) {
            return;
        }

        setTempSelectedValues([]);

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
    // FILTER CUSTOMER DATA
    // =========================================================

    const filteredCustomers =
        customers.filter(
            customer => {

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
                                .getValue(
                                    customer
                                );

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
    // PAGINATION
    // =========================================================

    /*
       Since the API already sends 20 records per page,
       filteredCustomers is the current page data.
    */

    const displayCustomers =
        filteredCustomers;


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalRecords /
                pageSize
            )
        );


    // =========================================================
    // PAGE RANGE
    // =========================================================

    const startRecord =
        totalRecords === 0
            ? 0
            : ((page - 1) * pageSize) + 1;

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
    // CHECK WHETHER ANY FILTER IS APPLIED
    // =========================================================

    const anyFilterApplied =
        Object.keys(appliedFilters).some(
            field =>
                appliedFilters[field] &&
                appliedFilters[field].length > 0
        );
    // =========================================================
    // RETURN
    // =========================================================

    return (

        <div className="list-container">


            {/* =====================================================
                TOP SECTION
            ===================================================== */}

            <div className="top-section">

                <div className="top-row">

                    <div className="add-btn-container">

                        <button
                            type="button"
                            className="add-btn"
                            onClick={() =>
                                navigate(
                                    "/customer/create"
                                )
                            }
                        >

                            <FaPlus />

                            <span>
                                Add Customer
                            </span>

                        </button>

                    </div>

                </div>

            </div>

            {/* =====================================================
                ACTIVE FILTER BAR
            ===================================================== */}

            {anyFilterApplied && (

                <div className="active-filter-bar">

                    <span>
                        Filters Applied
                    </span>

                    <button
                        type="button"
                        className="clear-all-filter-btn"
                        onClick={clearAllFilters}
                    >
                        Clear All
                    </button>

                </div>

            )}
            {/* =====================================================
                TABLE
            ===================================================== */}

            <div className="table-container">

                <div className="table-scroll-container">

                    <table className="list-table">


                        {/* =================================================
                            TABLE HEADER
                        ================================================= */}

                        <thead>

                            <tr>

                                {/* ACTIONS */}

                                <th className="actions-header">
                                    
                                </th>


                                {/* CUSTOMER ID */}

                                <FilterHeader
                                    field="customerId"
                                    title="Customer ID"
                                    activeFilter={activeFilter}
                                    appliedFilters={appliedFilters}
                                    filterSearch={filterSearch}
                                    tempSelectedValues={tempSelectedValues}
                                    openFilter={openFilter}
                                    setFilterSearch={setFilterSearch}
                                    setActiveFilter={setActiveFilter}
                                    getFilteredValues={getFilteredValues}
                                    toggleFilterValue={toggleFilterValue}
                                    selectAllValues={selectAllValues}
                                    clearTemporaryValues={clearTemporaryValues}
                                    clearAppliedFilter={clearAppliedFilter}
                                    applyFilter={applyFilter}
                                />


                                {/* CUSTOMER NAME */}

                                <FilterHeader
                                    field="customerName"
                                    title="Customer Name"
                                    activeFilter={activeFilter}
                                    appliedFilters={appliedFilters}
                                    filterSearch={filterSearch}
                                    tempSelectedValues={tempSelectedValues}
                                    openFilter={openFilter}
                                    setFilterSearch={setFilterSearch}
                                    setActiveFilter={setActiveFilter}
                                    getFilteredValues={getFilteredValues}
                                    toggleFilterValue={toggleFilterValue}
                                    selectAllValues={selectAllValues}
                                    clearTemporaryValues={clearTemporaryValues}
                                    clearAppliedFilter={clearAppliedFilter}
                                    applyFilter={applyFilter}
                                />


                                {/* CUSTOMER CLASS */}

                                <FilterHeader
                                    field="customerClass"
                                    title="Customer Class"
                                    activeFilter={activeFilter}
                                    appliedFilters={appliedFilters}
                                    filterSearch={filterSearch}
                                    tempSelectedValues={tempSelectedValues}
                                    openFilter={openFilter}
                                    setFilterSearch={setFilterSearch}
                                    setActiveFilter={setActiveFilter}
                                    getFilteredValues={getFilteredValues}
                                    toggleFilterValue={toggleFilterValue}
                                    selectAllValues={selectAllValues}
                                    clearTemporaryValues={clearTemporaryValues}
                                    clearAppliedFilter={clearAppliedFilter}
                                    applyFilter={applyFilter}
                                />


                                {/* EMAIL */}

                                <FilterHeader
                                    field="email"
                                    title="Email"
                                    activeFilter={activeFilter}
                                    appliedFilters={appliedFilters}
                                    filterSearch={filterSearch}
                                    tempSelectedValues={tempSelectedValues}
                                    openFilter={openFilter}
                                    setFilterSearch={setFilterSearch}
                                    setActiveFilter={setActiveFilter}
                                    getFilteredValues={getFilteredValues}
                                    toggleFilterValue={toggleFilterValue}
                                    selectAllValues={selectAllValues}
                                    clearTemporaryValues={clearTemporaryValues}
                                    clearAppliedFilter={clearAppliedFilter}
                                    applyFilter={applyFilter}
                                />


                                {/* PHONE */}

                                <FilterHeader
                                    field="phone"
                                    title="Phone"
                                    activeFilter={activeFilter}
                                    appliedFilters={appliedFilters}
                                    filterSearch={filterSearch}
                                    tempSelectedValues={tempSelectedValues}
                                    openFilter={openFilter}
                                    setFilterSearch={setFilterSearch}
                                    setActiveFilter={setActiveFilter}
                                    getFilteredValues={getFilteredValues}
                                    toggleFilterValue={toggleFilterValue}
                                    selectAllValues={selectAllValues}
                                    clearTemporaryValues={clearTemporaryValues}
                                    clearAppliedFilter={clearAppliedFilter}
                                    applyFilter={applyFilter}
                                />


                                {/* ADDRESS */}

                                <FilterHeader
                                    field="addressLine1"
                                    title="Address"
                                    activeFilter={activeFilter}
                                    appliedFilters={appliedFilters}
                                    filterSearch={filterSearch}
                                    tempSelectedValues={tempSelectedValues}
                                    openFilter={openFilter}
                                    setFilterSearch={setFilterSearch}
                                    setActiveFilter={setActiveFilter}
                                    getFilteredValues={getFilteredValues}
                                    toggleFilterValue={toggleFilterValue}
                                    selectAllValues={selectAllValues}
                                    clearTemporaryValues={clearTemporaryValues}
                                    clearAppliedFilter={clearAppliedFilter}
                                    applyFilter={applyFilter}
                                />


                                {/* CITY */}

                                <FilterHeader
                                    field="city"
                                    title="City"
                                    activeFilter={activeFilter}
                                    appliedFilters={appliedFilters}
                                    filterSearch={filterSearch}
                                    tempSelectedValues={tempSelectedValues}
                                    openFilter={openFilter}
                                    setFilterSearch={setFilterSearch}
                                    setActiveFilter={setActiveFilter}
                                    getFilteredValues={getFilteredValues}
                                    toggleFilterValue={toggleFilterValue}
                                    selectAllValues={selectAllValues}
                                    clearTemporaryValues={clearTemporaryValues}
                                    clearAppliedFilter={clearAppliedFilter}
                                    applyFilter={applyFilter}
                                />


                                {/* STATE */}

                                <FilterHeader
                                    field="state"
                                    title="State"
                                    activeFilter={activeFilter}
                                    appliedFilters={appliedFilters}
                                    filterSearch={filterSearch}
                                    tempSelectedValues={tempSelectedValues}
                                    openFilter={openFilter}
                                    setFilterSearch={setFilterSearch}
                                    setActiveFilter={setActiveFilter}
                                    getFilteredValues={getFilteredValues}
                                    toggleFilterValue={toggleFilterValue}
                                    selectAllValues={selectAllValues}
                                    clearTemporaryValues={clearTemporaryValues}
                                    clearAppliedFilter={clearAppliedFilter}
                                    applyFilter={applyFilter}
                                />


                                {/* COUNTRY */}

                                <FilterHeader
                                    field="country"
                                    title="Country"
                                    activeFilter={activeFilter}
                                    appliedFilters={appliedFilters}
                                    filterSearch={filterSearch}
                                    tempSelectedValues={tempSelectedValues}
                                    openFilter={openFilter}
                                    setFilterSearch={setFilterSearch}
                                    setActiveFilter={setActiveFilter}
                                    getFilteredValues={getFilteredValues}
                                    toggleFilterValue={toggleFilterValue}
                                    selectAllValues={selectAllValues}
                                    clearTemporaryValues={clearTemporaryValues}
                                    clearAppliedFilter={clearAppliedFilter}
                                    applyFilter={applyFilter}
                                />


                                {/* POSTAL CODE */}

                                <FilterHeader
                                    field="postalCode"
                                    title="Postal Code"
                                    activeFilter={activeFilter}
                                    appliedFilters={appliedFilters}
                                    filterSearch={filterSearch}
                                    tempSelectedValues={tempSelectedValues}
                                    openFilter={openFilter}
                                    setFilterSearch={setFilterSearch}
                                    setActiveFilter={setActiveFilter}
                                    getFilteredValues={getFilteredValues}
                                    toggleFilterValue={toggleFilterValue}
                                    selectAllValues={selectAllValues}
                                    clearTemporaryValues={clearTemporaryValues}
                                    clearAppliedFilter={clearAppliedFilter}
                                    applyFilter={applyFilter}
                                />

                            </tr>

                        </thead>


                        {/* =================================================
                            TABLE BODY
                        ================================================= */}

                        <tbody>

                            {displayCustomers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="11"
                                        className="no-data-row"
                                    >
                                        No customers found
                                    </td>

                                </tr>

                            ) : (

                                displayCustomers.map(
                                    customer => (

                                        <tr
                                            key={
                                                customer.customerId
                                            }
                                        >

                                            {/* ACTIONS */}

                                            <td>

                                                <div className="action-buttons">

                                                    {/* EDIT */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                customer
                                                            )
                                                        }
                                                        className="edit-btn tooltip"
                                                        title="Edit"
                                                        aria-label="Edit customer"
                                                    >

                                                        <FaEdit />

                                                        <span className="tooltip-text">
                                                            Edit
                                                        </span>

                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                customer.customerId
                                                            )
                                                        }
                                                        className="delete-btn tooltip"
                                                        title="Delete"
                                                        aria-label="Delete customer"
                                                    >

                                                        <FaTrash />

                                                        <span className="tooltip-text">
                                                            Delete
                                                        </span>

                                                    </button>

                                                </div>

                                            </td>


                                            {/* CUSTOMER ID */}

                                            <td>
                                                {
                                                    customer.customerId
                                                }
                                            </td>


                                            {/* CUSTOMER NAME */}

                                            <td>
                                                {
                                                    customer.customerName
                                                }
                                            </td>


                                            {/* CUSTOMER CLASS */}

                                            <td>
                                                {
                                                    customer.customerClass
                                                }
                                            </td>


                                            {/* EMAIL */}

                                            <td>
                                                {
                                                    customer.email
                                                }
                                            </td>


                                            {/* PHONE */}

                                            <td>
                                                {
                                                    customer.phone
                                                }
                                            </td>


                                            {/* ADDRESS */}

                                            <td>
                                                {
                                                    customer.addressLine1
                                                }
                                            </td>


                                            {/* CITY */}

                                            <td>
                                                {
                                                    customer.city
                                                }
                                            </td>


                                            {/* STATE */}

                                            <td>
                                                {
                                                    customer.state
                                                }
                                            </td>


                                            {/* COUNTRY */}

                                            <td>
                                                {
                                                    customer.country
                                                }
                                            </td>


                                            {/* POSTAL CODE */}

                                            <td>
                                                {
                                                    customer.postalCode
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


                {/* RECORD INFORMATION */}

                <div className="record-info">

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


                    {/* PAGE INFORMATION */}

                    <span className="page-info">

                        Page {totalRecords === 0 ? 0 : page}
                        {" "}
                        of
                        {" "}
                        {totalRecords === 0 ? 0 : totalPages}

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