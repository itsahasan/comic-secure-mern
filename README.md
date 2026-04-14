# Secure Comics MERN Lab

Minimal MERN project for a security course lab.

## Roles
- super_admin: can create only admins
- admin: can create users except super_admin, and can add/update/delete comics
- fiend: can view comics only
- visitor: no access without login

## Security focus
- JWT auth in httpOnly cookie
- bcrypt password hashing
- role based access control
- helmet
- express-rate-limit on auth routes
- CORS restricted to local client
- input validation with express-validator
- MongoDB operator sanitization
- no secrets in source code
- Docker support for local containers

## Run with Docker
1. Copy `.env.example` to `.env`
2. Set your secrets
3. Run:
   ```bash
   docker compose up --build
   ```
4. Import CSV:
   ```bash
   docker compose exec api npm run seed
   ```

## Default route summary
- POST `/api/auth/signup`
- POST `/api/auth/signin`
- POST `/api/auth/signout`
- GET `/api/auth/me`
- POST `/api/users`
- GET `/api/users`
- GET `/api/comics`
- GET `/api/comics/:id`
- POST `/api/comics`
- PUT `/api/comics/:id`
- DELETE `/api/comics/:id`

## TDD note
A minimal Jest + Supertest test is included for the auth route so you can mention TDD in the lab.
