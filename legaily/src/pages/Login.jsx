import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const mainOrange = "#ff7a1a";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);


      if (response.ok) {
        // Save token, role, and username to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("username", data.user.username);

        if (onLogin) onLogin();

        // Redirect based on role
        if (data.role === "judge") {
  navigate("/judgeview");
} else if (data.role === "lawyer") {
  navigate("/lawyerview");
}
 else {
          // fallback to home or login page if role is unexpected
          navigate("/");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Network error. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          border: `1px solid ${mainOrange}`,
          borderRadius: 16,
          padding: "40px 30px",
          width: 350,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ color: mainOrange, marginBottom: 20 }}>Login</h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px 0",
            background: mainOrange,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          Login
        </button>

        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.9rem" }}>Don't have an account? </span>
          <Link
            to="/signup"
            style={{
              color: mainOrange,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
