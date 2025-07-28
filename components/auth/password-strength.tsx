import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) score += 1;
  else feedback.push("Use at least 8 characters");

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Include lowercase letters");

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Include uppercase letters");

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push("Include numbers");

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push("Include special characters");

  return { score, feedback };
}

export function PasswordStrength({
  password,
  className,
}: PasswordStrengthProps) {
  const { score, feedback } = getPasswordStrength(password);

  if (!password) return null;

  const getStrengthText = (score: number) => {
    if (score <= 2) return "Weak";
    if (score <= 3) return "Fair";
    if (score <= 4) return "Good";
    return "Strong";
  };

  const getStrengthColor = (score: number) => {
    if (score <= 2) return "bg-destructive";
    if (score <= 3) return "bg-amber-600";
    if (score <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Password strength:</span>
        <span
          className={cn(
            "font-medium",
            score <= 2 && "text-destructive",
            score === 3 && "text-yellow-600",
            score === 4 && "text-blue-600",
            score === 5 && "text-green-600"
          )}>
          {getStrengthText(score)}
        </span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1 flex-1 rounded-full",
              level <= score ? getStrengthColor(score) : "bg-muted"
            )}
          />
        ))}
      </div>
      {feedback.length > 0 && (
        <ul className="text-xs text-muted-foreground space-y-1">
          {feedback.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
