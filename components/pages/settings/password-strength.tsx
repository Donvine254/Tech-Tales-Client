import { cn } from "@/lib/utils";
import zxcvbn from "zxcvbn";

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  if (!password) {
    return { score: 0, feedback: [] };
  }

  const result = zxcvbn(password);

  // zxcvbn returns score 0-4, we'll keep it as is
  const score = result.score;

  // Extract feedback from zxcvbn
  const feedback: string[] = [];

  // Add warning if present
  if (result.feedback.warning) {
    feedback.push(result.feedback.warning);
  }

  // Add suggestions
  if (result.feedback.suggestions && result.feedback.suggestions.length > 0) {
    feedback.push(...result.feedback.suggestions);
  }

  return { score, feedback };
}

export  function PasswordStrengthMeter({
  password,
  className,
}: PasswordStrengthProps) {
  const { score, feedback } = getPasswordStrength(password);

  if (!password) return null;

  const getStrengthText = (score: number) => {
    switch (score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Very Weak";
    }
  };

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-red-400";
      case 2:
        return "bg-amber-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-red-500";
    }
  };

  const getTextColor = (score: number) => {
    switch (score) {
      case 0:
        return "text-red-600";
      case 1:
        return "text-red-500";
      case 2:
        return "text-amber-600";
      case 3:
        return "text-blue-600";
      case 4:
        return "text-green-600";
      default:
        return "text-red-600";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Password strength:</span>
        <span className={cn("font-medium", getTextColor(score))}>
          {getStrengthText(score)}
        </span>
      </div>

      {/* Progress bar with 5 segments, but fill based on zxcvbn's 0-4 score */}
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1 flex-1 rounded-full",
              level <= score ? getStrengthColor(score) : "bg-muted",
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
