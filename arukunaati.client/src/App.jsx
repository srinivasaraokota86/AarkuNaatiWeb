import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerForm from "./CustomerForm";
import Farmers from "./Farmers";
import FarmersList from "./FarmersList";
import CustomerList from "./CustomerList";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Profile from "./Profile";
import StatesList from "./StatesList";
import DistrictsList from "./DistrictsList";
import MandalsList from "./MandalsList";
import VillagesList from "./VillagesList";
import Village from "./Village";
import Mandal from "./Mandal";
import States from "./States";
import Districts from "./Districts";
import IntegrationSettings from "./IntegrationSettings";
import IntegrationSettingsList from "./IntegrationSettingsList";
import Procurement from "./Procurement";
import ProcurementList from "./ProcurementList";

import QualityInspection from "./QualityInspection";
import QualityInspectionList from "./QualityInspectionList";

import Weighment from "./Weighment";
import WeighmentList from "./WeighmentList";
import Payment from "./Payment";
import PaymentList from "./PaymentList";


export default function App() {
    return (
        <Router>

                {/* Routes */}
                    <Routes>
                        <Route
                            path="/"
                    element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
               >

                    <Route path="/profile" element={<Profile />} />


                        <Route path="/customer" element={<CustomerList />} />

                        <Route
                            path="/customer/create"
                            element={<CustomerForm />}
                        />
                    <Route path="/farmers" element={<FarmersList />} />
                   
                    <Route path="/farmers/create" element={<Farmers />} />
                    <Route path="/states-list" element={<StatesList />} />
                    <Route path="/districts-list" element={<DistrictsList />} />
                    <Route path="/mandals" element={<MandalsList />} />
                    <Route path="/villages" element={<VillagesList />} />
                    <Route path="/village" element={<Village />} />
                    <Route path="/mandal" element={<Mandal />} />
                    <Route path="/states" element={<States />} />
                    <Route path="/districts" element={<Districts />} />
                     {/*Procurement */}

                    <Route
                        path="/procurement"
                        element={<ProcurementList />}
                    />

                    <Route
                        path="/procurement/create"
                        element={<Procurement />}
                    />
                    {/* farmer-payments */}

                    <Route
                        path="/farmer-payments"
                        element={<PaymentList />}
                    />
                    <Route
                        path="/farmer-payments/create"
                        element={<Payment />}
                    />

                    {/* Quality Inspection */}

                    <Route
                        path="/quality-inspection-list"
                        element={<QualityInspectionList />}
                    />

                    <Route
                        path="/quality-inspection/create"
                        element={<QualityInspection />}
                    />
                    <Route
                        path="/weighment"
                        element={<Weighment />} />

                    <Route
                        path="/weighment-list"
                        element={<WeighmentList />} />


                    <Route path="/integrationSettings" element={<IntegrationSettings />} />
                    <Route path="/integrationSettingsList" element={<IntegrationSettingsList />} />

</Route>
                </Routes>
        </Router>
    );
    
}