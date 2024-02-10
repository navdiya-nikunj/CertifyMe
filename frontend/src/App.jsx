import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axiosConfig";

import { saved as studentSaved } from "./state/studentSlice";
import { saved as instituteSaved } from "./state/instituteSlice";

import Navbar from "./pages/components/Navbar";
import Home from "./pages/components/Home";
import StudentProfile from "./pages/components/StudentProfile";
import Login from "./pages/components/Login";
import SignUp from "./pages/components/SignUp";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import InstituteProfile from "./pages/components/InstituteProfile";

function App() {
  const dispatch = useDispatch();
  const studentUser = useSelector((state) => state.student.studentUser);
  const instituteUser = useSelector((state) => state.institute.instituteUser);

  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((res) => res.data)
      .then((user) => {
        if (user.instituteName) {
          dispatch(instituteSaved(user));
        } else {
          dispatch(studentSaved(user));
        }
      })
      .catch((error) => console.log("Hello user"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="profile"
          element={
            <ProtectedRoute user={studentUser || instituteUser}>
              {studentUser ? (
                <StudentProfile student={studentUser} />
              ) : (
                <InstituteProfile institute={instituteUser} />
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
