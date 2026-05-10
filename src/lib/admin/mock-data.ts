import { User, Design, Redesign, AnalyticsData, AIUsage, SiteRoute, ActivityLogEntry, ModerationItem, RewardEntry, AdminNotification } from '@/types/admin';

// Generate random date within last N days
const randomDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * days));
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  return date.toISOString();
};

// Generate sparkline data (7 points)
export const generateSparkline = (trend: 'up' | 'down' | 'stable' = 'stable') => {
  const base = Math.floor(Math.random() * 50) + 10;
  return Array.from({ length: 7 }, (_, i) => {
    const variance = Math.random() * 20 - 10;
    const trendFactor = trend === 'up' ? i * 2 : trend === 'down' ? -i * 2 : 0;
    return Math.max(1, base + variance + trendFactor);
  });
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    avatar: 'https://i.pravatar.cc/150?u=priya',
    role: 'user',
    status: 'active',
    createdAt: randomDate(90),
    lastActive: randomDate(1),
    totalDesigns: 24,
    totalRedesigns: 12,
    designs: [],
    redesigns: [],
    activity: [],
  },
  {
    id: '2',
    name: 'Rahul Verma',
    email: 'rahul.v@outlook.com',
    avatar: 'https://i.pravatar.cc/150?u=rahul',
    role: 'user',
    status: 'active',
    createdAt: randomDate(60),
    lastActive: randomDate(2),
    totalDesigns: 18,
    totalRedesigns: 8,
    designs: [],
    redesigns: [],
    activity: [],
  },
  {
    id: '3',
    name: 'Ananya Patel',
    email: 'ananya.patel@yahoo.com',
    avatar: 'https://i.pravatar.cc/150?u=ananya',
    role: 'admin',
    status: 'active',
    createdAt: randomDate(120),
    lastActive: randomDate(0),
    totalDesigns: 156,
    totalRedesigns: 89,
    designs: [],
    redesigns: [],
    activity: [],
  },
  {
    id: '4',
    name: 'Vikram Singh',
    email: 'vikram.singh@rediff.com',
    avatar: 'https://i.pravatar.cc/150?u=vikram',
    role: 'user',
    status: 'suspended',
    createdAt: randomDate(45),
    lastActive: randomDate(30),
    totalDesigns: 5,
    totalRedesigns: 2,
    designs: [],
    redesigns: [],
    activity: [],
  },
  {
    id: '5',
    name: 'Meera Joshi',
    email: 'meera.joshi@gmail.com',
    avatar: 'https://i.pravatar.cc/150?u=meera',
    role: 'user',
    status: 'active',
    createdAt: randomDate(30),
    lastActive: randomDate(1),
    totalDesigns: 31,
    totalRedesigns: 15,
    designs: [],
    redesigns: [],
    activity: [],
  },
  {
    id: '6',
    name: 'Arjun Nair',
    email: 'arjun.nair@icloud.com',
    avatar: 'https://i.pravatar.cc/150?u=arjun',
    role: 'moderator',
    status: 'active',
    createdAt: randomDate(100),
    lastActive: randomDate(0),
    totalDesigns: 78,
    totalRedesigns: 45,
    designs: [],
    redesigns: [],
    activity: [],
  },
  {
    id: '7',
    name: 'Kavya Reddy',
    email: 'kavya.reddy@gmail.com',
    avatar: 'https://i.pravatar.cc/150?u=kavya',
    role: 'user',
    status: 'pending',
    createdAt: randomDate(3),
    lastActive: randomDate(3),
    totalDesigns: 0,
    totalRedesigns: 0,
    designs: [],
    redesigns: [],
    activity: [],
  },
  {
    id: '8',
    name: 'Siddharth Gupta',
    email: 'sid.gupta@hotmail.com',
    avatar: 'https://i.pravatar.cc/150?u=sid',
    role: 'user',
    status: 'active',
    createdAt: randomDate(75),
    lastActive: randomDate(5),
    totalDesigns: 42,
    totalRedesigns: 23,
    designs: [],
    redesigns: [],
    activity: [],
  },
];

