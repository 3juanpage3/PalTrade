# PALTRADE Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

### 3. Initialize Database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Features Included

✅ User authentication (login/register)
✅ Browse all Palworld items and Pals
✅ Create listings for items and Pals
✅ Search and filter listings
✅ User profiles with personal listings
✅ Responsive design
✅ Clean, modern UI

## Database

The app uses SQLite for development. For production on Vercel, you'll need PostgreSQL:

1. Create a PostgreSQL database (Vercel Postgres, Supabase, etc.)
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Run migrations: `npx prisma migrate deploy`

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `NEXTAUTH_URL` (your Vercel URL)
   - `NEXTAUTH_SECRET` (random secret)
4. Deploy!

## Troubleshooting

### Database Issues
- Make sure Prisma is generated: `npx prisma generate`
- Reset database: `npx prisma migrate reset`

### Authentication Issues
- Check that `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your deployment URL

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

