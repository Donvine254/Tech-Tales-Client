import { Users, Target, Heart, Zap, Mail, MessageCircle, Info, UserCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SubscriptionModal from "@/components/modals/subscription-modal";
import Link from "next/link";

const About = () => {

    const values = [
        {
            icon: Users,
            title: "Inclusivity",
            description: "We celebrate diversity and strive to create a welcoming space for all tech enthusiasts."
        },
        {
            icon: Zap,
            title: "Empowerment",
            description: "We empower our community members to share their stories, connect with others, and grow their skills."
        },
        {
            icon: Heart,
            title: "Collaboration",
            description: "We believe in the power of collaboration and encourage our community to support and learn from one another."
        },
        {
            icon: Target,
            title: "Diversity",
            description: "Amplifying voices from all backgrounds to create inclusive tech narratives."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="bg-muted border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
                                <Info className="h-10 w-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-lg md:mb-4 md:text-2xl lg:text-3xl font-bold mb-6">
                            Get to Know Us
                        </h1>
                        <p className="text-sm sm:text-lg mx-auto text-primary/90 max-w-2xl leading-relaxed">
                            We&apos;re on a mission to democratize technology knowledge and make the digital world
                            more accessible to everyone, one story at a time
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 min-h-[400px]">
                    <div className="p-4 md:p-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                        <div className="text-muted-foreground text-lg leading-relaxed space-y-6">
                            <p>
                                At TechTales, our mission is to create an inclusive and welcoming community where tech enthusiasts from all walks of life can connect, share their stories, and learn from one another.
                            </p>
                            <p>
                                We believe that diversity is the key to innovation, and we are committed to amplifying the voices of underrepresented groups in the tech industry. By fostering a safe and supportive environment, we aim to inspire the next generation of tech leaders and empower them to pursue their passions.
                            </p>
                            <p>
                                We believe that what you read and write matters. Words can divide or empower us, inspire or discourage us. In a world where the most sensational and surface-level stories often win, we&apos;re building a system that rewards depth, nuance, and time well spent. A space for thoughtful conversation more than drive-by takes, and substance over packaging.
                            </p>
                            <p className='hidden lg:block'>
                                Whether you&apos;re a seasoned developer, a curious beginner, or somewhere in between, I invite you to join our community and be a part of this incredible journey. Share your experience with others and provide the resources you never had!
                            </p>
                        </div>

                    </div>
                    {/* founder card */}
                    <section className="hidden md:flex flex-col p-4 md:p-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
                            Meet the Founder
                        </h2>
                        <div className="flex flex-1 justify-center">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow max-w-md">
                                <div className="relative w-full aspect-video min-h-80 bg-gradient-to-br from-cyan-500 to-blue-500">
                                    <Image
                                        src="https://res.cloudinary.com/dipkbpinx/image/upload/v1751137632/illustrations/yt2w9fccj5uz6qyjbk2v.webp"
                                        alt="Founder"
                                        fill
                                        priority
                                        className="object-cover object-top w-full h-full transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Donvine Mugendi
                                    </h3>
                                    <p className="text-blue-500 font-medium mb-4">
                                        Founder & Editor-in-Chief
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                                        Hi, I&apos;m Don, the founder of TechTales. I am a fullstack developer and i created this community to help people from all backgrounds can share their tech stories and inspire others.
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                                        As a developer, I&apos;ve experienced firsthand the challenges of navigating the industry. TechTales is a space where we celebrate diversity, empower each other, and learn from one another&apos;s unique experiences.
                                    </p>
                                    <div className="flex space-x-3">
                                        <Link href="mailto:donvinemugendi@gmail.com" passHref className="w-full">
                                            <Button className="bg-blue-500 hover:bg-blue-700 w-full text-white cursor-pointer">
                                                <Mail className="h-4 w-4" />
                                                Hire Me
                                            </Button>
                                        </Link>
                                        <Link
                                            href="https://api.whatsapp.com/send?phone=254702018079&text=Hello%2C%20I%20want%20more%20information%20about%20tech%20tales%F0%9F%98%8A"
                                            passHref
                                            className="w-full"
                                            target="_blank"
                                        >
                                            <Button
                                                variant="outline"
                                                className="hover:bg-green-500 w-full cursor-pointer"
                                                title="whatsapp"
                                            >
                                                <MessageCircle className="h-4 w-4" />
                                                Let&apos;s Chat
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>


            {/* Values Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Values</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="bg-background dark:bg-accent p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                            <div className="flex justify-center mb-4">
                                <div className="bg-blue-50 p-3 rounded-full ">
                                    <value.icon className="h-8 w-8 text-blue-500" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Meet the Founder Section: Hidden in large devices*/}
            <section className="md:hidden px-4 py-8">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    Meet the Founder
                </h2>
                <div className="flex justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <Image
                            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1751137632/illustrations/yt2w9fccj5uz6qyjbk2v.webp"
                            alt="Founder"
                            height={300}
                            width={300}
                            priority
                            className="w-full h-auto transition-transform duration-500"
                        />

                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Donvine Mugendi
                            </h3>
                            <p className="text-blue-500 font-medium mb-4">
                                Founder & Editor-in-Chief
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                                Former tech journalist with 10+ years covering emerging technologies,
                                passionate about making tech accessible to everyone.
                            </p>
                            <div className="flex space-x-3">
                                <Link href="mailto:donvinemugendi@gmail.com" passHref className="w-full">
                                    <Button className="bg-blue-600 hover:bg-blue-700 w-full text-white cursor-pointer">
                                        <Mail className="h-4 w-4" />
                                        Hire Me
                                    </Button>
                                </Link>
                                <Link
                                    href="https://api.whatsapp.com/send?phone=254702018079&text=Hello%2C%20I%20want%20more%20information%20about%20tech%20tales%F0%9F%98%8A"
                                    passHref
                                    className="w-full"
                                    target="_blank"
                                >
                                    <Button
                                        variant="outline"
                                        className="hover:bg-green-500 w-full cursor-pointer"
                                        title="whatsapp"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Let&apos;s Chat
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 ">Join Our Community</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Become part of our growing community of tech enthusiasts. Share your stories, learn from others, and stay updated with the latest in technology.
                    </p>

                    {/* Community CTA */}
                    <div className="flex flex-row gap-4 justify-center items-center mb-5">
                        <Button asChild className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                            <Link href="/login"> <UserCircle className="h-4 w-4" />  Sign Up</Link>
                        </Button>
                        <SubscriptionModal

                        />
                    </div>

                </div>
            </section>

        </div>
    );
};

export default About;