// Mock Designs
export const mockDesigns: Design[] = [
  {
    id: 'd1',
    userId: '1',
    userName: 'Priya Sharma',
    userEmail: 'priya.sharma@gmail.com',
    originalImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    generatedImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400',
    prompt: 'Modern minimalist living room with neutral tones',
    aiModel: 'flux-dev',
    status: 'completed',
    isFlagged: false,
    isFeatured: true,
    likes: 45,
    downloads: 12,
    tokenCost: 1250,
    createdAt: randomDate(7),
  },
  {
    id: 'd2',
    userId: '2',
    userName: 'Rahul Verma',
    userEmail: 'rahul.v@outlook.com',
    originalImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
    generatedImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
    prompt: 'Bohemian style bedroom with natural materials',
    aiModel: 'flux-dev',
    status: 'completed',
    isFlagged: false,
    isFeatured: false,
    likes: 23,
    downloads: 5,
    tokenCost: 980,
    createdAt: randomDate(5),
  },
  {
    id: 'd3',
    userId: '5',
    userName: 'Meera Joshi',
    userEmail: 'meera.joshi@gmail.com',
    originalImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    generatedImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    prompt: 'Industrial kitchen with exposed brick and metal accents',
    aiModel: 'flux-dev',
    status: 'completed',
    isFlagged: true,
    isFeatured: false,
    likes: 67,
    downloads: 18,
    tokenCost: 1450,
    createdAt: randomDate(3),
  },
  {
    id: 'd4',
    userId: '8',
    userName: 'Siddharth Gupta',
    userEmail: 'sid.gupta@hotmail.com',
    originalImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
    generatedImage: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400',
    prompt: 'Scandinavian design office space with natural light',
    aiModel: 'flux-dev',
    status: 'failed',
    isFlagged: false,
    isFeatured: false,
    likes: 0,
    downloads: 0,
    tokenCost: 150,
    createdAt: randomDate(2),
  },
  {
    id: 'd5',
    userId: '1',
    userName: 'Priya Sharma',
    userEmail: 'priya.sharma@gmail.com',
    originalImage: 'https://images.unsplash.com/photo-1583845112203-2932998b7869?w=400',
    generatedImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400',
    prompt: 'Luxury bathroom with marble and gold fixtures',
    aiModel: 'flux-dev',
    status: 'completed',
    isFlagged: false,
    isFeatured: true,
    likes: 89,
    downloads: 24,
    tokenCost: 1680,
    createdAt: randomDate(1),
  },
  {
    id: 'd6',
    userId: '3',
    userName: 'Ananya Patel',
    userEmail: 'ananya.patel@yahoo.com',
    originalImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400',
    generatedImage: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400',
    prompt: 'Contemporary kids room with playful colors',
    aiModel: 'flux-dev',
    status: 'pending',
    isFlagged: false,
    isFeatured: false,
    likes: 0,
    downloads: 0,
    tokenCost: 0,
    createdAt: randomDate(0),
  },
];

// Mock Redesigns
export const mockRedesigns: Redesign[] = [
  {
    id: 'r1',
    userId: '1',
    userName: 'Priya Sharma',
    userEmail: 'priya.sharma@gmail.com',
    beforeImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
    afterImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600',
    category: 'living-room',
    roomType: 'Living Room',
    style: 'Modern',
    suggestions: ['Neutral sofa', 'Floor lamp', 'Rug', 'Plants'],
    status: 'approved',
    isNSFW: false,
    createdAt: randomDate(5),
  },
  {
    id: 'r2',
    userId: '2',
    userName: 'Rahul Verma',
    userEmail: 'rahul.v@outlook.com',
    beforeImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
    category: 'bedroom',
    roomType: 'Bedroom',
    style: 'Bohemian',
    suggestions: ['Canopy bed', 'Macrame', 'Plants', 'Warm lighting'],
    status: 'pending',
    isNSFW: false,
    createdAt: randomDate(3),
  },
  {
    id: 'r3',
    userId: '5',
    userName: 'Meera Joshi',
    userEmail: 'meera.joshi@gmail.com',
    beforeImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
    category: 'kitchen',
    roomType: 'Kitchen',
    style: 'Industrial',
    suggestions: ['Exposed brick', 'Metal fixtures', 'Open shelving'],
    status: 'rejected',
    isNSFW: false,
    createdAt: randomDate(2),
  },
];

