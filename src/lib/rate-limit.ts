interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.store[identifier];

    if (!record || now > record.resetTime) {
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return true;
    }

    if (record.count >= this.maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  getRemainingRequests(identifier: string): number {
    const record = this.store[identifier];
    if (!record || Date.now() > record.resetTime) {
      return this.maxRequests;
    }
    return Math.max(0, this.maxRequests - record.count);
  }

  getResetTime(identifier: string): number {
    const record = this.store[identifier];
    return record ? record.resetTime : Date.now();
  }

  clear() {
    this.store = {};
  }
}

// Create rate limiter instances
export const aiRequestLimiter = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'),
  parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000')
);

export const uploadLimiter = new RateLimiter(5, 60000); // 5 uploads per minute
export const authLimiter = new RateLimiter(5, 300000); // 5 auth attempts per 5 minutes

// Utility function to get user identifier
export const getUserIdentifier = (userId?: string, ip?: string): string => {
  return userId || ip || 'anonymous';
};

// Rate limit middleware for API routes
export const withRateLimit = (
  limiter: RateLimiter,
  getIdentifier: (req: any) => string
) => {
  return (handler: Function) => {
    return async (req: any, res: any) => {
      const identifier = getIdentifier(req);
      
      if (!limiter.isAllowed(identifier)) {
        const resetTime = limiter.getResetTime(identifier);
        return res.status(429).json({
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          resetTime: new Date(resetTime).toISOString(),
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
        });
      }

      return handler(req, res);
    };
  };
}; 