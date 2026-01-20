import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const AdminRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/loginsingup" replace />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.role === "admin") {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  } catch (error) {
    console.error("Invalid token");
    return <Navigate to="/loginsingup" replace />;
  }
};

export default AdminRoute;
