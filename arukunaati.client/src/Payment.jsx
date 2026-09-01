import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";
//import { Payments } from "../node_modules/@mui/icons-material/index";

export default function Payment() {

    const navigate = useNavigate();
    const location = useLocation();

    const editData = location.state;

    const [payment, setPayment] = useState({
        paymentId: editData?.paymentId || 0 ,
        farmerCode: editData?.farmerCode || "",
        farmerName: editData?.farmerName || "",
        bankName: editData?.bankName || "",
        accountNumber:editData?.accountNumber || "",
        ifscCode:editData?.ifscCode || "",
        amount: editData?. amount ||"",
        paymentMethod: editData?.paymentMethod||"",
        referenceNumber:editData?.referenceNumber || "",
        paymentDate: editData?.paymentDate ||"",
        release:editData?.release || false
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setPayment({
            ...payment,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSave = async () => {

        if (
            payment.farmerCode === "" ||
            payment.farmerName === "" ||
            payment.bankName === "" ||
            payment.accountNumber === "" ||
            payment.ifscCode === "" ||
            payment.amount === "" ||
            payment.paymentMethod === "" ||
            payment.paymentDate === ""
        ) {
            alert("Please fill all required fields.");
            return;
        }

        const data = {
            paymentId: payment.paymentId,
            farmerCode: payment.farmerCode,
            farmerName: payment.farmerName,
            bankName: payment.bankName,
            accountNumber: payment.accountNumber,
            ifscCode: payment.ifscCode,
            amount: Number(payment.amount),
            paymentMethod: payment.paymentMethod,
            referenceNumber: payment.referenceNumber,
            paymentDate: payment.paymentDate,
            release: payment.release
        };

        console.log("Sending Data :", data);

        try {

            if (editData) {

                const response = await axios.put(
                    `https://localhost:7130/api/FarmerPayment/${payment.paymentId}`,
                    data
                );
                console.log(response.data);
                alert("Payment Updated Successfully!");

            }
            else {
                await axios.post(
                    "https://localhost:7130/api/FarmerPayment",
                    data
                );

                alert("Payment Saved Successfully!");

                navigate("/farmer-payments/List");
            }

            setPayment({
                paymentId: 0,
                farmerCode: "",
                farmerName: "",
                bankName: "",
                accountNumber: "",
                ifscCode: "",
                amount: "",
                paymentMethod: "",
                referenceNumber: "",
                paymentDate: "",
                release: false
            });

            navigate("/farmer-payments");

        }
        catch (error) {

            console.log(error);

            if (error.response) {
                console.log(error.response.data);
                alert(JSON.stringify(error.response.data));
            }
            else if (error.request) {
                alert("API not reachable.");
            }
            else {
                alert(error.message);
            }
        }
    };

    return (

        <div className="payment-container">

            <div className="payment-card">

                <h2>Farmer Payment</h2>

                <hr />

                <div className="form-grid">

                    <div className="form-group">
                        <label>Farmer Code</label>
                        <input
                            type="text"
                            name="farmerCode"
                            value={payment.farmerCode}
                            onChange={handleChange}
                            placeholder="Enter Farmer Code"
                        />
                    </div>

                    <div className="form-group">
                        <label>Farmer Name</label>
                        <input
                            type="text"
                            name="farmerName"
                            value={payment.farmerName}
                            onChange={handleChange}
                            placeholder="Enter Farmer Name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Bank Name</label>
                        <input
                            type="text"
                            name="bankName"
                            value={payment.bankName}
                            onChange={handleChange}
                            placeholder="Enter Bank Name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Account Number</label>
                        <input
                            type="text"
                            name="accountNumber"
                            value={payment.accountNumber}
                            onChange={handleChange}
                            placeholder="Enter Account Number"
                        />
                    </div>

                    <div className="form-group">
                        <label>IFSC Code</label>
                        <input
                            type="text"
                            name="ifscCode"
                            value={payment.ifscCode}
                            onChange={handleChange}
                            placeholder="Enter IFSC Code"
                        />
                    </div>

                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={payment.amount}
                            onChange={handleChange}
                            placeholder="Enter Amount"
                        />
                    </div>

                    <div className="form-group">
                        <label>Payment Method</label>
                        <select
                            name="paymentMethod"
                            value={payment.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Payment Date</label>
                        <input
                            type="date"
                            name="paymentDate"
                            value={payment.paymentDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Reference Number</label>
                        <input
                            type="text"
                            name="referenceNumber"
                            value={payment.referenceNumber}
                            onChange={handleChange}
                            placeholder="Enter Reference Number"
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="release"
                                checked={payment.release}
                                onChange={handleChange}
                            />
                            Release Payment
                        </label>
                    </div>

                </div>

                <hr />

                <div className="button-area">
                    <button
                        type="button"
                        className="save-btn"
                        onClick={handleSave}
                    >
                        {editData ? "Update Payment" : "Save Payment"}
                    </button>
                </div>

            </div>

        </div>
    );
}
