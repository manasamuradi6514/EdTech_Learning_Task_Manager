import React, { useState } from "react";
import API from "../utils/api";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  return (
<div className="container login-box">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button>Login</button>
      </form>
    </div>
  );
}