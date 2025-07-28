const rateLimitMap = new Map<
  string,
  { count: number; lastReset: number; suspendedUntil: number | null }
>();

const LIMIT = 3;
const WINDOW_MS = 60 * 1000;
const SUSPENSION_MS = 5 * 60 * 1000;

export function rateLimitByIp(ip: string): {
  allowed: boolean;
  message?: string;
} {
  const now = Date.now();
  const ipData = rateLimitMap.get(ip) || {
    count: 0,
    lastReset: now,
    suspendedUntil: null,
  };

  if (ipData.suspendedUntil && now < ipData.suspendedUntil) {
    return {
      allowed: false,
      message: "Too many login attempts. Try again after 5 minutes.",
    };
  }

  if (now - ipData.lastReset > WINDOW_MS) {
    ipData.count = 0;
    ipData.lastReset = now;
  }

  if (ipData.count >= LIMIT) {
    ipData.suspendedUntil = now + SUSPENSION_MS;
    rateLimitMap.set(ip, ipData);
    return {
      allowed: false,
      message: "Too many login attempts. Try again after 5 minutes.",
    };
  }

  ipData.count += 1;
  rateLimitMap.set(ip, ipData);

  return { allowed: true };
}
