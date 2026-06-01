# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**동인써모 보고용 페이지** — A reporting page project for Donginthermo (동인써모). After completion, the repository will be transferred to the client's account.

## Tech Stack

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Storage/Backend**: Supabase
- **Deployment**: Vercel

## Important Rules

- **코드 실행 전 반드시 사용자에게 확인할 것** — Always confirm with the user before executing any commands or running code.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

- `src/app/` — Next.js App Router pages and layouts
- `src/lib/supabase.ts` — Supabase client (initialized with env vars)
- Environment variables are stored in `.env.local` (not committed)

## Environment Variables

See `.env.local.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

When deploying to Vercel, add these variables in the Vercel project settings.