// Mock Analytics
export const mockAnalytics: AnalyticsData = {
  traffic: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    views: Math.floor(Math.random() * 500) + 200,
    uniqueVisitors: Math.floor(Math.random() * 300) + 100,
  })),
  users: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    signups: Math.floor(Math.random() * 10) + 2,
    activeUsers: Math.floor(Math.random() * 50) + 20,
  })),
  designs: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    generations: Math.floor(Math.random() * 30) + 5,
    redesigns: Math.floor(Math.random() * 15) + 3,
  })),
  devices: [
    { device: 'Desktop', percentage: 58 },
    { device: 'Mobile', percentage: 35 },
    { device: 'Tablet', percentage: 7 },
  ],
  geography: [
    { country: 'India', city: 'Mumbai', visitors: 12450 },
    { country: 'India', city: 'Delhi', visitors: 9820 },
    { country: 'India', city: 'Bangalore', visitors: 7650 },
    { country: 'USA', city: 'New York', visitors: 4520 },
    { country: 'UK', city: 'London', visitors: 3210 },
    { country: 'India', city: 'Chennai', visitors: 2890 },
  ],
  browsers: [
    { browser: 'Chrome', percentage: 64 },
    { browser: 'Safari', percentage: 18 },
    { browser: 'Firefox', percentage: 10 },
    { browser: 'Edge', percentage: 6 },
    { browser: 'Others', percentage: 2 },
  ],
  referrals: [
    { source: 'Google', visits: 12450 },
    { source: 'Direct', visits: 8920 },
    { source: 'Social', visits: 4560 },
    { source: 'External Links', visits: 2340 },
  ],
};

// Mock AI Usage
export const mockAIUsage: AIUsage = {
  totalRequests: 15847,
  requestsPerHour: Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    count: Math.floor(Math.random() * 200) + 50,
  })),
  modelUsage: [
    { model: 'Flux Dev', count: 12450, percentage: 78 },
    { model: 'Gemini Flash', count: 2897, percentage: 18 },
    { model: 'Stable Diffusion', count: 500, percentage: 4 },
  ],
  tokenConsumption: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tokens: Math.floor(Math.random() * 500000) + 100000,
  })),
  estimatedCost: 234.50,
  failedGenerations: 127,
  avgGenerationTime: 12.5,
  queueSize: 3,
};

// Mock Site Routes
export const mockSiteRoutes: SiteRoute[] = [
  { path: '/', title: 'Home', totalVisits: 45230, uniqueVisitors: 18450, avgTimeSpent: '1m 32s', bounceRate: 42, conversionRate: 3.2, lastVisited: randomDate(0) },
  { path: '/design', title: 'Design Studio', totalVisits: 32150, uniqueVisitors: 12890, avgTimeSpent: '3m 45s', bounceRate: 28, conversionRate: 8.5, lastVisited: randomDate(0) },
  { path: '/redesign', title: 'Redesign Gallery', totalVisits: 18920, uniqueVisitors: 8920, avgTimeSpent: '4m 12s', bounceRate: 32, conversionRate: 6.8, lastVisited: randomDate(0) },
  { path: '/about', title: 'About Us', totalVisits: 8760, uniqueVisitors: 7650, avgTimeSpent: '1m 15s', bounceRate: 55, conversionRate: 1.2, lastVisited: randomDate(1) },
  { path: '/account', title: 'User Account', totalVisits: 6540, uniqueVisitors: 2340, avgTimeSpent: '2m 30s', bounceRate: 15, conversionRate: 0, lastVisited: randomDate(0) },
  { path: '/admin', title: 'Admin Panel', totalVisits: 2340, uniqueVisitors: 12, avgTimeSpent: '8m 45s', bounceRate: 5, conversionRate: 0, lastVisited: randomDate(0) },
];

// Mock Activity Logs
export const mockActivityLogs: ActivityLogEntry[] = [
  { id: 'al1', type: 'login', userId: '1', userName: 'Priya Sharma', description: 'User logged in successfully', severity: 'info', timestamp: randomDate(0) },
  { id: 'al2', type: 'generation', userId: '2', userName: 'Rahul Verma', description: 'Generated living room design', severity: 'info', timestamp: randomDate(0) },
  { id: 'al3', type: 'moderation', userId: '6', userName: 'Arjun Nair', description: 'Approved redesign submission', severity: 'info', timestamp: randomDate(0) },
  { id: 'al4', type: 'failed', userId: '8', userName: 'Siddharth Gupta', description: 'AI generation failed - timeout', severity: 'error', timestamp: randomDate(0) },
  { id: 'al5', type: 'admin', userId: '3', userName: 'Ananya Patel', description: 'Promoted user to moderator', severity: 'warning', timestamp: randomDate(1) },
  { id: 'al6', type: 'suspicious', userId: '4', userName: 'Vikram Singh', description: 'Multiple failed login attempts detected', severity: 'critical', timestamp: randomDate(1) },
  { id: 'al7', type: 'delete', userId: '3', userName: 'Ananya Patel', description: 'Deleted flagged design', severity: 'warning', timestamp: randomDate(2) },
  { id: 'al8', type: 'redesign', userId: '5', userName: 'Meera Joshi', description: 'Submitted redesign for approval', severity: 'info', timestamp: randomDate(2) },
];

