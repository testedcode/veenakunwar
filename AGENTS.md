# AI Agent Instructions (AGENTS.md)

This file contains the core context and constraints for all AI agents working on this repository. **You must read this file before modifying code.**

## Project Stack
- **Framework**: React 18 + Vite
- **Routing**: React Router
- **Database/Auth/Storage**: Firebase (Config is pulled from `.env` via `import.meta.env`)
- **Styling**: Vanilla CSS, AOS for scroll animations
- **Deployment**: Vercel

## Core Rules for Agents
1. **Never commit secrets to git.** Do not hardcode passwords or API keys in code or markdown files. Use `.env.local` for local secrets.
2. **Minimize your blast radius.** Do not redesign entire pages unless specifically asked. Fix bugs precisely where they exist.
3. **No empty states.** If you build a new route, populate it with fallback data or a loader.
4. **Pre-release checks.** Before pushing to `main`, you must successfully run `npm run build`. If the build fails, fix it before pushing.
5. **Linting.** Run `npm run lint` to verify syntax if you make complex logic changes.

## File Structure
- `/src/pages`: Main view components (`Shop`, `Home`, `Admin`, etc)
- `/src/hooks`: Custom hooks (e.g., `useFirebase`)
- `/src/contexts`: Global state providers (`AuthContext`, `CartContext`)
- `/docs`: All human-readable deployment and admin guides. Do not litter the root directory with guide files.

## Environment Variables
Agents should read `.env.local` to access Firebase keys for local backend testing. If modifying the required `.env` schema, ensure you ask the user to update their Vercel dashboard variables.
