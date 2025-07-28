"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MoveUpRight, Search } from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "../ui/dialog";
import { categories } from "@/constants";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export default function SearchBar({ className }: { className: string }) {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    const handleSearch = React.useCallback((term: string) => {
        if (term.trim()) {
            router.push(`/search?q=${encodeURIComponent(term.trim())}`)
            setOpen(false);
            setQuery("");
        }
    }, [router]);
    // function to search by voice
    const handleVoiceSearch = () => {
        /*eslint-disable */
        if (!window || typeof window === undefined) {
      return false;
    }
        // check for browser support
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setQuery(transcript);
                setTimeout(() => {
                    handleSearch(transcript);
                }, 2000)
            };
            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
            };
            recognition.start();
        } else {
            toast.error('Speech recognition is not supported in this browser.');
        }
    };
    return (
        <div className={className}>
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="w-full md:max-w-min p-2 text-gray-500 dark:text-accent-foreground hover:text-blue-600 cursor-pointer transition-colors md:flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
                title="search articles">
                <Search className="h-5 w-5 dark:group-hover:text-white" />
                <span className="md:hidden lg:block text-sm text-gray-500 dark:group-hover:text-white flex-grow text-left">
                    Search...
                </span>
                <span>Ctrl+K</span>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen} className="dark:bg-gray-900">
                <DialogTitle />
                <div className="relative">
                    <CommandInput placeholder="Search articles..." value={query} className="truncate pr-12 text-ellipsis "
                        onValueChange={setQuery} onKeyDown={(e) => {
                            if (e.key === "Enter" && query.trim()) {
                                handleSearch(query);
                            }
                        }} />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 absolute right-8 top-1/2 -translate-y-1/2 group hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full"
                                    onClick={handleVoiceSearch}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="1rem"
                                        height="1rem"
                                        className="h-4 w-4 group-hover:text-blue-500"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3m5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72z"
                                        ></path>
                                    </svg>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-72 text-sm" side="bottom">
                                <p>Search with your voice</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>

                <CommandList>
                    <CommandEmpty className="p-2">
                        <Button variant="outline" className="cursor-pointer w-full relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none bg-accent capitalize border-none"
                            onClick={() => {
                                handleSearch(query.trim());
                            }}> <Search className="mr-2 h-4 w-4" />
                            <span className="truncate text-ellipsis">{query.trim()}</span>
                            <MoveUpRight className="ml-auto h-4 w-4" /></Button>
                    </CommandEmpty>
                    <CommandGroup heading="Actions">
                        {categories.map((cat) => (
                            <CommandItem
                                key={cat.value}
                                className="hover:text-blue-500 cursor-pointer"
                                onSelect={() => {
                                    runCommand(() => {
                                        router.push(`/search?q=${cat.value.trim()}`)
                                    });
                                }}>
                                <Search className="mr-2 h-4 w-4" />
                                <span className="truncate text-ellipsis">{cat.label}</span>
                                <MoveUpRight className="ml-auto h-4 w-4" />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    );
}