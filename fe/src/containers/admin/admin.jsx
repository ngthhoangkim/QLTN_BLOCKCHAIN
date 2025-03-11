import React from "react";
import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import Sidebar from "./sidebar";


const Admin = () => {
    const { isLoggedIn, role } = useSelector(state => state.auth);

    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    if (role !== 'admin') return <Navigate to={'/'} />;

    return (
        <div className='w-full overflow-hidden'>
            {/* sidebar */}
            <div className="fixed top-0 left-0 w-64 z-50">
                <Sidebar />
            </div>
            {/* main content area */}
            <div className="ml-64">
                <Outlet />
            </div>
        </div>

    )
}

export default Admin