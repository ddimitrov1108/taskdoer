## TaskDoer

Application that will help you to manage your day to day and future activities. ✅

## Tech stack:

#### Front-end:
  Nextjs, Reactjs, TailwindCSS, HeadlessUI, Notistack, React-Icons, Formik, Yup, SWR

#### Back-end:
  Nextjs, NextAuth, Prisma, MySQL

### Preview:

![Page from inside the app](/public/taskdoer-app.png)

## Getting Started

First, run the development server:

```bash

npm install

create and configurate .env file
NEXTAUTH_SECRET=
HASH_SALT=
DATABASE_URL=
BASE_URL=http://localhost:3000

npx prisma migrate dev

development:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

Run the production server: 

```bash

npm run build
npm run start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
# or
bun build
bun start

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
