import { useEffect, useState } from "react";
import axios from "axios";
import "./ListScreen.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FarmersList() {

    const [farmers, setFarmers] = useState([]);
    //const [address, setAddress] = useState([]);

    const navigate = useNavigate();

    // Get Farmers
    async function getFarmers() {

        try {

            const response = await axios.get(
                "https://localhost:7130/api/Farmers"
            );

            console.log(response.data);

            setFarmers(response.data);

        } catch (error) {

            console.log(error);
        }
    }

    // Load Data
    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getFarmers();

    }, []);
    console.log("Farmers:", farmers);

    function handleEdit(farmer) {

        console.log(farmer);

        navigate("/farmers/create", {
            state: farmer
        });
    }
    async function handleDelete(id) {

        if (window.confirm("Are you sure you want to delete?")) {

            try {

                await axios.delete(`https://localhost:7130/api/Farmers/${id}`);

                alert("Deleted Successfully");

                // Refresh data after delete
                getFarmers();

            } catch (error) {

                console.log(error);
            }
        }
    }


    return (

        <div className="list-container">

            <div className="top-bar">

                <h2>Total Farmers: {farmers.length}</h2>

                <div className="top-actions">

                    <button
                        className="add-btn"
                        onClick={() => navigate("/farmers/create")}
                    >

                        Add Farmer
                    </button>

                </div>

            </div>

            <table className="list-table">

                <thead>

                    <tr>
                        <th>Actions</th>
                        <th>ID</th>
                        <th>Farmer Code</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Is Active</th>
                        <th>Created Date</th>
                        <th>Village</th>
                        <th>Mandal</th>
                        <th>District</th>
                        <th>State</th>
                        <th>Aadhar No</th>
                        <th>GST No</th>
                        <th>Pin Code</th>
                        <th>Full Address</th>



                    </tr>

                </thead>

                <tbody>

                    {farmers.map((farmer) => (

                        <tr key={farmer.id}>

                            <td>

                                <button
                                    onClick={() => handleEdit(farmer)}
                                    className="edit-btn"
                                >
                                    <FaEdit />
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(farmer.id)
                                    }
                                    className="delete-btn"
                                >
                                    <FaTrash />
                                </button>

                            </td>
                            <td>{farmer.id}</td>
                            <td>{farmer.farmerCode}</td>

                            <td>{farmer.name}</td>

                            <td>{farmer.mobile}</td>


                            <td>
                                {farmer.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </td>
                            <td>
                                {farmer.createdDate
                                    ? new Date(farmer.createdDate).toLocaleDateString()
                                    : ""}
                            </td>
                            <td>{farmer.villageName}</td>

                            <td>{farmer.mandalName}</td>

                            <td>{farmer.districtName}</td>

                            <td>{farmer.stateName}</td>

                            <td>{farmer.aadharNo}</td>

                            <td>{farmer.gstno}</td>
                            <td>{farmer.pinCode}</td>
                            <td>{farmer.fullAddress}</td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}