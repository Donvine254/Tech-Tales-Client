import { Button } from "@/components/ui/button";
import { CompassIcon, Home } from "lucide-react";
import Link from "next/link";
export default function page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted dark:bg-accent">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-8xl lg:text-9xl font-bold text-gray-300/90 dark:text-gray-500 mb-4 font-sans">404</h1>
                    <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Page Not Found</h2>
                    <p className="text-muted-foreground mb-8">
                        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="default">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="hover:bg-blue-500 hover:text-white">
                        <Link href="/featured">
                            <CompassIcon className="mr-2 h-4 w-4" />
                            Explore
                        </Link>
                    </Button>
                </div>
            </div>
        </div>)
}