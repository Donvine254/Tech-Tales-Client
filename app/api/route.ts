export async function GET() {
	return Response.json({
		message: "Welcome to Tech Tales API",
		version: "1.0.0",
		endpoints: [
			{
				path: "/api/v1/blogs",
				method: "GET/POST",
				description: "Retrieve or create blog posts",
				required: "POST requires authentication",
			},
			{
				path: "/api/v1/blogs/tags",
				method: "GET",
				description: "Get available blog tags",
				required: "None",
			},
			{
				path: "/api/v1/me/blogs",
				method: "POST",
				description: "Create new content",
				required: "Authentication",
			},
			{
				path: "/api/v1/search",
				method: "GET",
				description: "Search blogs and content",
				required: "Query parameters",
			},
			{
				path: "/api/me/export-data",
				method: "GET",
				description: "Export user data",
				required: "Valid user session",
			},
		],
		documentation: "For detailed API documentation, visit the repository",
	});
}
