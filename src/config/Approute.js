import {BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "../screen/AdminScreen/dashboard";
import Login from "../screen/login";
import Signup from "../screen/signup";
import Information from "../screen/UserScreen/information";
import Quiz from "../screen/UserScreen/quiz";
import TrainerRegistrationForm from "../screen/UserScreen/trainerform";
import User from "../screen/UserScreen/user";



function Approute() {
    return (
        <>
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="User" element={<User />} />
                <Route path="signup" element={<Signup />} />
                <Route path="dashboard/*" element={<DashBoard />} />
                <Route path="UserRigistrationForm" element={<Information />} />
                <Route path="Quiz" element={<Quiz />} />
                <Route path="TrainerRegistrationForm" element={<TrainerRegistrationForm />} />              
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Approute;