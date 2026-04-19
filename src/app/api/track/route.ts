
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { path } = body;
    
    if (!path) return NextResponse.json({ error: "No path" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("artistry");
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    await db.collection("analytics").updateOne(
      { date: today, path: path },
      { $inc: { views: 1 } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to track" }, { status: 500 });
  }
}