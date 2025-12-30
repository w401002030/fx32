# Cloudflare Workers Full-Stack Chat App Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/w401002030/fx-algomaster-intelligent-trading-solutions)

A production-ready full-stack chat application template built on Cloudflare Workers. Features a stateful backend using Durable Objects for users, chat boards, and messages, paired with a modern React frontend using Vite, TanStack Query, and shadcn/ui.

## Features

- **Stateful Backend**: Durable Objects for per-entity storage (Users, Chats) with automatic indexing and pagination
- **RESTful APIs**: Full CRUD operations for users, chats, and messages using Hono
- **Real-time Capable**: Messages stored per-chat with optimistic updates ready
- **Modern Frontend**: React 18, Vite, Tailwind CSS, shadcn/ui components, dark mode
- **Type-Safe**: Full TypeScript with shared types between frontend and worker
- **Seeded Data**: Mock users, chats, and messages for instant demo
- **Reactive UI**: TanStack Query for data fetching/mutations, error boundaries, theme toggle
- **Production-Ready**: Hot reload, bundling, Cloudflare deployment, observability

## Tech Stack

- **Backend**: Cloudflare Workers, Durable Objects, Hono, TypeScript
- **Frontend**: React 18, Vite, TanStack Query, React Router, shadcn/ui, Tailwind CSS, Lucide icons
- **State & Utils**: Immer, Zustand-ready, clsx, tailwind-merge
- **Dev Tools**: Bun, wrangler, ESLint, TypeScript
- **UI Components**: Radix UI, Framer Motion, Sonner toasts

## Quick Start

1. **Prerequisites**:
   - [Bun](https://bun.sh/) installed
   - [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and logged in (`wrangler login`)

2. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd <project>
   bun install
   ```

3. **Generate Types**:
   ```bash
   bun run cf-typegen
   ```

4. **Development**:
   ```bash
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or `$PORT`).

5. **Deploy**:
   ```bash
   bun run deploy
   ```

## Local Development

- **Frontend**: Runs on Vite dev server with HMR. APIs proxy to worker during dev.
- **Backend**: Worker routes in `worker/user-routes.ts`. Extend without touching `worker/index.ts`.
- **Entities**: Define in `worker/entities.ts` using `IndexedEntity` base class for auto-indexing/CRUDS.
- **Shared Types**: Edit `shared/types.ts` and `shared/mock-data.ts` for seed data.
- **Type Generation**: Run `bun run cf-typegen` after worker changes.
- **Linting**: `bun run lint`
- **Build**: `bun run build` (outputs to `dist/` for deployment)

Hot reload works for both frontend and worker. Changes to `worker/user-routes.ts` auto-reload.

## API Endpoints

All endpoints return `{ success: boolean, data?: T, error?: string }`.

### Users
- `GET /api/users?cursor=&limit=` - Paginated list
- `POST /api/users` - `{ name: string }`
- `DELETE /api/users/:id`
- `POST /api/users/deleteMany` - `{ ids: string[] }`

### Chats
- `GET /api/chats?cursor=&limit=` - Paginated list
- `POST /api/chats` - `{ title: string }`
- `DELETE /api/chats/:id`
- `POST /api/chats/deleteMany` - `{ ids: string[] }`

### Messages
- `GET /api/chats/:chatId/messages` - List messages
- `POST /api/chats/:chatId/messages` - `{ userId: string, text: string }`

Health: `GET /api/health`

Frontend uses `src/lib/api-client.ts` for typed fetches.

## Deployment

Deploy to Cloudflare Workers with Pages for static assets:

1. **Configure Wrangler**:
   Edit `wrangler.jsonc` for custom bindings/migrations.

2. **Build & Deploy**:
   ```bash
   bun run deploy
   ```

3. **One-Click Deploy**:
   [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/w401002030/fx-algomaster-intelligent-trading-solutions)

Your app will be live on `*.workers.dev`. Custom domain via Wrangler dashboard.

### Production Notes
- **Durable Objects**: Auto-migrates via `wrangler.jsonc`.
- **Observability**: Enabled by default (logs, metrics).
- **Assets**: Vite-built frontend served via Workers Sites.
- **Scaling**: Durable Objects handle global state; scales to zero.

## Customization

- **Add Entities**: Extend `IndexedEntity` in `worker/entities.ts`, add routes in `user-routes.ts`.
- **Frontend**: Replace `src/pages/HomePage.tsx`. Use `AppLayout` for sidebar.
- **UI**: shadcn/ui components available in `src/components/ui/*`.
- **Theme**: Toggle via `ThemeToggle`. Custom via Tailwind config.

## Troubleshooting

- **Worker Routes Not Loading**: Check console for import errors.
- **Types Missing**: Run `bun run cf-typegen`.
- **Dev Port**: Set `PORT=8080 bun dev`.
- **CORS**: Pre-configured for `*`.

## License

MIT. See [LICENSE](LICENSE) for details.