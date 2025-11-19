import React, { useState, useEffect } from "react";
import API from "../utils/api";
export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
    teacherId: "",
  });

  useEffect(() => {
    API.get("/auth/signup").catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <form onSubmit={submit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
        />

        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {form.role === "student" && (
          <input
            name="teacherId"
            placeholder="Teacher ID"
            onChange={handleChange}
            required
          />
        )}

        <button>Signup</button>
      </form>

      {/* Go to login link */}
      <p
        style={{
          textAlign: "center",
          marginTop: "15px",
          fontSize: "14px",
        }}
      >
        Already have an account?{" "}
        <a
          href="/login"
          style={{
            color: "#6c63ff",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Login
        </a>
      </p>
    </div>
  );
}
