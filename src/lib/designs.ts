import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import type { GenerateCostEstimateOutput } from "@/ai/flows/generate-cost-estimate";

export interface Design {
  _id?: ObjectId;
  userId: string;
  userEmail: string;
  originalImage: string;
  redesignedImage: string;
  roomType: string;
  style: string;
  budget: number;
  suggestions: string[];
  costEstimate?: GenerateCostEstimateOutput;
  budgetAnalysis: {
    furniture: { name: string; estimatedCost: number; productUrl?: string }[];
    decor: { name: string; estimatedCost: number; productUrl?: string }[];
    lighting: { name: string; estimatedCost: number; productUrl?: string }[];
    totalEstimated: number;
  };
  createdAt: Date;
}

export async function getDesignsCollection() {
  const client = await clientPromise;
  return client.db("artistry").collection<Design>("designs");
}

export async function saveDesign(design: Omit<Design, "_id" | "createdAt">) {
  const collection = await getDesignsCollection();
  const result = await collection.insertOne({
    ...design,
    createdAt: new Date(),
  });
  return result;
}

export async function getUserDesigns(userId: string) {
  const collection = await getDesignsCollection();
  return collection.find({ userId }).sort({ createdAt: -1 }).toArray();
}

export async function getAllDesigns(page = 1, pageSize = 20) {
  const collection = await getDesignsCollection();
  const skip = (page - 1) * pageSize;
  const [designs, total] = await Promise.all([
    collection.find({}).sort({ createdAt: -1 }).skip(skip).limit(pageSize).toArray(),
    collection.countDocuments({}),
  ]);
  return { designs, total };
}

export async function deleteDesign(id: string, userId: string) {
  const collection = await getDesignsCollection();
  return collection.deleteOne({ _id: new ObjectId(id), userId });
}

export async function getDesignStats() {
  const collection = await getDesignsCollection();
  const total = await collection.countDocuments({});
  const thisWeek = await collection.countDocuments({
    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  });
  return { total, thisWeek };
}