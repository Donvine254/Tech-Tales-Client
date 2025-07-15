import React from "react";

interface PasswordStrengthProps {
  password: string;
}

const PasswordCriteria: React.FC<PasswordStrengthProps> = ({ password }) => {
  const criteria = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 flex items-center flex-wrap gap-x-4  space-y-1 w-full">
      {criteria.map((item) => (
        <div
          key={item.label}
          className="flex justify-between md:gap-1 md:justify-normal items-center text-xs">
          {item.met ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500 mr-2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 text-gray-500 mr-2">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter: React.FC<PasswordStrengthProps> = ({
  password,
}) => {
  const getStrength = (pass: string): number => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z\d]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (level: number): string => {
    if (level <= 1) return "bg-red-500";
    if (level === 2) return "bg-yellow-500";
    if (level === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrengthText = (level: number): string => {
    switch (level) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      default:
        return "Strong";
    }
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="flex justify-between w-full space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColor(strength) : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
