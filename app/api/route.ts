import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
	message:"Welcome to techtales API",
    version: "v1",
    baseUrl: "https://techtales.vercel.app/api/v1",
    docs: "https://techtales.vercel.app/api/docs",
    authentication: {
      methods: [
        "Session cookie",
        "Authorization: Bearer <api_key>",
        "?apiKey=<api_key>",
      ],
      note: "Some routes require an active browser session and do not accept API keys.",
    },
    endpoints: {
      public: {
        "GET /api/v1/blogs": {
          description: "List all published blogs",
          query: {
            page: "number (default: 1)",
            limit: "number (default: 15, max: 50)",
            orderBy: "createdAt | views | likes (default: createdAt)",
            author: "string — filter by author handle e.g. ?author=thedon",
            tags: "string[] — repeat for AND matching e.g. ?tags=typescript&tags=nextjs",
            from: "ISO 8601 date e.g. 2024-01-01T00:00:00Z",
            to: "ISO 8601 date e.g. 2024-12-31T23:59:59Z",
          },
        },
        "GET /api/v1/blogs/:id/comments": {
          description:
            "List visible comments and responses for a published blog",
          query: {
            page: "number (default: 1)",
            limit: "number (default: 15, max: 50)",
          },
          notes: [
            "Returns empty array if comments are disabled for the blog",
            "Comment bodies are returned as plain text — HTML is stripped",
          ],
        },
        "GET /api/v1/search": {
          description:
            "Fuzzy search published blogs by title, tags, and description",
          query: {
            q: "string — search query, max 100 characters",
            limit: "number (default: 15, max: 50)",
          },
        },
      },
      authenticated: {
        "GET /api/v1/me": {
          description: "Get your profile",
          auth: "session or api key",
        },
        "PATCH /api/v1/me": {
          description: "Update your profile",
          auth: "session only",
          body: {
            username: "string (min 3, max 50)",
            handle: "string (min 3, max 50)",
            bio: "string | null (max 500)",
            skills: "string | null (max 200)",
            branding: "string | null — hex color e.g. #01142d",
            picture: "string | null — valid URL",
            keep_blogs_on_delete: "boolean",
            keep_comments_on_delete: "boolean",
            preferences: {
              cookies: "boolean",
              analytics: "boolean",
              email_notifications: "boolean",
              newsletter_subscription: "boolean",
            },
          },
        },
        "DELETE /api/v1/me": {
          description: "Not available via API — visit /me/settings#security",
          auth: "none",
        },
        "GET /api/v1/me/blogs": {
          description: "List all your blogs across all statuses",
          auth: "session or api key",
          query: {
            page: "number (default: 1)",
            limit: "number (default: 15, max: 50)",
            orderBy: "createdAt | views | likes (default: createdAt)",
            status: "PUBLISHED | DRAFT | UNPUBLISHED | ARCHIVED",
            from: "ISO 8601 date",
            to: "ISO 8601 date",
          },
        },
        "POST /api/v1/me/blogs": {
          description: "Create a new blog — always created as DRAFT",
          auth: "session or api key",
          body: {
            title: "string | null (min 3, max 200)",
            description: "string | null (max 500)",
            tags: "string | null — comma separated e.g. javascript, nextjs",
            show_comments: "boolean (default: true)",
          },
          notes: [
            "body, slug, path, image, and audio can only be set via the blog editor",
            "Returns uuid — use it to open the editor at /write/:uuid",
          ],
        },
        "GET /api/v1/me/blogs/:id": {
          description: "Get a single blog by ID",
          auth: "session or api key",
        },
        "PATCH /api/v1/me/blogs/:id": {
          description: "Update a blog",
          auth: "session or api key",
          body: {
            description: "string | null (max 500)",
            tags: "string | null (max 200)",
            show_comments: "boolean",
            audio: "string | null — valid URL",
            status: "see allowed transitions below",
          },
          status_transitions: {
            PUBLISHED: ["UNPUBLISHED", "ARCHIVED"],
            UNPUBLISHED: ["DRAFT", "ARCHIVED"],
            DRAFT: "no transitions via API — publish via the editor",
            ARCHIVED: "terminal — no updates allowed",
          },
        },
        "DELETE /api/v1/me/blogs/:id": {
          description: "Delete or archive a blog",
          auth: "session or api key",
          behavior: {
            DRAFT: "permanently deleted",
            PUBLISHED: "archived to preserve comments",
            UNPUBLISHED: "archived to preserve comments",
            ARCHIVED: "no action — contact support",
          },
        },
      },
    },
  });
}
