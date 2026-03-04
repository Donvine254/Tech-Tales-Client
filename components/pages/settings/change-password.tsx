"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { PasswordField } from "@/components/forms/password-input";
import { PasswordStrengthMeter } from "./password-strength";
import { changeUserPassword } from "@/lib/actions/auth";
import { logoutOtherSessions } from "@/lib/actions/manage-sessions";

// ── Schema ────────────────────────────────────────────────────────────────────

const changePasswordSchema = z.object({
	currentPassword: z.string().min(1, "Current password is required"),
	newPassword: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(64, "Password must be at most 64 characters")
		.regex(/\d/, "Password must contain at least one number"),
});

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChangePassword({ userId }: { userId: number }) {
	const [revokeOtherSessions, setRevokeOtherSessions] = useState(false);

	const form = useForm<ChangePasswordForm>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
		},
	});

	const { isSubmitting, isDirty } = form.formState;

	const handleSubmit = async (values: ChangePasswordForm) => {
		try {
			// Step 1: Change password
			const res = await changeUserPassword(userId, {
				current: values.currentPassword,
				newPwd: values.newPassword,
			});

			if (!res.success) {
				toast.error(res.message);
				return;
			}

			// Step 2: Fire-and-forget session revocation — only if password changed successfully
			if (revokeOtherSessions) {
				logoutOtherSessions(userId).catch((err) => {
					console.error(err);
				});
			}

			toast.success(res.message);
			form.reset();
			setRevokeOtherSessions(false);
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong");
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				{/* Current Password */}
				<PasswordField
					name="currentPassword"
					label="Current Password"
					placeholder="Enter current password"
					autoComplete="current-password"
					disabled={isSubmitting}
				/>

				{/* New Password */}
				<PasswordField
					name="newPassword"
					label="New Password"
					placeholder="Enter new password"
					autoComplete="new-password"
					variant="register"
					disabled={isSubmitting}
					description="Must be 8–64 characters and include at least one number"
				/>

				{/* Strength meter */}
				<PasswordStrengthMeter password={form.watch("newPassword")} />

				{/* Revoke sessions checkbox */}
				<Label
					htmlFor="revoke-other-sessions"
					className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 cursor-pointer has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
				>
					<Checkbox
						id="revoke-other-sessions"
						checked={revokeOtherSessions}
						disabled={isSubmitting}
						onCheckedChange={(checked) =>
							setRevokeOtherSessions(Boolean(checked))
						}
						className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 border-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
					/>
					<div className="grid gap-1.5 font-normal">
						<p className="text-sm leading-none font-medium">
							Revoke other sessions
						</p>
						<p className="text-muted-foreground text-sm">
							All other active sessions (browsers/devices) will be logged out.
						</p>
					</div>
				</Label>

				{/* Actions */}
				<div className="flex justify-end gap-3">
					<Button
						type="button"
						variant="outline"
						disabled={!isDirty || isSubmitting}
						onClick={() => {
							form.reset();
							setRevokeOtherSessions(false);
						}}
					>
						Cancel
					</Button>

					<Button
						type="submit"
						variant="ghost"
						disabled={!isDirty || isSubmitting}
						className="bg-gradient-to-tr from-blue-500 to-blue-600 text-white hover:text-white hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Updating...
							</>
						) : (
							<>
								<Save className="w-4 h-4" />
								Change Password
							</>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
