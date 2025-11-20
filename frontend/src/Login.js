import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please enter both username and password");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      console.log("Step 1: Sending login request to backend...");

      // Step 1: Get JWT tokens
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/token/`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("JWT Response:", response.data);

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // Step 2: Fetch user info to get role
      console.log("Step 2: Fetching user info...");
      const userRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/me/`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      console.log("User Info:", userRes.data);

      const role = userRes.data.role;
      localStorage.setItem("role", role);

      // Step 3: Redirect based on backend role
      const roleRoutes = {
        student: "/student",
        faculty: "/faculty",
        ta: "/ta",
        admin: "/admin"
      };
      navigate(roleRoutes[role] || "/");

      setMessage("Login successful!");

    } catch (err) {
      console.error("Login error:", err);

      let errMsg = "Login failed! Please check credentials or backend.";
      if (err.response) {
        errMsg = err.response.data.detail ||
                 err.response.data.non_field_errors?.[0] ||
                 `Login failed with status ${err.response.status}`;
      } else if (err.request) {
        errMsg = "No response from server. Check API URL / CORS / backend running?";
      } else {
        errMsg = err.message;
      }

      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "50px auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Student Management System</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
          disabled={loading}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            fontSize: "16px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: message.includes("successful") ? "green" : "red",
            wordBreak: "break-word"
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;
;
