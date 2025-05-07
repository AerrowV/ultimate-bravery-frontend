import { Navigate } from "react-router-dom";
import facade from "../apiFacade";

function ProtectedRoute({ children, neededRole, loggedIn }) {
  if (!facade.hasUserAccess(neededRole, loggedIn)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
