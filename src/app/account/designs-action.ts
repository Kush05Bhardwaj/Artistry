"use server";

import { auth } from "@/lib/auth";
import { getUserDesigns } from "@/lib/designs";

export async function getUserDesignsAction() {
  try {
    const session = await auth();

    if (!session?.user) {
      return { error: "Please sign in to view your designs" };
    }

    const userId = session.user.id ?? session.user.email;
    if (!userId) {
      return { error: "Missing user identity", designs: [] };
    }

    const designs = await getUserDesigns(userId);

    return { designs };
  } catch (err) {
    console.error("Error fetching designs:", err);
    return { error: "Failed to fetch designs", designs: [] };
  }
}

export async function deleteDesignAction(designId: string) {
  try {
    const session = await auth();

    if (!session?.user) {
      return { error: "Please sign in" };
    }

    const { deleteDesign } = await import("@/lib/designs");
    const userId = session.user.id ?? session.user.email;
    if (!userId) {
      return { error: "Missing user identity" };
    }
    await deleteDesign(designId, userId);

    return { success: true };
  } catch (err) {
    console.error("Error deleting design:", err);
    return { error: "Failed to delete design" };
  }
}