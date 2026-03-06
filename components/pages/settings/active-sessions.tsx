"use client";
import { Chromium } from "@/assets/icons";
import WarningDialog from "@/components/modals/warning-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useListSessions } from "@/hooks/use-listSessions";
import { toast } from "sonner";
import {
	logoutAllSessions,
	logoutSessionById,
} from "@/lib/actions/manage-sessions";
import {
	Apple,
	Globe,
	Laptop,
	Loader2,
	LogOutIcon,
	Monitor,
	Smartphone,
	Tablet,
} from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UAParser } from "ua-parser-js";

function formatSessionDate(dateString: Date | string) {
	const date = new Date(dateString);
	const now = new Date();

	const isToday = date.toDateString() === now.toDateString();

	const yesterday = new Date();
	yesterday.setDate(now.getDate() - 1);
	const isYesterday = date.toDateString() === yesterday.toDateString();

	const time = date.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	if (isToday) {
		return `Today at ${time}`;
	} else if (isYesterday) {
		return `Yesterday at ${time}`;
	} else {
		return (
			date.toLocaleDateString([], {
				year: "numeric",
				month: "short",
				day: "numeric",
			}) + ` at ${time}`
		);
	}
}
// TODO: Debug why refreshing logouts the user but can still see all sessions
export default function ActiveSessions({ userId }: { userId: number }) {
	const { isLoading, refetch, sessions } = useListSessions();
	const [showWarningDialog, setShowWarningDialog] = useState(false);
	const { replace } = useRouter();

	//  Function to revoke sessions: Why does this not work?
	const handleRevokeSession = async (sessionId: string) => {
		const res = await logoutSessionById(sessionId, Number(userId));
		if (res.success) {
			toast.success("session revoked successfully");
			refetch();
		} else {
			toast.error(res.message);
		}
	};
	const handleRevokeAllSessions = async () => {
		const res = await logoutAllSessions(userId);
		if (res.success) {
			setShowWarningDialog(false);
			replace("/api/auth/logout");
		} else {
			toast.error(res.message);
		}
	};
	//function to parse user agent information
	const parseUserAgent = (userAgent: string) => {
		const parser = new UAParser(userAgent);
		const result = parser.getResult();

		const getDeviceIcon = () => {
			const deviceType = result.device.type;
			if (deviceType === "mobile") return Smartphone;
			if (deviceType === "tablet") return Tablet;
			if (result.os.name?.includes("Mac")) return Laptop;
			return Monitor;
		};

		const getBrowserIcon = () => {
			const browserName = result.browser.name?.toLowerCase();
			if (browserName?.includes("chrome")) return Chromium;
			if (browserName?.includes("safari")) return Apple;
			return Globe;
		};

		const getDeviceDisplayName = () => {
			if (result.device.vendor && result.device.model) {
				return `${result.device.vendor} ${result.device.model}`;
			}

			const deviceType = result.device.type || "desktop";
			const osName = result.os.name || "Unknown OS";

			return `${osName} ${
				deviceType.charAt(0).toUpperCase() + deviceType.slice(1)
			}`;
		};

		return {
			device: {
				type: result.device.type || "desktop",
				vendor: result.device.vendor || "",
				model: result.device.model || "",
				icon: getDeviceIcon(),
				displayName: getDeviceDisplayName(),
			},
			browser: {
				name: result.browser.name || "Unknown",
				version: result.browser.version || "",
				icon: getBrowserIcon(),
			},
			os: {
				name: result.os.name || "Unknown",
				version: result.os.version || "",
			},
		};
	};

	return (
		<div className="space-y-3 mt-2">
			{/* Header */}
			<div className="flex flex-col">
				<h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
					Active Devices
				</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					Manage devices that are currently signed in to your account
				</p>
			</div>
			{/* List active devices */}
			<div className="space-y-3 mt-1">
				{isLoading ? (
					<div className="flex flex-col gap-4 items-center py-8">
						<Loader2 className="animate-spin" />
						<p>Loading sessions..</p>
					</div>
				) : (
					sessions &&
					sessions.length > 0 &&
					sessions.map((session) => {
						const parsed = parseUserAgent(session.userAgent ?? "");
						const DeviceIcon = parsed.device.icon;

						return (
							<div
								key={session.id}
								className="flex items-start justify-between p-4 border rounded-lg"
							>
								<div className="flex items-start space-x-3">
									<div className="flex-shrink-0 p-2 bg-muted rounded-lg mt-1">
										<DeviceIcon className="h-5 w-5" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-base flex items-start gap-2">
											{parsed.os.name} {parsed.os.version}
											{session.isCurrentDevice && (
												<Badge className="py-0.5 text-xs" variant="destructive">
													Current
												</Badge>
											)}
										</p>
										<p className="text-sm text-muted-foreground">
											{parsed.browser.name} {parsed.browser.version}
										</p>
										{session.ipAddress && (
											<p className="text-sm text-muted-foreground">
												{session.ipAddress}{" "}
												{session.location && ` (${session.location})`}
											</p>
										)}
										<p className="text-sm text-muted-foreground">
											{formatSessionDate(session.createdAt)}
										</p>
									</div>
								</div>
								<div className="flex flex-col items-end space-y-2">
									{session.isCurrentDevice ? (
										<Button
											asChild
											variant="outline"
											size="sm"
											title="logout session"
											className="hover:bg-destructive hover:text-destructive-foreground border-destructive/20 text-destructive"
										>
											<Link href="/api/auth/logout" prefetch={false}>
												Logout
											</Link>
										</Button>
									) : (
										<Button
											variant="outline"
											size="sm"
											title="revoke session"
											onClick={() => handleRevokeSession(session.id)}
											className="hover:bg-destructive hover:text-destructive-foreground border-destructive/20 text-destructive"
										>
											Revoke
										</Button>
									)}
								</div>
							</div>
						);
					})
				)}
			</div>
			{!isLoading && (
				<div className="flex items-center gap-4 justify-between border-t py-4">
					<p className="text-muted-foreground text-sm">
						Logout from all sessions across all devices and browsers.
					</p>
					<Button
						variant="destructive"
						size="sm"
						title="logout from all devices"
						onClick={() => setShowWarningDialog(true)}
						className="cursor-pointer opacity-85 hover:opacity-100"
					>
						<LogOutIcon className="size-4" /> Logout All Devices
					</Button>
				</div>
			)}
			<WarningDialog
				isOpen={showWarningDialog}
				title="Are You Absolutely Sure?"
				variant="destructive"
				onClose={() => setShowWarningDialog(!showWarningDialog)}
				setIsOpen={setShowWarningDialog}
				description="You will be logged out across all devices, including the current one. Please make sure you do not have any unsaved changes."
				onConfirm={handleRevokeAllSessions}
			/>
		</div>
	);
}
