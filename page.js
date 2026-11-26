 "use client";
import { useState } from "react";
export default function Admin() {
  const [password,setPassword]=useState("");
  const [rows,setRows]=useState([]);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  async function load(e){
    e.preventDefault(); setLoading(true); setError("");
    try {
      const r=await fetch("/api/admin/registrations",{headers:{"x-admin-password":password}});
      const d=await r.json();
      if(!r.ok) throw new Error(d.error || "প্রবেশ করা যায়নি");
      setRows(d.rows || []);
    } catch(err){setError(err.message);setRows([]);}
    finally{setLoading(false);}
  }
  return <main className="wrap admin">
    <header><p className="eyebrow">PRIVATE AREA</p><h1>Admin Dashboard</h1><p className="sub">শুধু অনুমোদিত আয়োজকের জন্য</p></header>
    <form onSubmit={load}>
      <label>Admin Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
      <button disabled={loading}>{loading?"লোড হচ্ছে...":"রেজিস্ট্রেশন দেখুন"}</button>
      {error && <p className="status">{error}</p>}
    </form>
    {rows.length>0 && <section className="tablewrap"><h2>মোট রেজিস্ট্রেশন: {rows.length}</h2><div className="scroll"><table><thead><tr><th>নাম</th><th>শ্রেণি</th><th>শাখা</th><th>রোল</th><th>স্কুল</th><th>খেলা</th><th>অভিভাবকের ফোন</th><th>অভিভাবকের Email</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td>{x.student_name}</td><td>{x.class_name}</td><td>{x.section}</td><td>{x.roll_number}</td><td>{x.school_name}</td><td>{x.sport}</td><td>{x.guardian_phone}</td><td>{x.guardian_email}</td></tr>)}</tbody></table></div></section>}
    <p className="back"><a href="/">← Registration Form</a></p>
  </main>;
}