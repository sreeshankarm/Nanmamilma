// import { Navigate } from "react-router-dom";
// import React from "react";

// interface ProtectedRouteProps {
//   isAuth: boolean;
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   isAuth,
//   children,
// }) => {
//   if (!isAuth) {
//     return <Navigate to="/signin" replace />;
//   }
//   return <>{children}</>;
// };

// export default ProtectedRoute;





import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/auth/useAuth";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuth } = useAuth();
  return isAuth ? <>{children}</> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
