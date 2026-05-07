import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { feedbackFormSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const parsed = feedbackFormSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid feedback payload.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("artistry");

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    const userAgent = req.headers.get("user-agent") || null;

    await db.collection("feedback").insertOne({
      ...parsed.data,
      createdAt: new Date(),
      ip,
      userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit feedback." }, { status: 500 });
  }
}
