<p align="center">
  <img src="https://raw.githubusercontent.com/harshhhdev/snip/main/public/Banner.png?token=GHSAT0AAAAAABWYU2PTC3MS2DCQMO2GAWNUYYATIBQ" />
  <a href="https://snip.place">
    <h2 align="center">snip</h2>
  </a>
</p> 
<p align="center">:cyclone: The gamma variant of Pastebin</p>
<p align="center">
  <a href="https://supabase.com/blog/launch-week-5-hackathon">Supabase Hackathon</a>
    ·
  <a href="https://snip.place/">Demo</a>
 </p>

# 🚀 Quickstart

Run the website locally

```
git clone https://github.com/harshhhdev/snip.git
```

## Setting up the development environment

```bash
cd snip

# Install deps
yarn
```

## Setting up the database

NOTE: This project uses [PostgreSQL](https://www.postgresql.org/) on [Supabase](https://supabase.com/database) to store data. Things like authentication are handled by Supabase.

Currently, according to the [Supabase documentation](https://supabase.com/blog/supabase-cli), there isn't any 'right' way to do migrations, however you can initialise your database with the `initdb.sql` file located at the root of the project.

## Authentication 

This application uses [Supabase's Authentication](https://supabase.com/auth) with the [GitHub](https://supabase.com/docs/guides/auth/auth-github) and [GitLab](https://supabase.com/docs/guides/auth/auth-gitlab). Refer to the linked guides for how to create an OAuth application and connect it with your account.

## Starting server

```bash
# Start the server
yarn dev
```

Server should now be running on [localhost](https://localhost:3000)

If you would also like to run the [Netlify serverless functions](https://www.netlify.com/blog/2021/10/14/write-netlify-functions-in-rust/), you can start with the [netlify dev](https://www.netlify.com/products/cli/) command.

```bash
# Start the Netlify server
netlify dev
```

...and your local development server should now be running on [localhost:8080](https://localhost:8080).

# 🔧 Tools Used

- [Supabase](https://supabase.com)
- [kmenu](https://kmenu.hxrsh.in)
- [TypeScript](https://www.typescriptlang.org/)
- [Rust](https://rust-lang.org) (deployed to [Netlify](https://netlify.com) serverless functions)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://framer.com/motion)
- [react-icons](https://react-icons.github.io/react-icons/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [nanoid](https://zelark.github.io/nano-id-cc/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Figma](https://www.figma.com/)

# 🤞 Contributing

After setting up the project, and making changes:

```git
git add .
git commit -m "commit message"
git push YOUR_REPO_URL YOUR_BRANCH
```
