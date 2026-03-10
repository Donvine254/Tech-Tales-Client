"use client";
import { Badge } from "@/components/ui/badge";
import { Lock, Key, Unlock } from "lucide-react";
import PrismLoader from "@/components/custom/prism-loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

type Param = {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
};

type Route = {
  id: string;
  method: Method;
  path: string;
  description: string;
  auth: "none" | "session_or_apikey" | "session_only";
  queryParams?: Param[];
  bodyParams?: Param[];
  sampleResponse?: string;
  notes?: string[];
};

type Section = {
  id: string;
  title: string;
  description: string;
  routes: Route[];
};

const sections: Section[] = [
  {
    id: "me",
    title: "/me",
    description: "Access and manage the authenticated user's own account data.",
    routes: [
      {
        id: "me-get",
        method: "GET",
        path: "/api/v1/me",
        description: "Returns the authenticated user's full profile data.",
        auth: "session_or_apikey",
        sampleResponse: JSON.stringify(
          {
            data: {
              id: 1,
              username: "The Don",
              email: "thedon@example.com",
              handle: "thedon",
              role: "user",
              picture: "https://res.cloudinary.com/example/image.jpg",
              bio: "Just surfing the web",
              skills: "TypeScript, Next.js",
              branding: "#01142d",
              socials: [],
              preferences: {
                cookies: true,
                analytics: false,
                email_notifications: false,
                newsletter_subscription: false,
              },
              status: "ACTIVE",
              email_verified: true,
              auth_provider: "email",
              keep_blogs_on_delete: false,
              keep_comments_on_delete: false,
              createdAt: "2024-01-15T10:00:00.000Z",
              updatedAt: "2024-06-01T12:00:00.000Z",
            },
          },
          null,
          2,
        ),
      },
      {
        id: "me-patch",
        method: "PATCH",
        path: "/api/v1/me",
        description:
          "Update the authenticated user's profile. Session only — API keys cannot update account details.",
        auth: "session_only",
        bodyParams: [
          {
            name: "username",
            type: "string",
            required: false,
            description: "Display name. Min 3, max 50 characters.",
          },
          {
            name: "handle",
            type: "string",
            required: false,
            description: "Unique handle. Min 3, max 50 characters.",
          },
          {
            name: "bio",
            type: "string | null",
            required: false,
            description: "Short biography. Max 500 characters.",
          },
          {
            name: "skills",
            type: "string | null",
            required: false,
            description: "Skills or tagline. Max 200 characters.",
          },
          {
            name: "branding",
            type: "string | null",
            required: false,
            description:
              "Profile accent color as a valid hex code e.g. #01142d.",
          },
          {
            name: "picture",
            type: "string | null",
            required: false,
            description: "Avatar URL. Must be a valid URL.",
          },
          {
            name: "keep_blogs_on_delete",
            type: "boolean",
            required: false,
            description: "Whether to keep blogs if account is deleted.",
          },
          {
            name: "keep_comments_on_delete",
            type: "boolean",
            required: false,
            description: "Whether to keep comments if account is deleted.",
          },
          {
            name: "preferences",
            type: "object",
            required: false,
            description: "Notification and cookie preferences.",
          },
          {
            name: "preferences.cookies",
            type: "boolean",
            required: false,
            description: "",
          },
          {
            name: "preferences.analytics",
            type: "boolean",
            required: false,
            description: "",
          },
          {
            name: "preferences.email_notifications",
            type: "boolean",
            required: false,
            description: "",
          },
          {
            name: "preferences.newsletter_subscription",
            type: "boolean",
            required: false,
            description: "",
          },
        ],
        notes: [
          "At least one field must be provided.",
          "Returns 409 if username or handle is already taken.",
          "Fields like role, email, password_digest, and auth_provider cannot be updated via this route.",
        ],
      },
      {
        id: "me-delete",
        method: "DELETE",
        path: "/api/v1/me",
        description:
          "Account deletion is not available via the API. Returns a redirect to the security settings page.",
        auth: "session_or_apikey",
        notes: ["Visit /me/settings#security to delete your account."],
      },
    ],
  },
  {
    id: "me-blogs",
    title: "/me/blogs",
    description: "Manage blogs belonging to the authenticated user.",
    routes: [
      {
        id: "me-blogs-get",
        method: "GET",
        path: "/api/v1/me/blogs",
        description:
          "Returns a paginated list of all blogs for the authenticated user across all statuses.",
        auth: "session_or_apikey",
        queryParams: [
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number. Defaults to 1.",
            example: "1",
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Results per page. Min 1, max 50. Defaults to 15.",
            example: "15",
          },
          {
            name: "orderBy",
            type: "string",
            required: false,
            description:
              "Sort field. One of createdAt, views, likes. Defaults to createdAt.",
            example: "views",
          },
          {
            name: "status",
            type: "string",
            required: false,
            description:
              "Filter by status. One of PUBLISHED, DRAFT, UNPUBLISHED, ARCHIVED.",
            example: "DRAFT",
          },
          {
            name: "from",
            type: "string",
            required: false,
            description:
              "Filter blogs created after this date. ISO 8601 format.",
            example: "2024-01-01T00:00:00Z",
          },
          {
            name: "to",
            type: "string",
            required: false,
            description:
              "Filter blogs created before this date. ISO 8601 format.",
            example: "2024-12-31T23:59:59Z",
          },
        ],
        sampleResponse: JSON.stringify(
          {
            data: [
              {
                uuid: "75374219-c45c-43b5-8640-e50ca2e77874",
                title: "How to Write Clean Code",
                slug: "how-to-write-clean-code",
                description: "Tips and best practices for writing clean code.",
                tags: "javascript, programming",
                status: "PUBLISHED",
                likes: 12,
                views: 1129,
                reading_time: 6,
                show_comments: true,
                image: {
                  public_id: "tech-tales/cover-images/abc123",
                  secure_url: "https://res.cloudinary.com/example/image.jpg",
                },
                path: "thedon/how-to-write-clean-code",
                createdAt: "2024-10-24T12:34:19.557Z",
                updatedAt: "2024-11-01T08:00:00.000Z",
              },
            ],
            meta: {
              page: 1,
              limit: 15,
              total: 42,
              totalPages: 3,
              hasNextPage: true,
              nextPage: 2,
            },
          },
          null,
          2,
        ),
      },
      {
        id: "me-blogs-post",
        method: "POST",
        path: "/api/v1/me/blogs",
        description:
          "Creates a new blog. Always created as DRAFT. Body is optional — you can create a blank blog and fill it in the editor.",
        auth: "session_or_apikey",
        bodyParams: [
          {
            name: "title",
            type: "string | null",
            required: false,
            description: "Blog title. Min 3, max 200 characters.",
          },
          {
            name: "description",
            type: "string | null",
            required: false,
            description: "Short description. Max 500 characters.",
          },
          {
            name: "tags",
            type: "string | null",
            required: false,
            description: "Comma-separated tags. Max 200 characters.",
            example: "javascript, webdev",
          },
          {
            name: "show_comments",
            type: "boolean",
            required: false,
            description: "Whether to show comments. Defaults to true.",
          },
        ],
        notes: [
          "body, slug, path, image, and audio can only be set via the blog editor.",
          "Blogs are always created with status DRAFT.",
          "Returns the blog uuid — use this to open the editor at /write/:uuid.",
        ],
      },
    ],
  },
  {
    id: "me-blogs-id",
    title: "/me/blogs/[id]",
    description: "Read, update, or delete a specific blog by its integer ID.",
    routes: [
      {
        id: "me-blogs-id-get",
        method: "GET",
        path: "/api/v1/me/blogs/:id",
        description:
          "Returns full metadata for a single blog belonging to the authenticated user.",
        auth: "session_or_apikey",
        sampleResponse: JSON.stringify(
          {
            data: {
              uuid: "75374219-c45c-43b5-8640-e50ca2e77874",
              title: "How to Write Clean Code",
              slug: "how-to-write-clean-code",
              description: "Tips and best practices.",
              tags: "javascript, programming",
              status: "PUBLISHED",
              likes: 12,
              views: 1129,
              reading_time: 6,
              show_comments: true,
              audio: null,
              image: {
                public_id: "abc",
                secure_url: "https://res.cloudinary.com/example/image.jpg",
              },
              path: "thedon/how-to-write-clean-code",
              createdAt: "2024-10-24T12:34:19.557Z",
              updatedAt: "2024-11-01T08:00:00.000Z",
            },
          },
          null,
          2,
        ),
      },
      {
        id: "me-blogs-id-patch",
        method: "PATCH",
        path: "/api/v1/me/blogs/:id",
        description:
          "Update allowed fields on a blog. Status transitions are restricted based on current status.",
        auth: "session_or_apikey",
        bodyParams: [
          {
            name: "description",
            type: "string | null",
            required: false,
            description: "Short description. Max 500 characters.",
          },
          {
            name: "tags",
            type: "string | null",
            required: false,
            description: "Comma-separated tags. Max 200 characters.",
          },
          {
            name: "show_comments",
            type: "boolean",
            required: false,
            description: "Toggle comments on the blog.",
          },
          {
            name: "audio",
            type: "string | null",
            required: false,
            description: "Audio URL. Must be a valid URL.",
          },
          {
            name: "status",
            type: "string",
            required: false,
            description:
              "Status transition. Restricted by current status — see notes.",
          },
        ],
        notes: [
          "PUBLISHED blogs can transition to: UNPUBLISHED, ARCHIVED.",
          "UNPUBLISHED blogs can transition to: DRAFT, ARCHIVED.",
          "DRAFT blogs cannot change status via the API — publish via the editor.",
          "ARCHIVED blogs cannot be updated at all.",
          "body, slug, path, and image remain editor-only fields.",
        ],
      },
      {
        id: "me-blogs-id-delete",
        method: "DELETE",
        path: "/api/v1/me/blogs/:id",
        description:
          "Deletes or archives a blog depending on its current status.",
        auth: "session_or_apikey",
        notes: [
          "DRAFT blogs are permanently deleted.",
          "PUBLISHED and UNPUBLISHED blogs are archived (to preserve comments).",
          "ARCHIVED blogs cannot be deleted — contact support.",
          "Returns 200 with a message indicating whether the blog was deleted or archived.",
        ],
      },
    ],
  },
  {
    id: "blogs",
    title: "/blogs",
    description:
      "Public blog endpoints. No authentication required. Only returns PUBLISHED blogs.",
    routes: [
      {
        id: "blogs-get",
        method: "GET",
        path: "/api/v1/blogs",
        description:
          "Returns a paginated list of all published blogs. Supports filtering by author handle, tags, date range, and sort order.",
        auth: "none",
        queryParams: [
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number. Defaults to 1.",
            example: "1",
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Results per page. Min 1, max 50. Defaults to 15.",
            example: "15",
          },
          {
            name: "orderBy",
            type: "string",
            required: false,
            description: "Sort field. One of createdAt, views, likes.",
            example: "views",
          },
          {
            name: "author",
            type: "string",
            required: false,
            description: "Filter by author handle (not display name).",
            example: "thedon",
          },
          {
            name: "tags",
            type: "string[]",
            required: false,
            description:
              "Filter by one or more tags. Pass multiple times for AND matching.",
            example: "tags=typescript&tags=nextjs",
          },
          {
            name: "from",
            type: "string",
            required: false,
            description: "ISO 8601 start date filter.",
            example: "2024-01-01T00:00:00Z",
          },
          {
            name: "to",
            type: "string",
            required: false,
            description: "ISO 8601 end date filter.",
            example: "2024-12-31T23:59:59Z",
          },
        ],
        sampleResponse: JSON.stringify(
          {
            data: [
              {
                id: 58,
                uuid: "75374219-c45c-43b5-8640-e50ca2e77874",
                title: "How to Write Clean Code",
                path: "thedon/how-to-write-clean-code",
                tags: "javascript, webdev, programming",
                description: "Tips and best practices for writing clean code.",
                reading_time: 6,
                createdAt: "2024-10-24T12:34:19.557Z",
                views: 1129,
                likes: 1,
                image: {
                  public_id: "abc",
                  secure_url: "https://res.cloudinary.com/example/image.jpg",
                },
                author: {
                  username: "The Don",
                  picture: "https://res.cloudinary.com/example/avatar.jpg",
                },
                _count: { comments: 4 },
              },
            ],
            meta: {
              page: 1,
              limit: 15,
              total: 120,
              totalPages: 8,
              hasNextPage: true,
              nextPage: 2,
            },
          },
          null,
          2,
        ),
      },
      {
        id: "blogs-id-comments",
        method: "GET",
        path: "/api/v1/blogs/:id/comments",
        description:
          "Returns paginated comments for a published blog, including responses. HTML is stripped from comment bodies.",
        auth: "none",
        queryParams: [
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number. Defaults to 1.",
            example: "1",
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Results per page. Min 1, max 50. Defaults to 15.",
            example: "15",
          },
        ],
        sampleResponse: JSON.stringify(
          {
            data: [
              {
                id: 12,
                body: "Let me know what you think about AI getting self-conscious.",
                createdAt: "2024-11-01T09:00:00.000Z",
                updatedAt: "2024-11-01T09:00:00.000Z",
                author: {
                  username: "The Don",
                  handle: "thedon",
                  picture: "https://res.cloudinary.com/example/avatar.jpg",
                },
                responses: [
                  {
                    id: 5,
                    body: "Great point! I think it's a fascinating topic.",
                    createdAt: "2024-11-01T10:00:00.000Z",
                    updatedAt: "2024-11-01T10:00:00.000Z",
                    author: {
                      username: "Jane Dev",
                      handle: "janedev",
                      picture: null,
                    },
                  },
                ],
              },
            ],
            meta: {
              page: 1,
              limit: 15,
              total: 8,
              totalPages: 1,
              hasNextPage: false,
              nextPage: null,
            },
          },
          null,
          2,
        ),
        notes: [
          "Returns 404 if the blog does not exist or is not published.",
          "Returns an empty data array if comments are disabled for the blog.",
          "Only VISIBLE comments and responses are returned.",
          "Comment and response bodies are returned as plain text — HTML tags are stripped.",
        ],
      },
    ],
  },
  {
    id: "search",
    title: "/search",
    description: "Full-text fuzzy search across published blogs.",
    routes: [
      {
        id: "search-get",
        method: "GET",
        path: "/api/v1/search",
        description:
          "Searches published blogs by title, tags, and description using fuzzy matching. Supports tag category expansion.",
        auth: "none",
        queryParams: [
          {
            name: "q",
            type: "string",
            required: false,
            description: "Search query. Min 1, max 100 characters.",
            example: "clean code",
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description:
              "Max results to return. Min 1, max 50. Defaults to 15.",
            example: "10",
          },
        ],
        sampleResponse: JSON.stringify(
          {
            data: [
              {
                id: 58,
                uuid: "75374219-c45c-43b5-8640-e50ca2e77874",
                title: "How to Write Clean Code",
                path: "thedon/how-to-write-clean-code",
                tags: "javascript, webdev, programming",
                description: "Tips and best practices for writing clean code.",
                reading_time: 6,
                createdAt: "2024-10-24T12:34:19.557Z",
                views: 1129,
                likes: 1,
                image: {
                  public_id: "abc",
                  secure_url: "https://res.cloudinary.com/example/image.jpg",
                },
                author: {
                  username: "The Don",
                  picture: "https://res.cloudinary.com/example/avatar.jpg",
                },
                _count: { comments: 1 },
              },
            ],
            meta: { total: 1 },
          },
          null,
          2,
        ),
        notes: [
          "Returns an empty array if no query is provided.",
          "Search is performed against title (weight 0.6), description (weight 0.2), and tags (weight 0.2).",
          "Tag category expansion is supported — searching 'javascript' may also match related tags.",
          "Results are deduplicated and capped at the limit.",
        ],
      },
    ],
  },
];

