import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user }) {
  console.log("Protected route", user);
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;
