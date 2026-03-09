const rateLimitMap = new Map<
  string,
  { count: number; lastReset: number; suspendedUntil: number | null }
>();

const DEFAULT_LIMIT = 3;
const DEFAULT_WINDOW_MS = 60 * 1000;
const DEFAULT_SUSPENSION_MS = 5;

export function rateLimitByIp(
  ip?: string | null,
  options?: {
    limit?: number;
    suspensionMinutes?: number;
  },
): {
  allowed: boolean;
  message?: string;
} {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  const suspensionMinutes = options?.suspensionMinutes ?? DEFAULT_SUSPENSION_MS;
  const suspensionMs = (options?.suspensionMinutes ?? 5) * 60 * 1000;
  const suspensionLabel =
    suspensionMinutes === 1 ? "1 minute" : `${suspensionMinutes} minutes`;
  if (!ip || ip === "Unknown") {
    return {
      allowed: true,
      message: "IP not provided; skipping rate limit.",
    };
  }

  const now = Date.now();
  const ipData = rateLimitMap.get(ip) || {
    count: 0,
    lastReset: now,
    suspendedUntil: null,
  };

  if (ipData.suspendedUntil && now < ipData.suspendedUntil) {
    return {
      allowed: false,
      message: `Too many attempts. Try again after ${suspensionLabel}.`,
    };
  }

  if (now - ipData.lastReset > DEFAULT_WINDOW_MS) {
    ipData.count = 0;
    ipData.lastReset = now;
  }

  if (ipData.count >= limit) {
    ipData.suspendedUntil = now + suspensionMs;
    rateLimitMap.set(ip, ipData);
    return {
      allowed: false,
      message: `Too many attempts. Try again after ${suspensionLabel}.`,
    };
  }

  ipData.count += 1;
  rateLimitMap.set(ip, ipData);

  return { allowed: true };
}
