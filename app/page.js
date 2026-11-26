
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
  const [loading, setLoading] = useState(false);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("registrations")
        .insert([{
          student_name: form.name,
          class_name: form.className,
          section: form.section,
          roll: form.roll,
          school_name: form.school,
          sport: form.sport,
          mobile: form.mobile,
          email: form.email,
        }]);

      if (error) throw error;

      setMessage("Registration Successful!");
      setForm({
        name: "",
        className: "",
        section: "",
        roll: "",
        school: "",
        sport: "",
        mobile: "",
        email: "",
      });
    } catch (error) {
      setMessage("Registration Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>SURJO KURI SPORTS</h1>
      <h2>Sports Registration Form</h2>

      <form onSubmit={submit}>
        <input name="name" placeholder="Student Name" value={form.name} onChange={update} required />
        <input name="className" placeholder="Class" value={form.className} onChange={update} required />
        <input name="section" placeholder="Section" value={form.section} onChange={update} required />
        <input name="roll" placeholder="Roll" value={form.roll} onChange={update} required />
        <input name="school" placeholder="School Name" value={form.school} onChange={update} required />

        <select name="sport" value={form.sport} onChange={update} required>
          <option value="">Select Sport</option>
          <option>Football</option>
          <option>Cricket</option>
          <option>Badminton</option>
          <option>Volleyball</option>
          <option>Running</option>
          <option>Other</option>
        </select>

        <input name="mobile" placeholder="Guardian Mobile Number" value={form.mobile} onChange={update} required />
        <input name="email" type="email" placeholder="Guardian Email" value={form.email} onChange={update} required />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register Now"}
        </button>
      </form>

      <p>{message}</p>
    </main>
  );
}