function MethodBadge({ method }: { method: Method }) {
  const variants = {
    GET: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    POST: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    PATCH: "text-amber-600 bg-amber-100",
    DELETE: "bg-destructive text-destructive-foreground",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${variants[method]}`}>
      {method}
    </span>
  );
}

function AuthBadge({ auth }: { auth: Route["auth"] }) {
  if (auth === "none") {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm font-medium">
        <Unlock className="w-3.5 h-3.5" />
        <span>Public</span>
      </div>
    );
  }

  if (auth === "session_only") {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 rounded-md text-sm font-medium">
        <Lock className="w-3.5 h-3.5" />
        <span>Session Only</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-md text-sm font-medium">
      <Key className="w-3.5 h-3.5" />
      <span>Session or API Key</span>
    </div>
  );
}

function ParamTable({ params, title }: { params: Param[]; title: string }) {
  return (
    <div className="mt-6">
      <h4 className="font-bold mb-3">{title}</h4>
      <ScrollArea className="overflow-x-auto bg-white dark:bg-gray-900  rounded-lg mt-2 border border-input shadow max-w-full">
        <Table className="table-auto divide-y w-auto min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Parameter
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Type
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Required
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {params.map((param, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-sm">
                  <code className="text-blue-600 dark:text-blue-400 font-mono bg-blue-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    {param.name}
                  </code>
                  {param.example && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      e.g., <code className="font-mono">{param.example}</code>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-sm">
                  <code>{param.type}</code>
                </TableCell>
                <TableCell className="text-sm">
                  {param.required ? (
                    <Badge variant="error">Required</Badge>
                  ) : (
                    <Badge variant="outline">Optional</Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm break-words text-muted-foreground">
                  {param.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
function RouteCard({ route }: { route: Route }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div id={route.id} className="mb-4">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <MethodBadge method={route.method} />
        <code className="flex-1 text-sm font-mono text-muted-foreground  px-3 py-1 rounded-md bg-background dark:bg-gray-600 border border-border">
          {route.path}
        </code>
        <AuthBadge auth={route.auth} />
      </div>
      <p className="mb-4 leading-relaxed">{route.description}</p>
      {route.queryParams && route.queryParams.length > 0 && (
        <ParamTable params={route.queryParams} title="Query Parameters" />
      )}

      {route.bodyParams && route.bodyParams.length > 0 && (
        <ParamTable params={route.bodyParams} title="Request Body" />
      )}

      {route.sampleResponse && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Sample Response</h4>
          <div className="relative rounded-lg p-1 border bg-[#272822] dark:bg-background overflow-hidden">
            <pre className="max-h-[450px] overflow-y-auto px-1 whitespace-pre-wrap wrap-break-word">
              <code className="language-json text-xs">
                {route.sampleResponse}
              </code>
            </pre>
          </div>
        </div>
      )}

      {route.notes && route.notes.length > 0 && (
        <div className="mt-6 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 p-4 rounded">
          <h4 className="text-sm font-bold mb-2">Important Notes</h4>
          <ul className="space-y-1.5 text-sm text-blue-800 dark:text-blue-200">
            {route.notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="hidden md:block md:sticky md:top-20 lg:top-24 bg-blue-400 dark:bg-blue-950 rounded-lg border border-border p-4 text-white w-48 shrink-0">
      <h3 className="text-lg font-semibold mb-3">Sections</h3>
      <nav className="space-y-1">
        {sections.map((section, index) => (
          <button
            type="button"
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full text-left p-2 rounded text-sm transition-colors ${
              activeSection === section.id
                ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-bold"
                : "text-white hover:bg-accent hover:text-foreground"
            }`}>
            {index + 1}. {section.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function ApiDocs() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:px-6 lg:px-8 py-12">
      <PrismLoader />
      <div className="flex items-start gap-6">
        <SectionNav />
        <div className="flex-1 min-w-0 space-y-16">
          {" "}
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <div className="mb-8">
                <Badge variant="outline">
                  <h2 className="text-lg md:text-2xl font-bold mb-3">
                    {section.title}
                  </h2>
                </Badge>
                <p className="text-muted-foreground text-base leading-relaxed max-w-3xl">
                  {section.description}
                </p>
              </div>
              <div className="space-y-6">
                {section.routes.map((route) => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
