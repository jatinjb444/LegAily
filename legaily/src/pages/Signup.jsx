import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("lawyer"); // default role set to lawyer
  const navigate = useNavigate();

  const mainOrange = "#ff7a1a";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),  // role sent here
      });

      const data = await response.json();

      console.log("Signup response:", data);

      if (response.ok) {
        alert("Signup successful! Please login.");

        // Note: The role is saved in your backend database (MongoDB Atlas)
        // After signup, the user logs in and the frontend stores role locally
        // in login component (localStorage or state) for routing and access control.

        navigate("/login");
      } else {
        alert(data.message || "Signup failed. Please try again.");
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
        <h2 style={{ color: mainOrange, marginBottom: 20 }}>Sign Up</h2>

        {/* Username input */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        {/* Email input */}
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

        {/* Password input */}
        <div style={{ marginBottom: 16 }}>
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

        {/* Role selector */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          >
            <option value="lawyer">Lawyer</option>
            <option value="judge">Judge</option>
          </select>
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
          Sign Up
        </button>

        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.9rem" }}>Already have an account? </span>
          <Link
            to="/login"
            style={{
              color: mainOrange,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}
