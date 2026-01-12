# PALTRADE - Palworld Trading Platform

A modern, user-friendly trading platform for Palworld items and Pals. Built with Next.js 14, TypeScript, Tailwind CSS, and NextAuth.js.

## Features

- 🔐 User authentication with secure login/registration
- 📦 List items and Pals for sale
- 🔍 Browse and search listings with filters
- 💰 Price negotiation and trading
- 👤 User profiles and listing management
- 📱 Responsive design for all devices
- 🎨 Clean, modern UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Prisma with SQLite (dev) / PostgreSQL (production)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd PALTRADE
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to GitHub/GitLab/Bitbucket

2. Import your project in [Vercel](https://vercel.com)

3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` - Your PostgreSQL connection string (for production)
   - `NEXTAUTH_URL` - Your Vercel deployment URL
   - `NEXTAUTH_SECRET` - A random secret string

4. Vercel will automatically deploy your app

### Database Setup for Production

For production, use PostgreSQL:

1. Create a PostgreSQL database (e.g., on [Vercel Postgres](https://vercel.com/storage/postgres) or [Supabase](https://supabase.com))

2. Update your `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Run migrations:
```bash
npx prisma migrate deploy
```

## Project Structure

```
PALTRADE/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── browse/            # Browse listings page
│   ├── create/            # Create listing page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── profile/           # User profile page
│   └── listings/[id]/     # Listing detail page
├── components/            # React components
├── lib/                   # Utility functions
├── data/                  # Static data (items, pals)
└── prisma/                # Database schema
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

