import {BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Dashboard from "../screen/dashboard";
import Login from "../screen/login";
import Signup from "../screen/signup";
import User from "../screen/user";


function Approute() {
    return (
        <>
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="dashboard/*" element={<Dashboard />} />
                <Route path="user" element={<User />} />
                
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Approute;