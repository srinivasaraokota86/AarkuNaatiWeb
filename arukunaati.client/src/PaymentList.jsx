import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSyncAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PaymentList.css";

export default function PaymentList() {

    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
    const [search] = useState("");
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const pageSize = 20;

    // =========================================================
    // GET PAYMENTS
    // =========================================================

    const getPayments = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                "https://localhost:7130/api/FarmerPayment"
            );

            console.log("Payment Data:", response.data);

            /*
                Supports both:
                [
                    {...},
                    {...}
                ]

                and

                {
                    data: [...]
                }
            */

            if (Array.isArray(response.data)) {

                setPayments(response.data);

            }
            else if (Array.isArray(response.data.data)) {

                setPayments(response.data.data);

            }
            else {

                setPayments([]);

            }

        }
        catch (error) {

            console.log("GET PAYMENT ERROR:", error);

            if (error.response) {

                console.log(error.response.data);

                alert(
                    error.response.data?.message ||
                    "Unable to load payment records."
                );

            }
            else if (error.request) {

                alert("API not reachable.");

            }
            else {

                alert(error.message);

            }

        }
        finally {

            setLoading(false);

        }
    };


    // =========================================================
    // LOAD DATA
    // =========================================================

    useEffect(() => {

        getPayments();

    }, []);


    // =========================================================
    // DELETE PAYMENT
    // =========================================================

    const handleDelete = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this payment?"
        )) {
            return;
        }

        try {

            await axios.delete(
                `https://localhost:7130/api/FarmerPayment/${id}`
            );

            alert("Payment deleted successfully.");

            getPayments();

        }
        catch (error) {

            console.log("DELETE ERROR:", error);

            if (error.response) {

                alert(
                    error.response.data?.message ||
                    "Unable to delete payment."
                );

            }
            else if (error.request) {

                alert("API not reachable.");

            }
            else {

                alert(error.message);

            }

        }
    };


    // =========================================================
    // SEARCH
    // =========================================================

    const filteredPayments = payments.filter((payment) => {

        const searchText = search.toLowerCase();

        return (

            String(payment.farmerCode || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(payment.farmerName || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(payment.bankName || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(payment.accountNumber || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(payment.ifscCode || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(payment.paymentMethod || "")
                .toLowerCase()
                .includes(searchText)

            ||

            String(payment.referenceNumber || "")
                .toLowerCase()
                .includes(searchText)

        );

    });


    // =========================================================
    // PAGINATION
    // =========================================================

    const totalRecords = filteredPayments.length;

    const totalPages = Math.ceil(
        totalRecords / pageSize
    );

    const startIndex =
        (page - 1) * pageSize;

    const endIndex =
        startIndex + pageSize;

    const currentPayments =
        filteredPayments.slice(
            startIndex,
            endIndex
        );


    // =========================================================
    // SEARCH CHANGE
    // =========================================================

    //const handleSearch = (e) => {

    //    setSearch(e.target.value);

    //    setPage(1);

    //};


    // =========================================================
    // EDIT
    // =========================================================
    const handleEdit = (payment) => {

        navigate(`/farmer-payments/${payment.paymentId || payment.id}`, {
            state: payment
        });

    };

    // =========================================================
    // ADD PAYMENT
    // =========================================================

    const handleAddPayment = () => {

        navigate("/farmer-payments/create");

    };


    // =========================================================
    // PAGINATION FUNCTIONS
    // =========================================================

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


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "";
        }

        const d = new Date(date);

        if (isNaN(d.getTime())) {
            return date;
        }

        return d.toLocaleDateString("en-IN");

    };


    // =========================================================
    // FORMAT AMOUNT
    // =========================================================

    const formatAmount = (amount) => {

        if (
            amount === null ||
            amount === undefined ||
            amount === ""
        ) {
            return "₹0.00";
        }

        return Number(amount).toLocaleString(
            "en-IN",
            {
                style: "currency",
                currency: "INR"
            }
        );

    };


    // =========================================================
    // UI
    // =========================================================

    return (

        <div className="payment-list-container">

            {/* =================================================
                TOP SECTION
            ================================================= */}

            <div className="payment-list-top">

                {/*<div>*/}

                {/*    <h2>Farmer Payments</h2>*/}

                {/*    <p>*/}
                {/*        Manage farmer payment records*/}
                {/*    </p>*/}

                {/*</div>*/}


                <div className="payment-top-buttons">

                {/*    <button*/}
                {/*        className="refresh-btn"*/}
                {/*        onClick={getPayments}*/}
                {/*        title="Refresh"*/}
                {/*    >*/}
                {/*        <FaSyncAlt />*/}
                {/*        Refresh*/}
                {/*    </button>*/}


                    <button
                        className="add-payment-btn"
                        onClick={handleAddPayment}
                    >
                        <FaPlus />
                        Add Payment
                    </button>

                </div>

            </div>


            {/* =================================================
                SEARCH SECTION
            ================================================= */}

            <div className="payment-filter-section">

                {/*<div className="search-box">*/}

                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder="Search Farmer Code, Name, Bank, IFSC, Reference..."*/}
                {/*        value={search}*/}
                {/*        onChange={handleSearch}*/}
                {/*    />*/}

                {/*</div>*/}

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="payment-table-container">

                <table className="payment-list-table">

                    <thead>

                        <tr>
                            <th></th>

                            <th>S.No</th>

                            <th>Farmer Code</th>

                            <th>Farmer Name</th>

                            <th>Bank Name</th>

                            <th>Account Number</th>

                            <th>IFSC Code</th>

                            <th>Amount</th>

                            <th>Payment Method</th>

                            <th>Reference Number</th>

                            <th>Payment Date</th>

                            <th>Release</th>


                        </tr>

                    </thead>


                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="12"
                                    className="no-data"
                                >
                                    Loading payments...
                                </td>

                            </tr>

                        ) : currentPayments.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="12"
                                    className="no-data"
                                >
                                    No payment records found.
                                </td>

                            </tr>

                        ) : (

                            currentPayments.map(
                                (payment, index) => (

                                    <tr key={
                                        payment.paymentId ||
                                        payment.id ||
                                        index
                                    }>
                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEdit(payment)}
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>


                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            payment.paymentId ||
                                                            payment.id
                                                        )
                                                    }
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>

                                        </td>


                                        <td>
                                            {startIndex + index + 1}
                                        </td>


                                        <td>
                                            {payment.farmerCode}
                                        </td>


                                        <td>
                                            {payment.farmerName}
                                        </td>


                                        <td>
                                            {payment.bankName}
                                        </td>


                                        <td>
                                            {payment.accountNumber}
                                        </td>


                                        <td>
                                            {payment.ifscCode}
                                        </td>


                                        <td className="amount-column">
                                            {formatAmount(
                                                payment.amount
                                            )}
                                        </td>


                                        <td>

                                            <span className="method-badge">

                                                {
                                                    payment.paymentMethod
                                                }

                                            </span>

                                        </td>


                                        <td>
                                            {
                                                payment.referenceNumber ||
                                                "-"
                                            }
                                        </td>


                                        <td>
                                            {formatDate(
                                                payment.paymentDate
                                            )}
                                        </td>


                                        <td>

                                            {payment.release ? (

                                                <span className="release-yes">
                                                    Released
                                                </span>

                                            ) : (

                                                <span className="release-no">
                                                    Pending
                                                </span>

                                            )}

                                        </td>


                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>


            {/* =================================================
                PAGINATION
            ================================================= */}

            <div className="payment-pagination">

                <div className="record-info">

                    Records{" "}

                    {totalRecords === 0
                        ? 0
                        : startIndex + 1}

                    {" - "}

                    {Math.min(
                        endIndex,
                        totalRecords
                    )}

                    {" of "}

                    {totalRecords}

                </div>


                <div className="pagination-buttons">

                    <button
                        onClick={goFirst}
                        disabled={page === 1 || totalPages === 0}
                    >
                        First
                    </button>


                    <button
                        onClick={goPrevious}
                        disabled={page === 1 || totalPages === 0}
                    >
                        Previous
                    </button>


                    <span className="page-number">

                        Page {totalPages === 0 ? 0 : page}
                        {" / "}
                        {totalPages}

                    </span>


                    <button
                        onClick={goNext}
                        disabled={
                            page === totalPages ||
                            totalPages === 0
                        }
                    >
                        Next
                    </button>


                    <button
                        onClick={goLast}
                        disabled={
                            page === totalPages ||
                            totalPages === 0
                        }
                    >
                        Last
                    </button>

                </div>

            </div>

        </div>

    );

}