import {BrowserRouter, Route, Router, Routes } from "react-router-dom";
import DashBoard from "../screen/AdminScreen/dashboard";
import Login from "../screen/login";
import Signup from "../screen/signup";
import User from "../screen/UserScreen/user";



function Approute() {
    return (
        <>
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="dashboard/*" element={<DashBoard />} />
                <Route path="user/*" element={<User />} />
                
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Approute;