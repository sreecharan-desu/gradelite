# gradelite

gpa calculator for rgukt students.

## features

- pick your branch and semester, enter grades, get the gpa
- input validation before calculating
- syllabus pdfs bundled under `public/syllabus`
- results saved through a small express + mongodb api (`api/submit.js`)

## stack

html, css and vanilla js · express · mongodb (mongoose) · vercel

## run locally

```bash
npm install
cp .env.example .env
npm start            # http://localhost:3000
```

## env

copy `.env.example` to `.env` and set `MONGODB_URI`.
