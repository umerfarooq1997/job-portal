# Job Portal — ChatGPT Context

Use this document as the starting context when helping with this repository. It describes the code **as it currently exists**; it is an in-progress project, not a completed application.

## Project overview

This repository contains two separate TypeScript applications:

| Directory | Purpose | Main stack |
| --- | --- | --- |
| `job-portal-api/` | REST API | Express 5, Mongoose/MongoDB, JWT, HTTP-only cookies |
| `job-portal-frontend/` | Web client | Next.js 16 App Router, React 19, TypeScript, Tailwind, React Hook Form, Zod |

The application is a job portal with roles `candidate`, `employee`, and `admin`. Authentication is the currently implemented feature. Job-related persistence has been started, but its HTTP API and UI have not yet been built.

## Current functionality

### Authentication API

The API is mounted under `/api/v1/auth`:

| Method | Endpoint | Behavior |
| --- | --- | --- |
| `POST` | `/signup` | Creates a user after checking for an existing email and hashing the password with bcrypt. |
| `POST` | `/login` | Validates credentials, creates a JWT, stores it as the `accessToken` HTTP-only cookie, and returns safe user data. |
| `GET` | `/me` | Requires the `accessToken` cookie and returns the authenticated user. |

Request payloads currently expected by signup are `firstName`, `lastName`, `email`, and `password`. Login expects `email` and `password`.

The server starts from `job-portal-api/src/server.ts`, connects with `MONGODB_URI`, and defaults to port `5000`.

### Authentication frontend

The frontend includes:

- `/auth/sign-up`: client-side Zod validation, signup request, success toast, then redirects to login.
- `/auth/login`: client-side Zod validation, login request, then calls `/auth/me` to confirm the cookie is usable. User state/dashboard navigation is not implemented yet.
- `services/api.ts`: a small `fetch` wrapper. Every request sends cookies via `credentials: "include"`.

Set `NEXT_PUBLIC_API_URL` to the API base path, normally:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## Architecture and important files

### API layering

```text
routes -> controllers -> services -> repositories -> Mongoose models
```

- `src/routes/auth.routes.ts`: public signup/login and protected `/me` route.
- `src/controllers/auth.controller.ts`: HTTP responses and login cookie configuration.
- `src/services/auth.service.ts`: duplicate-email check, password hashing, password comparison, JWT creation.
- `src/middlewares/auth.middleware.ts`: reads/verifies `accessToken`, loads the user, and puts safe data on `req.user`.
- `src/middlewares/role.middleware.ts`: `requireRole(...)` authorization middleware, available but not used by a route yet.
- `src/middlewares/errorHandler.ts`: returns structured errors from custom `AppError` subclasses.
- `src/types/express.d.ts`: augments Express `Request` with `user`.
- `src/models/user.model.ts`: user schema and roles.

### Job domain status

These files exist:

- `job-portal-api/src/models/job.model.ts`
- `job-portal-api/src/repositories/job.repositories.ts`
- `job-portal-api/src/services/job.service.ts`

`Job` includes `title`, `description`, `company`, `location`, numeric `salary`, `employmentType`, `status`, and `createdBy`. The repository can create, list, and find jobs by ID.

There is currently **no job controller, route file, or `app.ts` route registration**, so no `/jobs` HTTP endpoints work yet. There is also no jobs frontend feature/page.

## Local setup

API environment variables needed in `job-portal-api/.env`:

```env
MONGODB_URI=<MongoDB connection string>
JWT_SECRET=<long random secret>
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
```

Run each app in its own terminal:

```bash
cd job-portal-api && npm run dev
cd job-portal-frontend && npm run dev
```

## Current constraints and follow-up work

1. API CORS currently permits only `http://localhost:4000`, but Next.js normally runs on `http://localhost:3000`. Align one of these before testing browser authentication.
2. `POST /signup` returns the raw Mongoose user document, which includes the password hash. Change it to return only safe user fields before treating the endpoint as production-ready.
3. The frontend API wrapper always parses JSON but does not check `response.ok`; improve error handling so failed HTTP responses reliably surface their server message.
4. `requireRole` is implemented but unused. Use it for protected employer/admin job management routes.
5. Add a job controller/routes and decide authorization rules. A reasonable starting rule is employees/admins can create jobs and candidates can view active jobs.
6. Add persistent frontend auth state, protected dashboard routes, job pages, and tests.

## Guidance for future changes

- Preserve the existing API layering: keep database operations in repositories and business rules in services.
- This API is ESM/NodeNext: internal TypeScript imports use `.js` extensions intentionally.
- The frontend uses the App Router and `@/` imports. Check `job-portal-frontend/AGENTS.md` before modifying Next.js files; it requires consulting the installed Next.js documentation for version-specific behavior.
- Do not expose JWTs to JavaScript; the chosen design stores them in an HTTP-only cookie.
- Keep user responses free of `password` and other sensitive fields.

## Suggested prompt for a new ChatGPT session

> I am working on the Job Portal repository described in `CHATGPT_CONTEXT.md`. First inspect the relevant files and preserve the existing Express service/repository architecture and Next.js App Router conventions. Help me implement [describe the next task]. Do not rewrite unrelated code.
