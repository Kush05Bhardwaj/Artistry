// Admin Dashboard Types

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  lastActive: string;
  totalDesigns: number;
  totalRedesigns: number;
  designs: Design[];
  redesigns: Redesign[];
  activity: ActivityLogEntry[];
}

export interface Design {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  originalImage: string;
  generatedImage?: string;
  prompt: string;
  aiModel: string;
  status: 'completed' | 'pending' | 'failed';
  isFlagged: boolean;
  isFeatured: boolean;
  likes: number;
  downloads: number;
  tokenCost?: number;
  createdAt: string;
}

export interface Redesign {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  beforeImage: string;
  afterImage: string;
  category: string;
  roomType?: string;
  style?: string;
  suggestions: string[];
  status: 'approved' | 'pending' | 'rejected';
  isNSFW: boolean;
  createdAt: string;
}

export interface AnalyticsData {
  traffic: {
    date: string;
    views: number;
    uniqueVisitors: number;
  }[];
  users: {
    date: string;
    signups: number;
    activeUsers: number;
  }[];
  designs: {
    date: string;
    generations: number;
    redesigns: number;
  }[];
  devices: {
    device: string;
    percentage: number;
  }[];
  geography: {
    country: string;
    city: string;
    visitors: number;
  }[];
  browsers: {
    browser: string;
    percentage: number;
  }[];
  referrals: {
    source: string;
    visits: number;
  }[];
}

export interface AIUsage {
  totalRequests: number;
  requestsPerHour: { hour: string; count: number }[];
  modelUsage: { model: string; count: number; percentage: number }[];
  tokenConsumption: { date: string; tokens: number }[];
  estimatedCost: number;
  failedGenerations: number;
  avgGenerationTime: number;
  queueSize: number;
}

export interface SiteRoute {
  path: string;
  title: string;
  totalVisits: number;
  uniqueVisitors: number;
  avgTimeSpent: string;
  bounceRate: number;
  conversionRate: number;
  lastVisited: string;
}

export interface ActivityLogEntry {
  id: string;
  type: 'login' | 'generation' | 'redesign' | 'admin' | 'delete' | 'moderation' | 'failed' | 'suspicious';
  userId?: string;
  userName?: string;
  description: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ModerationItem {
  id: string;
  type: 'image' | 'prompt' | 'user';
  content: string;
  userId: string;
  userName: string;
  reason: string;
  aiConfidence: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  notes?: string;
}

export interface RewardEntry {
  rank: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  points: number;
  totalDesigns: number;
  totalLikes: number;
  badges: string[];
  trend: 'up' | 'down' | 'same';
}

export interface AdminNotification {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  sparklineData?: number[];
}

export interface FilterOptions {
  search?: string;
  status?: string;
  role?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
