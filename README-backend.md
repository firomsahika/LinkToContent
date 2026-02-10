# Backend (Next.js + Prisma) — quick start

1. Install dependencies

```bash
npm install prisma @prisma/client
```

2. Create a local Postgres and set `DATABASE_URL` in `.env` (copy from `.env.example`).

3. Generate Prisma client and create initial migration

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Run the Next app (dev)

```bash
npm run dev
```

5. Endpoints
- `POST /api/projects` — create a project
- `GET  /api/projects` — list projects
- `POST /api/transcript` — fetch transcript (stub)
- `POST /api/ai/segments` — generate segments from transcript (stub)
- `POST /api/ai/summarize` — generate summary & social drafts (stub)
- `GET  /api/assets` — list assets (optional `?projectId=`)

Notes
- Stubs: `src/lib/transcriptFetcher.ts` and `src/lib/geminiStub.ts` are placeholders. Replace with real transcript fetchers and Google GenAI SDK calls when ready.
- Use `src/lib/prisma.ts` to access the Prisma client in API routes.
