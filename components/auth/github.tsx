import { GithubIcon } from "@/assets/icons";
import { Button } from "../ui/button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Props = {
    origin_url?: string,
    router: AppRouterInstance
}

export default function GithubButton({ router }: Props) {

    const clientID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!
    const loginWithGithub = () => {
        router.replace(`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=http://localhost:3000/api/auth/callback`)
    }
    return (
        <Button variant="outline" className="w-full hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white" title="login with github" type="button" onClick={loginWithGithub}>
            <GithubIcon />
            <span className="sr-only">Login with Github</span>
        </Button>)
}