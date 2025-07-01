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

export function SearchBar() {
    const [open, setOpen] = React.useState(false);
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

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="relative flex items-center max-w-xs w-full px-3 py-2 rounded-md border border-input bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer group">
                <Search className="h-4 w-4 text-gray-500 dark:group-hover:text-white mr-2" />
                <span className="text-sm text-gray-500 dark:group-hover:text-white  flex-grow text-left">
                    Search...
                </span>
                <span className="text-sm text-muted-foreground dark:group-hover:text-white ">
                    ⌘+K
                </span>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogTitle />
                <CommandInput placeholder="Search articles..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Actions">
                        {categories.map((cat) => (
                            <CommandItem
                                key={cat.value}
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
        </>
    );
}