export async function GET() {
    return Response.json({
        message: "Welcome to Tech Tales API",
        version: "1.0.0",
        endpoints: [
            {
                path: "/api/blogs",
                method: "GET/POST",
                description: "Retrieve or create blog posts",
                required: "POST requires authentication"
            },
            {
                path: "/api/blogs/tags",
                method: "GET",
                description: "Get available blog tags",
                required: "None"
            },
            {
                path: "/api/new",
                method: "POST",
                description: "Create new content",
                required: "Authentication"
            },
            {
                path: "/api/search",
                method: "GET",
                description: "Search blogs and content",
                required: "Query parameters"
            },
            {
                path: "/api/user/export-data",
                method: "GET",
                description: "Export user data",
                required: "Valid user session"
            }
        ],
        documentation: "For detailed API documentation, visit the repository"
    });
}