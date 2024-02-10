import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axiosConfig";

import { saved as studentSaved } from "./state/studentSlice";
import { saved as instituteSaved } from "./state/instituteSlice";
import { restored as templateRestored } from "./state/templateSlice";

import Navbar from "./pages/components/Navbar";
import Home from "./pages/components/Home";
import StudentProfile from "./pages/components/StudentProfile";
import Login from "./pages/components/Login";
import SignUp from "./pages/components/SignUp";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import InstituteProfile from "./pages/components/InstituteProfile";
import GenerateTemplate from "./pages/components/GenerateTemplate";
import GenerateCertificate from "./pages/components/GenerateCertificate";

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
          console.log("initial template", user.templateIds);
          dispatch(templateRestored(user.templateIds));
          delete user.templateIds;
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
        <Route
          path="/"
          element={<Navbar user={studentUser || instituteUser} />}
        >
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path={"/profile/:id"}
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
        <Route
          path={`/profile/:id/template-form`}
          element={<GenerateTemplate />}
        />
        <Route
          path={`/profile/:id/certificate-form`}
          element={<GenerateCertificate />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
