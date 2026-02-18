


import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "../pages/Signin";
// import ChangePassword from "../pages/ChangePassword";

const AuthRouter = () => (
  <Routes>
    <Route path="/" element={<Signin />} />
    {/* <Route path="/change-password" element={<ChangePassword />} /> */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AuthRouter;


