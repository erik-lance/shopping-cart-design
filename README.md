# Shopping Cart Design

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Duplicate `.env.local.example` and rename to `.env.local`.

2. Install dependencies.

```bash
npm i
```

3. Setup Husky (for pre-commit).

```bash
npm run prepare
```

> Note:
> Run the following if you're facing errors when pushing a commit.
>
> ```bash
> # delete ".git/hooks/" folder manually
> # or run the line below in PowerShell
> rm -rf .git/hooks/
> npm uninstall husky
> npm install --save-dev husky
> ```
>
> If you're using GitHub Desktop, make sure to add `C:\Program Files\Git\bin`
> to your **User** and **System** PATH.
> Learn more in the following solutions: [Solution 1](https://github.com/desktop/desktop/issues/17385#issuecomment-1718170235) and [Solution 2](https://github.com/desktop/desktop/issues/12586#issuecomment-1822189613)

4. Run the development server.

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
