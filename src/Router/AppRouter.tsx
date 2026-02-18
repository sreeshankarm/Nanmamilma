


import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import ProtectedRoute from "../Router/ProtectedRoute";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/signin/*" element={<AuthRouter />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainRouter />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
