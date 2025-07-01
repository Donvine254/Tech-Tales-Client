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
                <CommandInput placeholder="Search articles..." value={query}
                    onValueChange={setQuery} onKeyDown={(e) => {
                        if (e.key === "Enter" && query.trim()) {
                            handleSearch(query);
                        }
                    }} />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
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
                                <span>{cat.label}</span>
                                <MoveUpRight className="ml-auto h-4 w-4" />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    );
}