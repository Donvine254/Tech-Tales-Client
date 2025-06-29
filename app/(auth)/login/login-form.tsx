"use client"
import { cn, validateEmail } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { GithubIcon, MetaIcon } from "@/assets/icons"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner"
import { validateRecaptcha } from "@/lib/actions/captcha"
import GoogleAuthButton from "@/components/auth/google"
import { useRouter } from "next/navigation"

type FormStatus = 'pending' | 'loading' | 'success' | 'error';
export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const [formData, setformData] = useState({
        email: "",
        password: "",
    });
    const [status, setStatus] = useState<FormStatus>('pending');
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter()
    const origin_url = "/"
    //function to handle change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // function to login
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!token || !(await validateRecaptcha(token))) {
            toast.error("Kindly complete the recaptcha challenge");
            return;
        }
        setStatus("loading");
        // TODO: Add login logic here
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">Login to your account</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email"
                                    disabled={status === "loading"}
                                    value={formData.email}
                                    onChange={handleChange}
                                    onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        const isValid = validateEmail(input.value);
                                        if (!isValid) {
                                            input.setCustomValidity("Please enter a valid email address.");
                                        } else {
                                            input.setCustomValidity(""); // clear the custom error
                                        }
                                    }}
                                    placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/reset" className="ml-auto text-sm underline-offset-2 hover:underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input id="password" name="password" value={formData.password} disabled={status === "loading"} onChange={handleChange} type="password" required minLength={4} placeholder="********" />
                            </div>
                            <GoogleReCaptcha
                                onVerify={(token) => {
                                    setToken(token);
                                }}
                            />
                            <Button type="submit" className="w-full hover:bg-blue-500 hover:text-white" disabled={status === "loading"}>
                                {status === "loading" ? <Loader2 className="animate-spin h-4 w-4" /> : "Login"}
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background  px-2 text-muted-foreground">Or continue with</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <GoogleAuthButton router={router} origin_url={origin_url} />
                                <Button variant="outline" className="w-full hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white" title="login with github" type="button">
                                    <GithubIcon />
                                    <span className="sr-only">Login with Github</span>
                                </Button>
                                <Button variant="outline" className="w-full hover:bg-blue-100 dark:hover:bg-white " title="login with meta" onClick={() => {
                                    toast.info("upcoming feature!")
                                }}>
                                    <MetaIcon />
                                    <span className="sr-only">Login with Meta</span>
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1751137332/tech-tales/cover-images/qfqaw8mowlxahcucceg4.webp"
                            alt="Image"
                            fill
                            className="absolute inset-0 h-full w-full object-cover brightness-[0.8] bg-blend-darken dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
            </div>
        </div>
    )
}
