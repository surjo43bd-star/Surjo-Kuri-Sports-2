import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const body = await req.json();
    const required = ["name","className","section","roll","school","sport","guardianPhone","guardianEmail"];
    for (const key of required) {
      if (!String(body[key] || "").trim()) return NextResponse.json({error:"সব প্রয়োজনীয় ঘর পূরণ করো।"},{status:400});
    }
    if (body.consent !== true) return NextResponse.json({error:"অভিভাবকের সম্মতি প্রয়োজন।"},{status:400});
    if (String(body.name).length > 100 || String(body.school).length > 150) return NextResponse.json({error:"তথ্য খুব বড় হয়েছে।"},{status:400});
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return NextResponse.json({error:"সার্ভার এখনো সেটআপ করা হয়নি।"},{status:500});
    const supabase = createClient(url, key, {auth:{persistSession:false}});
    const { error } = await supabase.from("sports_registrations").insert([{
      student_name:String(body.name).trim(),
      class_name:String(body.className).trim(),
      section:String(body.section).trim(),
      roll_number:String(body.roll).trim(),
      school_name:String(body.school).trim(),
      sport:String(body.sport).trim(),
      guardian_phone:String(body.guardianPhone).trim(),
      guardian_email:String(body.guardianEmail).trim()
    }]);
    if (error) throw error;
    return NextResponse.json({ok:true});
  } catch {
    return NextResponse.json({error:"রেজিস্ট্রেশন জমা হয়নি। পরে আবার চেষ্টা করো।"},{status:500});
  }
}