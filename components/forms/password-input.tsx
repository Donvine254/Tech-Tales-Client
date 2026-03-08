import { EyeOffIcon, EyeIcon, Wand2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Box } from "@/components/ui/box";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createElement, JSX, useState } from "react";
import { toast } from "sonner";
import { generatePassword } from "@/lib/utils";

type PasswordFieldProps = {
  name?: string;
  placeholder?: string;
  description?: string | JSX.Element;
  variant?: "default" | "register";
  label?: string;
  autoComplete?: string;
  disabled?: boolean;
};

export function PasswordField({
  name = "password",
  placeholder = "Enter password",
  description,
  variant = "default",
  label = "Password",
  disabled = false,
  autoComplete = "on",
}: PasswordFieldProps) {
  const { control, getFieldState, setValue } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  /* Helper function to help users generate strong passwords */
  const handleSuggestPassword = () => {
    const suggestedPassword = generatePassword();
    setValue(name, suggestedPassword, { shouldValidate: true }); // ✅ fix

    // Copy to clipboard
    navigator.clipboard.writeText(suggestedPassword).then(() => {
      toast.info("Password copied to clipboard!");
    });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {variant === "register" ? (
            <div className="flex justify-between space-x-2 items-center">
              <FormLabel>{label}</FormLabel>
              <button
                type="button"
                disabled={disabled}
                onClick={handleSuggestPassword}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 cursor-pointer">
                <Wand2 className="w-3 h-3" />
                <span>Suggest password</span>
              </button>
            </div>
          ) : (
            <FormLabel>{label}</FormLabel>
          )}

          <FormControl>
            <Box className="relative">
              <Input
                {...field}
                autoComplete={autoComplete}
                disabled={disabled}
                type={passwordVisibility ? "text" : "password"}
                placeholder={placeholder}
                className={`pr-12 w-full text-sm bg-muted ${
                  getFieldState(name).error && "border-destructive"
                }`}
              />
              <Box
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                onClick={() => setPasswordVisibility(!passwordVisibility)}>
                {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                  className: "h-4 w-4",
                })}
              </Box>
            </Box>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
