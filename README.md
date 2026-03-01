# Tech Tales Client 🚀

**Tech Tales** is a modern blogging platform built with [Next.js](https://nextjs.org) and TypeScript. This repository contains the **client-side application** responsible for rendering posts, handling user authentication, interacting with APIs, and providing a rich, responsive user interface.

---

## 📌 Features

- Full **Next.js App Router** implementation with server and client components
- Social sharing (Facebook, Twitter, WhatsApp, Reddit, etc.) and QR code generation
- Authentication via Google, GitHub, email/password, and session management
- Blog creation and editing with markdown support and rich text
- Commenting system with replies and moderation
- Responsive design with dark/light theme toggle
- Integration with Prisma for database access and schema management
- SEO-friendly metadata and sitemap generation
- Custom utilities (QR code, sharing API, image cropping, etc.)


## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, custom UI components
- **Database:** Prisma (SQLite/PostgreSQL configurable)
- **Icons:** Lucide, custom SVG assets
- **Authentication:** NextAuth or custom providers (Google, GitHub)
- **Utilities:** sonner for toast, Cloudinary, chat integration


## 🔧 Prerequisites

- Node.js 18 or later
- npm, Yarn, or pnpm
- (Optional) Docker for containerized local development


## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Donvine254/Tech-Tales-Client.git
   cd Tech-Tales-Client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn
   # or pnpm install
   ```

3. **Configure environment variables**

   Copy `env.example` to `.env.local` and update the values:

   ```env
   DATABASE_URL=postgresql://user:pass@localhost:5432/tech_tales
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret
   CLOUDINARY_URL=your_cloudinary_url
   GITHUB_ID=...
   GITHUB_SECRET=...
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ```

   > See [Configuration](#configuration) for more details.

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000).


## 🧩 Project Structure

```text
.
├─ app/                # Next.js pages and layouts
├─ components/         # UI components and modals
├─ constants/          # Shared constants
├─ dal/                # Data access layer helpers
├─ hooks/              # Custom React hooks
├─ lib/                # Utilities, actions, metadata
├─ prisma/             # Prisma schema & client
├─ public/             # Static assets
├─ types/              # TypeScript type definitions
├─ ...                
```


## 🔐 Configuration

Set the following env vars in `.env.local`:

| Variable            | Description                                |
|---------------------|--------------------------------------------|
| `DATABASE_URL`      | Connection string for your database        |
| `NEXTAUTH_URL`      | Base URL for authentication callbacks      |
| `NEXTAUTH_SECRET`   | Secret for session encryption              |
| `CLOUDINARY_URL`    | Cloudinary credentials for image uploads   |
| `GITHUB_ID/SECRET`  | OAuth credentials for GitHub provider      |
| `GOOGLE_CLIENT_...` | OAuth credentials for Google provider      |


## 📦 Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run start      # Run built app
npm run lint       # Run ESLint
npm run format     # Prettier format
npm run prisma     # Shortcut for prisma commands
``` 


## ✅ Testing

> Currently there are no automated tests in this repository. Contributions adding Jest/Playwright tests are welcome.


## 📦 Deployment

The app is optimized for deployment on **Vercel** but any Node.js host works.

1. Push your code to GitHub (or similar).
2. Connect the repository in Vercel.
3. Set the same environment variables in the Vercel dashboard.
4. Deploy – Vercel will run `npm run build` automatically.

Other platforms (Netlify, Fly.io, etc.) also support Next.js.


## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit changes and push
4. Open a pull request

Please follow the existing code style and run `npm run lint` before submitting.


## 🚨 Issues & Support

Found a bug or missing feature? Open an issue in the repo.


## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
