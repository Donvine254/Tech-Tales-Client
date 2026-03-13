"use client";
import {
  Sparkles,
  Image as ImageIcon,
  FileText,
  Hash,
  Settings,
  Eye,
  Rocket,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Keyboard,
  Target,
  Search,
  Smartphone,
  CreditCard as Edit3,
  Zap,
  RefreshCcw,
  UploadIcon,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateButton from "@/components/pages/profile/create-button";

type Section = {
  id: string;
  title: string;
};

const sections: Section[] = [
  { id: "overview", title: "Overview" },
  { id: "step-1", title: "Writing Your Title" },
  { id: "step-2", title: "Adding a Cover Image" },
  { id: "step-3", title: "Writing the Body" },
  { id: "step-4", title: "Adding Tags" },
  { id: "step-5", title: "Post Settings" },
  { id: "publishing", title: "Publishing Your Post" },
  { id: "tips", title: "Tips & Best Practices" },
];

function SectionNav() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden md:block md:sticky md:top-20 lg:top-24 bg-gray-200 dark:bg-blue-950/30 rounded-lg border border-border px-2 py-4 w-48 shrink-0">
      <h3 className="text-lg font-semibold mb-2">On This Page</h3>
      <nav className="space-y-1">
        {sections.map((section, index) => (
          <button
            type="button"
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="w-full text-left p-2 rounded text-sm transition-colors  hover:bg-accent hover:text-foreground cursor-pointer">
            {index + 1}. {section.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-start gap-6">
        <SectionNav />
        <div className="flex-1 min-w-0 space-y-6">
          {/* Overview */}
          <section id="overview" className="scroll-mt-20">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Overview</h1>
            <p className="leading-relaxed text-base">
              TechTales uses a rich-text editor (TinyMCE) with custom plugins to
              make writing and publishing blog posts effortless. Every post has
              5 main parts:{" "}
              <span className="font-semibold text-foreground">Title</span>,{" "}
              <span className="font-semibold text-foreground">Cover Image</span>
              , <span className="font-semibold text-foreground">Body</span>,{" "}
              <span className="font-semibold text-foreground">Tags</span>, and{" "}
              <span className="font-semibold text-foreground">Settings</span>.
              This guide will walk you through each step to help you create
              compelling content.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <p className="text-muted-foreground underline">
                Written by The Techtales Team
              </p>
              <p className="inline-flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4" /> 5 min read
              </p>
            </div>
          </section>
          {/* Step 1 */}
          <section id="step-1" className="scroll-mt-20">
            <div className="mb-4">
              <h2 className="text-lg md:text-2xl font-bold mb-3">
                Step 1: Writing Your Title
              </h2>
              <p className="text-base leading-relaxed max-w-3xl">
                Your title is the first thing readers see — make it count.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="text-blue-500" size={20} />
                <h3 className="text-lg font-semibold">Title Rules:</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>20–80 characters in length</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    Clear and compelling — grab your reader's attention
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="text-green-500 mt-0.5 flex-shrink-0"
                  />
                  <span>Use keywords naturally for better discoverability</span>
                </li>
              </ul>
              <p className="text-sm mt-5">
                A character counter is visible while you type, showing{" "}
                <code className="font-mono font-semibold text-foreground bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                  X/80
                </code>{" "}
                to help you stay within the optimal range.
              </p>

              <div className="bg-blue-100 dark:bg-blue-950 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                  <Lightbulb size={15} className="text-blue-500" />
                  Pro Tip
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  When you first click the title field, TechTales shows you a
                  writing tip banner with guidance on crafting great titles.
                </p>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section id="step-2" className="scroll-mt-20 my-4">
            <div className="mb-4">
              <h2 className="text-lg md:text-2xl font-bold mb-3">
                Step 2: Adding a Cover Image
              </h2>
              <p className="text-base leading-relaxed max-w-3xl">
                A strong cover image significantly increases engagement and
                social shares.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-1 mb-3">
                <ImageIcon className="text-blue-500" size={20} />
                <h3 className="text-lg font-semibold">Image Requirements: </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: "Aspect Ratio", value: "16:9" },
                  { label: "Min Resolution", value: "1280×720px" },
                  { label: "Max File Size", value: "5MB" },
                  { label: "Formats", value: "JPEG, PNG, WebP, AVIF" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{label}</p>
                      <p className="text-muted-foreground text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-100 dark:bg-blue-950 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="text-sm font-bold mb-2">Image Cropping</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  If your image doesn't match the 16:9 aspect ratio, TechTales
                  will open a built-in image cropper so you can adjust it before
                  uploading.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded">
                <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                  <Zap
                    size={15}
                    className="text-amber-600 dark:text-amber-400"
                  />
                  Performance Tip
                </h4>
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                  We recommend using{" "}
                  <a
                    href="https://tinypng.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium hover:opacity-80">
                    TinyPNG
                  </a>{" "}
                  to compress your images before uploading. It reduces file size
                  significantly with no visible quality loss.
                </p>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section id="step-3" className="scroll-mt-20 my-3">
            <div className="mb-4">
              <h2 className="text-lg md:text-2xl font-bold mb-3">
                Step 3: Writing the Body
              </h2>
              <p className="text-base leading-relaxed max-w-3xl">
                The TinyMCE editor comes packed with powerful features to
                enhance your writing experience. In the editor, click Alt+0 for
                help or click on help tab to see all available shortcuts. You
                can also learn more on how to use TinyMCE editor in their
                official page:{" "}
                <a
                  href="https://www.tiny.cloud/docs"
                  target="_blank"
                  rel="noreferrer">
                  TinyMCE docs
                </a>
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="text-blue-500" size={20} />
                <h3 className="text-base font-semibold">Editor Features</h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: <Sparkles size={16} className="text-blue-500" />,
                    title: "AI Assistant",
                    description: (
                      <>
                        Click{" "}
                        <code className="font-mono bg-gray-200 dark:bg-accent px-1.5 py-0.5 rounded text-xs border border-border">
                          Tools → AI
                        </code>{" "}
                        or use the toolbar AI button to generate or improve
                        content with AI.
                      </>
                    ),
                  },
                  {
                    icon: <FileText size={16} className="text-blue-500" />,
                    title: "Table of Contents",
                    description:
                      "Auto-generates a TOC from your headings to help readers navigate long posts.",
                  },
                  {
                    icon: (
                      <code className="text-xs text-blue-500">{`</>`}</code>
                    ),
                    title: "Code Sample",
                    description:
                      "Syntax-highlighted code blocks with language selector (uses Prism.js). Use the Monaco Editor to add code blocks in the different languages provided",
                  },
                  {
                    icon: <FileText size={16} className="text-blue-500" />,
                    title: "Word/Doc Import",
                    description:
                      "Import a .docx file directly into the editor via the toolbar.",
                  },
                  {
                    icon: <ImageIcon size={16} className="text-blue-500" />,
                    title: "Image Upload",
                    description:
                      "Drag and drop or use file picker; images are uploaded to Cloudinary.",
                  },
                  {
                    icon: null,
                    title: "Tables, Media Embeds, Accordions, Checklists",
                    description:
                      "All available in the toolbar for rich content creation.",
                  },
                ].map(({ icon, title, description }) => (
                  <div
                    key={Math.random()}
                    className="bg-white shadow-sm dark:bg-blue-900/20 rounded-xl p-4 border border-border">
                    <h4 className="font-semibold text-sm mb-1.5 flex items-center gap-2">
                      {icon}
                      {title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-100 dark:bg-blue-950 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                  <Keyboard size={15} className="text-blue-500" />
                  Keyboard Shortcuts
                </h4>
                <ul className="space-y-1.5 text-sm text-blue-800 dark:text-blue-200">
                  <li className="flex items-center gap-2">
                    <code className="font-mono bg-gray-300 dark:bg-accent  px-1.5 py-0.5 rounded text-xs border-border">
                      Alt+0
                    </code>
                    — Help menu
                  </li>
                  <li className="flex items-center gap-2">
                    <code className="font-mono bg-gray-300 dark:bg-accent  px-1.5 py-0.5 rounded text-xs border-border">
                      Ctrl+S
                    </code>
                    — Save draft
                  </li>
                  <li className="flex items-center gap-2">
                    <code className="font-mono bg-gray-300 dark:bg-accent  px-1.5 py-0.5 rounded text-xs border-border">
                      Ctrl+Shift+F
                    </code>
                    — Focus mode
                  </li>
                </ul>
              </div>

              <div className="bg-green-100 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded">
                <h4 className="text-sm font-bold mb-1 flex items-center gap-2">
                  <CheckCircle size={15} className="text-green-500" />
                  Auto-Save
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                  The editor auto-saves to localStorage. A green pulsing dot in
                  the top bar indicates auto-saving is active.
                </p>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section id="step-4" className="scroll-mt-20 my-3">
            <div className="mb-4">
              <h2 className="text-lg md:text-2xl font-bold mb-2">
                Step 4: Adding Tags
              </h2>
              <p className="text-base leading-relaxed max-w-3xl">
                Tags help readers discover your post through search and category
                browsing.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-1 mb-6">
                <Hash className="text-blue-500" size={20} />
                <h3 className="text-base font-semibold">Tag Rules</h3>
              </div>
              <ul className="space-y-3 text-sm  list-decimal">
                {[
                  <>
                    Maximum{" "}
                    <span className="font-semibold text-foreground">
                      4 tags
                    </span>{" "}
                    per post
                  </>,
                  <>
                    Maximum{" "}
                    <span className="font-semibold text-foreground">
                      15 characters
                    </span>{" "}
                    per tag
                  </>,
                  <>
                    Press{" "}
                    <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                      Enter
                    </code>{" "}
                    or{" "}
                    <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                      ,
                    </code>{" "}
                    to add a tag
                  </>,
                  <>
                    Click a tag to edit it,{" "}
                    <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                      X
                    </code>{" "}
                    to remove
                  </>,
                  <>
                    Press{" "}
                    <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                      Backspace
                    </code>{" "}
                    when input is empty to remove the last tag
                  </>,
                ].map((item) => (
                  <li
                    key={Math.random()}
                    className="flex items-start gap-2 list-decimal">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-100 dark:bg-blue-950 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                  <Sparkles size={15} className="text-blue-500" />
                  AI Tag Generation
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  Click the ✨ wand icon next to Tags to auto-generate up to 4
                  relevant tags based on your blog title. You must have a title
                  set first.
                </p>
              </div>
            </div>
          </section>

          {/* Step 5 */}
          <section id="step-5" className="scroll-mt-20 my-3">
            <div className="mb-4">
              <h2 className="text-lg md:text-2xl font-bold mb-3">
                Step 5: Post Settings
              </h2>
              <p className="text-base leading-relaxed max-w-3xl">
                Click the{" "}
                <span className="font-semibold text-foreground">Settings</span>{" "}
                button in the navbar to open the Settings modal.
              </p>
            </div>

            <div className="flex items-center gap-1 mb-3">
              <Settings className="text-blue-500" size={20} />
              <h3 className="text-lg font-semibold">Available Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white shadow-sm dark:bg-blue-900/20 rounded-xl p-4 border-border">
                <h4 className="font-semibold text-sm mb-1.5">Comments</h4>
                <p className="text-muted-foreground text-sm">
                  Choose{" "}
                  <code className="font-mono bg-gray-100 dark:bg-gray-200 dark:text-blue-800 px-1.5 py-0.5 rounded text-xs bordee-border">
                    Everyone
                  </code>{" "}
                  or{" "}
                  <code className="font-mono bg-gray-100 dark:bg-gray-200 dark:text-blue-800 px-1.5 py-0.5 rounded text-xs border-border">
                    No one (disable comments)
                  </code>
                </p>
              </div>

              <div className="bg-white shadow-sm dark:bg-blue-900/20 rounded-xl p-4 border-border">
                <h4 className="font-semibold text-sm mb-1.5">
                  Audio Voiceover
                </h4>
                <p className="text-muted-foreground text-sm">
                  Paste a direct link to an audio file (MP3, WAV, OGG, M4A). A
                  preview player appears to verify the link.
                </p>
              </div>

              <div className="bg-white shadow-sm dark:bg-blue-900/20 rounded-xl p-4 border-border">
                <h4 className="font-semibold text-sm mb-1.5">
                  SEO Description
                </h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Optional meta description. Recommended 150–160 characters. A
                  color indicator shows:
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  {[
                    { color: "bg-yellow-400", label: "Too short" },
                    { color: "bg-green-500", label: "Ideal length" },
                    { color: "bg-red-500", label: "Too long" },
                  ].map(({ color, label }) => (
                    <Badge
                      variant="outline"
                      key={label}
                      className="flex items-center gap-2 p-2">
                      <span className={`w-2.5 h-2.5 ${color} rounded-full`} />
                      {label}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm mt-3 italic">
                  The blog description will be auto-generated if left blank.
                </p>
              </div>
            </div>
          </section>

          {/* Publishing */}
          <section id="publishing" className="scroll-mt-20 my-3">
            <div className="mb-4">
              <h2 className="text-lg md:text-2xl font-bold mb-3">
                Publishing Your Post
              </h2>
              <p className="text-base leading-relaxed max-w-3xl">
                The top navbar provides several actions to manage your post.
              </p>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Rocket className="text-blue-500" size={20} />
              <h3 className="text-lg font-semibold">Navbar Actions</h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Sync Draft",
                  icon: <RefreshCcw size={15} className="text-blue-500" />,
                  description:
                    "Saves current draft to the database (only available for DRAFT posts).",
                },
                {
                  title: "Update",
                  icon: <UploadIcon size={15} className="text-blue-500" />,
                  description:
                    "Updates a previously published post with your latest changes.",
                },
                {
                  title: "Publish",
                  icon: <Sparkles size={15} className="text-blue-500" />,
                  description:
                    "Publishes the post (disabled until all required fields are filled).",
                },
                {
                  title: "Preview",
                  icon: <Eye size={15} className="text-blue-500" />,
                  description:
                    "Opens a preview dialog showing mobile and desktop views side-by-side with a simulated browser/phone frame.",
                },
                {
                  title: "Focus Mode",
                  description: (
                    <>
                      Hides distractions for distraction-free writing (
                      <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                        Ctrl+Shift+F
                      </code>
                      ).
                    </>
                  ),
                },
                {
                  title: "Delete/Archive",
                  description: "Deletes DRAFT posts, archives PUBLISHED posts.",
                },
              ].map(({ title, icon, description }) => (
                <div
                  key={title}
                  className="bg-white shadow-sm dark:bg-blue-900/20 rounded-xl p-4 border-border">
                  <h4 className="font-semibold text-sm mb-1.5 flex items-center gap-2">
                    {icon}
                    {title}
                  </h4>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section id="tips" className="scroll-mt-20 my-3">
            <div className="mb-4">
              <h2 className="text-lg md:text-2xl font-bold mb-3">
                Tips & Best Practices
              </h2>
              <p className="text-base leading-relaxed max-w-3xl">
                Follow these guidelines to get the most reach and engagement
                from your posts.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Target className="text-blue-500 mb-3" size={24} />,
                  title: "Write for Your Audience",
                  description:
                    "Know who you're writing for and tailor your content to their interests and needs.",
                  bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                },
                {
                  icon: (
                    <Search
                      className="text-green-600 dark:text-green-400 mb-3"
                      size={24}
                    />
                  ),
                  title: "Use Keywords Naturally",
                  description:
                    "Incorporate relevant keywords in your title and body for better SEO without keyword stuffing.",
                  bg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                },
                {
                  icon: (
                    <ImageIcon
                      className="text-purple-600 dark:text-purple-400 mb-3"
                      size={24}
                    />
                  ),
                  title: "Always Add a Cover Image",
                  description:
                    "Posts with images get significantly more engagement and social shares.",
                  bg: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                },
                {
                  icon: (
                    <Hash
                      className="text-orange-600 dark:text-orange-400 mb-3"
                      size={24}
                    />
                  ),
                  title: "Use All 4 Tag Slots",
                  description:
                    "Maximize discoverability by using all available tag slots for better categorization.",
                  bg: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
                },
                {
                  icon: (
                    <Smartphone
                      className="text-pink-600 dark:text-pink-400 mb-3"
                      size={24}
                    />
                  ),
                  title: "Preview in Mobile View",
                  description:
                    "Always check mobile preview before publishing — most readers are on mobile devices.",
                  bg: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
                },
                {
                  icon: (
                    <Edit3
                      className="text-indigo-600 dark:text-indigo-400 mb-3"
                      size={24}
                    />
                  ),
                  title: "Use the AI Assistant",
                  description:
                    "Overcome writer's block with AI-powered content generation and improvement suggestions.",
                  bg: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
                },
              ].map(({ icon, title, description, bg }) => (
                <div
                  key={title}
                  className={`rounded-xl p-4 shadow-sm border ${bg}`}>
                  {icon}
                  <h4 className="font-semibold text-sm mb-1.5">{title}</h4>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-blue-100 dark:bg-blue-950 border-l-4 border-blue-500 p-6 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <div>
              <h3 className="font-bold text-base mb-1">
                Ready to Start Writing?
              </h3>
              <p className="text-muted-foreground text-sm">
                Put these tips into practice and create your first blog post on
                TechTales.
              </p>
            </div>
            <CreateButton />
          </div>
        </div>
      </div>
    </div>
  );
}
