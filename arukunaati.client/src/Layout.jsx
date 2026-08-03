import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Header from "./Header";

export default function Layout() {

    return (

        <div className="layout">

            <Sidebar />

            <div className="main-area">

                <Header />

            <div className="content">

                <Outlet />

            </div>

            </div>
        </div>
    );
}