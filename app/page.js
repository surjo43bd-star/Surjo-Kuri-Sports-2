"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    className: "",
    section: "",
    roll: "",
    school: "",
    sport: "",
    mobile: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setMessage("Registration system setup বাকি আছে।");
  }

  return (
    <main>
      <h1>SURJO KURI SPORTS</h1>
      <h2>Sports Registration Form</h2>

      <form onSubmit={submit}>
        <input name="name" placeholder="Student Name" onChange={update} required />
        <input name="className" placeholder="Class" onChange={update} required />
        <input name="section" placeholder="Section" onChange={update} required />
        <input name="roll" placeholder="Roll" onChange={update} required />
        <input name="school" placeholder="School Name" onChange={update} required />

        <select name="sport" onChange={update} required>
          <option value="">Select Sport</option>
          <option>Football</option>
          <option>Cricket</option>
          <option>Badminton</option>
          <option>Volleyball</option>
          <option>Running</option>
          <option>Other</option>
        </select>

        <input name="mobile" placeholder="Guardian Mobile Number" onChange={update} required />
        <input name="email" type="email" placeholder="Guardian Email" onChange={update} required />

        <button type="submit">Register Now</button>
      </form>

      <p>{message}</p>
    </main>
  );
}
