// // frontend/src/PrivateRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";

// /**
//  * PrivateRoute ensures:
//  * - User is logged in (has token)
//  * - User role matches the required role(s)
//  *
//  * @param {ReactNode} children - Component to render
//  * @param {string|string[]} role - Allowed role(s) for this route
//  */
// const PrivateRoute = ({ children, role }) => {
//     const token = localStorage.getItem("access_token");
//     const userRole = localStorage.getItem("role");

//     // 1️⃣ Not logged in → redirect to login
//     if (!token) {
//         return <Navigate to="/" replace />;
//     }

//     // 2️⃣ Role check → role can be string or array of allowed roles
//     if (role) {
//         if (Array.isArray(role) && !role.includes(userRole)) {
//             return <Navigate to="/" replace />;
//         } else if (typeof role === "string" && role !== userRole) {
//             return <Navigate to="/" replace />;
//         }
//     }

//     // 3️⃣ If all ok → render children
//     return children;
// };

// export default PrivateRoute;
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * PrivateRoute ensures:
 * - User is logged in (has token)
 * - User role matches the allowed role(s)
 */
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />; // Not logged in
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />; // Role mismatch

  return children;
};

export default PrivateRoute;
