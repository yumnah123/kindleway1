# Zakat Management (SaaS Edition)
Next.js 14 + Tailwind + Dark Mode + Sidebar Admin (sorting/pagination/search).

## Deploy
- Add `POSTGRES_URL` and (optional) `ADMIN_PASSWORD` in Vercel env.
- Push to GitHub → Import to Vercel → Deploy.

## Pages
- `/submit`: User calculator & submission
- `/admin`: Admin dashboard with sidebar, filters, export

## Notes
- If you see "Server error. Is POSTGRES_URL set?" then set the DB connection string in Vercel env.
