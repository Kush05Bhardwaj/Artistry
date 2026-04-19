
"use server";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function getUserDesignsAction() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { error: "Unauthorized" };
    }

    const client = await clientPromise;
    const db = client.db("artistry");

    const designs = await db.collection("designs")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      designs: designs.map(d => ({
        id: d._id.toString(),
        originalImage: d.originalImage,
        generatedImage: d.generatedImage,
        roomType: d.roomType,
        style: d.style,
        suggestions: d.suggestions,
        costEstimate: d.costEstimate,
        createdAt: d.createdAt
      }))
    };
  } catch (err) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
    return { error: `Failed to fetch designs: ${errorMessage}` };
  }
}
