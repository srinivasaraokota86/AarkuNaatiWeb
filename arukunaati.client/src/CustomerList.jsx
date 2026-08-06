import { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerList.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [pageSize] = useState(20);
    const [totalRecords, setTotalRecords] = useState(0);
    // Get Customers
    async function getCustomers() {

        try {

            const response = await axios.get(
                `https://localhost:7130/api/customers?page=${page}&pageSize=${pageSize}`
            );

            setCustomers(response.data.data);
            setTotalRecords(response.data.totalRecords);
            //const [currentPage, setCurrentPage] = useState(1);


        } catch (error) {

            console.log(error);
        }
    }

    // Load Data
    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCustomers();

    // eslint-disable-next-line no-undef
    }, [page,pageSize]);
    console.log("Customers:", customers);
    // Edit Customer
    function handleEdit(customer) {

        navigate("/customer/create", {
            state: customer
        });
    }

    // Delete Customer
    async function handleDelete(id) {

        if (window.confirm("Are you sure want to delete?")) {

            try {

                await axios.delete(
                    `https://localhost:7130/api/customers/${id}`
                );

                alert("Customer Deleted Successfully");

                getCustomers();

            } catch (error) {

                console.log(error);
            }
        }
    }

    return (

        <div className="list-container">

            {/* Top Bar */}
            <div className="top-section">
                <div className="top-row">

                    <div className="add-btn-container">

                    <button
                        className="add-btn"
                        onClick={() =>
                            navigate("/customer/create")
                        }
                    >
                        Add Customer
                    </button>
                    </div>
                    </div>

            </div>

            {/* Table */}
            <table className="list-table">

                <thead>

                    <tr>

                        <th></th>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Customer Class</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Postal Code</th>

                    </tr>

                </thead>

                <tbody>

                    {customers.map((customer) => (

                        <tr key={customer.customerId}>

                            {/* Action Buttons */}
                            <td>

                                <div className="action-buttons">

                                    <button
                                        onClick={() =>
                                            handleEdit(customer)
                                        }
                                        className="edit-btn tooltip"
                                    >
                                        <FaEdit />
                                        <span className="tooltip-text">Edit</span>
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                customer.customerId
                                            )
                                        }
                                        className="delete-btn tooltip"
                                    >
                                        <FaTrash />
                                        <span className="tooltip-text">Delete</span>
                                    </button>
                                </div>

                            </td>

                            <td>{customer.customerId}</td>

                            <td>{customer.customerName}</td>

                            <td>{customer.customerClass}</td>

                            <td>{customer.email}</td>

                            <td>{customer.phone}</td>

                            <td>{customer.addressLine1}</td>

                            <td>{customer.city}</td>

                            <td>{customer.state}</td>

                            <td>{customer.country}</td>

                            <td>{customer.postalCode}</td>

                        </tr>

                    ))}

                </tbody>

            </table>
            <div className="pagination-container">

                <div className="record-count">
                    Records {(page - 1) * pageSize + 1}
                    -
                    {Math.min(page * pageSize, totalRecords)}
                    of {totalRecords}
                </div>

                <div className="pagination-buttons">

                    <button
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                    >
                        ⏮ First
                    </button>

                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        ◀ Previous
                    </button>

                    <span className="page-info">
                        Page {page} of {Math.ceil(totalRecords / pageSize)}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === Math.ceil(totalRecords / pageSize)}
                    >
                        Next ▶
                    </button>

                    <button
                        onClick={() => setPage(Math.ceil(totalRecords / pageSize))}
                        disabled={page === Math.ceil(totalRecords / pageSize)}
                    >
                        Last ⏭
                    </button>

                </div>

            </div>

        </div>
    );
}