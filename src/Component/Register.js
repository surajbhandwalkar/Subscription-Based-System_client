import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "../Style/Register.css";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    startDate: "",
    duration: "monthly",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!form.email || !form.password || !form.startDate || !form.duration) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/auth/register",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration successful:", res.data);

      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h1><center>Register</center></h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <input name="email"type="email" placeholder="Email"value={form.email}onChange={handleChange} required />

      <input name="password"type="password"  placeholder="Password" value={form.password} onChange={handleChange} required/>

      <input name="startDate"  type="date" value={form.startDate} onChange={handleChange} required />

      <select name="duration" value={form.duration} onChange={handleChange}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <button type="submit">Register</button>

       <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
}
