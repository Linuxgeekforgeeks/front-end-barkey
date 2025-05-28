"use client";
import "./page.css"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/services/auth.service";
import { userAuthStore } from "@/stores/auth.store";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      const { role } = userAuthStore.getState().user;
      router.push(role === "client" ? "/" : role === "staff" ? "/staff" : "/admin");
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

return (
  <div className="login-container">
    <h2 className="login-heading">Login</h2>
    {error && <p className="login-error">{error}</p>}
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn">Login</button>
    </form>
    <p className="login-link">
      Don't have an account? <Link href="/auth/register">Register here</Link>
    </p>
  </div>
);
}