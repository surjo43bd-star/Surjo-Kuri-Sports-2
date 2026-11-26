
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setMessage("You are not an authorized admin.");
      setLoading(false);
      return;
    }

    const { data: records, error: recordsError } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (recordsError) {
      setMessage(recordsError.message);
    } else {
      setStudents(records);
      setLoggedIn(true);
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setLoggedIn(false);
    setStudents([]);
    setPassword("");
  }

  return (
    <main style={{ padding: 25, fontFamily: "Arial" }}>
      <h1>SURJO KURI SPORTS</h1>
      <h2>Admin Dashboard</h2>

      {!loggedIn ? (
        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br /><br />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br /><br />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Admin Login"}
          </button>
        </form>
      ) : (
        <>
          <h3>Total Registrations: {students.length}</h3>

          <button onClick={logout}>Logout</button>

          {students.map((s) => (
            <div
              key={s.id}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginTop: 15,
                borderRadius: 8,
              }}
            >
              <h3>{s.student_name}</h3>
              <p>Class: {s.class_name}</p>
              <p>Section: {s.section}</p>
              <p>Roll: {s.roll}</p>
              <p>School: {s.school_name}</p>
              <p>Sport: {s.sport}</p>
              <p>Guardian Mobile: {s.mobile}</p>
              <p>Guardian Email: {s.email}</p>
              <p>
                Date: {new Date(s.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </>
      )}

      <p>{message}</p>
    </main>
  );
}
