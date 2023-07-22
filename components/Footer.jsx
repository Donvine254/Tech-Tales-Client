import Link from "next/link"
import {FaFacebookF, FaTwitter, FaYoutube, FaGithub} from 'react-icons/fa'

export default function Footer(){
    return (
        <footer className="max-w-7xl w-full mx-auto m-5 p-4 absolute bottom-0">
            <h1 className="p-2 px-4"><span className=" md:text-2xl font-bold">Tech Tales</span>- An inclusive social network blog for software developers</h1>
            <div className="flex flex-col md:justify-between md:flex-row align-center md:gap-2">
                <Link href="/"className="navigation__footer">
                    Code of Conduct
                </Link>
                <Link href="/"className="navigation__footer">
                    Privacy Policy
                </Link>
                <Link href="/"className="navigation__footer">
                    Terms of Use
                </Link>
            </div>
            <hr/>
            <div className="flex justify-between align-center mt-2">
                <h1 className="md:text-xl">&copy; 2023 Tech Tales</h1>
                <div className="flex gap-2">
                    <FaFacebookF className="md:text-xl text-blue-950 dark:text-white"/>
                    <FaTwitter className="md:text-xl  text-blue-950 dark:text-white"/>
                    <FaGithub className="md:text-xl"/>
                    <FaYoutube className="md:text-xl text-red-600"/>
                </div>
            </div>

        </footer>
    )
}