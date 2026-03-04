import { cn } from "@/lib/utils";
import React from "react";

export type BoxProps = React.HTMLAttributes<HTMLDivElement>;

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
	({ className, ...props }, ref) => (
		<div className={cn(className)} ref={ref} {...props} />
	),
);

Box.displayName = "Box";

export { Box };