// Mock Moderation Queue
export const mockModerationQueue: ModerationItem[] = [
  { id: 'm1', type: 'image', content: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', userId: '5', userName: 'Meera Joshi', reason: 'Potential NSFW content', aiConfidence: 0.78, status: 'pending', createdAt: randomDate(1) },
  { id: 'm2', type: 'prompt', content: 'Adult themed furniture arrangement', userId: '4', userName: 'Vikram Singh', reason: 'Inappropriate prompt', aiConfidence: 0.92, status: 'pending', createdAt: randomDate(2) },
  { id: 'm3', type: 'image', content: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400', userId: '8', userName: 'Siddharth Gupta', reason: 'Failed generation quality', aiConfidence: 0.65, status: 'pending', createdAt: randomDate(3) },
];

// Mock Rewards Leaderboard
export const mockRewards: RewardEntry[] = [
  { rank: 1, userId: '3', userName: 'Ananya Patel', userAvatar: 'https://i.pravatar.cc/150?u=ananya', points: 2450, totalDesigns: 156, totalLikes: 890, badges: ['Top Creator', 'Early Adopter'], trend: 'same' },
  { rank: 2, userId: '6', userName: 'Arjun Nair', userAvatar: 'https://i.pravatar.cc/150?u=arjun', points: 1980, totalDesigns: 78, totalLikes: 567, badges: ['Pro Designer'], trend: 'up' },
  { rank: 3, userId: '8', userName: 'Siddharth Gupta', userAvatar: 'https://i.pravatar.cc/150?u=sid', points: 1650, totalDesigns: 42, totalLikes: 423, badges: ['Rising Star'], trend: 'down' },
  { rank: 4, userId: '1', userName: 'Priya Sharma', userAvatar: 'https://i.pravatar.cc/150?u=priya', points: 1420, totalDesigns: 24, totalLikes: 312, badges: ['Active Creator'], trend: 'up' },
  { rank: 5, userId: '5', userName: 'Meera Joshi', userAvatar: 'https://i.pravatar.cc/150?u=meera', points: 1290, totalDesigns: 31, totalLikes: 287, badges: ['Active Creator'], trend: 'same' },
];

// Mock Notifications
export const mockNotifications: AdminNotification[] = [
  { id: 'n1', type: 'error', title: 'Generation Failed', message: 'flux-dev timeout for user priya.sharma@gmail.com', timestamp: randomDate(0), isRead: false },
  { id: 'n2', type: 'warning', title: 'Suspicious Activity', message: 'Multiple failed logins detected for user vikram.singh@rediff.com', timestamp: randomDate(1), isRead: false },
  { id: 'n3', type: 'info', title: 'New Signups', message: '12 new users registered today', timestamp: randomDate(0), isRead: true },
  { id: 'n4', type: 'success', title: 'Milestone Reached', message: 'Platform crossed 1000 total designs generated!', timestamp: randomDate(2), isRead: true },
];

// Stats for dashboard overview
export const getMockStats = () => ({
  totalUsers: { value: 1247, change: 12.5, trend: 'up' as const, sparkline: generateSparkline('up') },
  activeUsersToday: { value: 89, change: 8.2, trend: 'up' as const, sparkline: generateSparkline('up') },
  totalDesigns: { value: 3842, change: 15.3, trend: 'up' as const, sparkline: generateSparkline('up') },
  totalRedesigns: { value: 1247, change: 9.8, trend: 'up' as const, sparkline: generateSparkline('up') },
  totalVisits: { value: 156842, change: -2.1, trend: 'down' as const, sparkline: generateSparkline('down') },
  aiRequestsToday: { value: 456, change: 23.4, trend: 'up' as const, sparkline: generateSparkline('up') },
  avgSessionDuration: { value: '3m 42s', change: 5.2, trend: 'up' as const, sparkline: generateSparkline('up') },
  bounceRate: { value: '34.2%', change: -1.8, trend: 'down' as const, sparkline: generateSparkline('down') },
  newSignupsToday: { value: 23, change: 45.2, trend: 'up' as const, sparkline: generateSparkline('up') },
});