import { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerList.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();

    // Get Customers
    async function getCustomers() {

        try {

            const response = await axios.get(
                "https://localhost:7130/api/customers"
            );

            console.log(response.data);

            setCustomers(
                response.data.$values || response.data
            );

        } catch (error) {

            console.log(error);
        }
    }

    // Load Data
    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCustomers();

    }, []);
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
            <div className="top-bar">

                <h2>
                    Total Customers: {customers.length}
                </h2>

                <div className="top-actions">

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

            {/* Table */}
            <table className="list-table">

                <thead>

                    <tr>

                        <th>Actions</th>
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

                                <button
                                    onClick={() =>
                                        handleEdit(customer)
                                    }
                                    className="edit-btn"
                                >
                                    <FaEdit />
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            customer.customerId
                                        )
                                    }
                                    className="delete-btn"
                                >
                                    <FaTrash />
                                </button>

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

        </div>
    );
}