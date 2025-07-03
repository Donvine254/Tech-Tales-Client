import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface EditorNavbarProps {
    onPreview?: () => void;
    onPublish: (e: React.FormEvent<HTMLFormElement>) => void;
    lastSaved?: Date;
}

export const EditorNavbar = ({
    onPreview,
    onPublish,
    lastSaved = new Date(),
}: EditorNavbarProps) => {
    const formatSaveTime = (date: Date) => {
        return `Last saved: ${date.toLocaleTimeString()}`;
    };

    return (
        <TooltipProvider>
            <nav className="flex items-center justify-between px-4 py-2 bg-white/90 dark:bg-gray-950 border-b border-border backdrop-blur-2xl sticky top-0 z-50">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    {/* Back button */}
                    <Button variant="ghost" size="sm" asChild className="gap-2">
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </Button>

                    {/* Draft status */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="relative">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
                                </div>
                                <span>Draft</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{formatSaveTime(lastSaved)}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    {/* Desktop view (md and up) */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={onPreview}>
                            Preview
                        </Button>
                        <Button size="sm" onClick={() => onPublish}>
                            Publish
                        </Button>
                    </div>

                    {/* Mobile view (below md) */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="sm" className="gap-2">
                                    Continue
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                                <DropdownMenuItem onClick={onPreview}>Preview</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onPublish}>Publish</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>
        </TooltipProvider>
    );
};
