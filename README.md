<p align="center">
  <img src="https://raw.githubusercontent.com/harshhhdev/snip/main/public/Banner.png?token=GHSAT0AAAAAABXX5WNSA65XAUMK2MAJOKLYYYB4ZJA" />
  <a href="https://snip.place">
    <h2 align="center">snip</h2>
  </a>
</p> 
<p align="center">:cyclone: The gamma variant of Pastebin</p>
<p align="center">
  <a href="https://courier-hacks-integrated-tools.devpost.com/">Courier Hackathon</a>
    ·
  <a href="https://snip.place/">Demo</a>
 </p>

## ✨ Team

Harsh Singh • Frontend (TypeScript) • [GitHub](https://github.com/harshhhdev) • [Twitter](https://twitter.com/harshhhdev)

Ibrahim Hisham • Backend (Rust) • [GitHub](https://github.com/ibra) • [Twitter](https://twitter.com/IbrahDev)

## 🚀 Quickstart

Run the website locally

```
git clone https://github.com/harshhhdev/snip.git
```

### Setting up the development environment

```bash
cd snip

# Install deps
yarn
```

### Setting up Courier

 - Create an account at [courier.com](https://courier.com/).
 - Enable and configure the Gmail extension.
 - Substitute `COURIER_API_KEY` in the `.env` file with your API.

You should be set to go. For further tools and information, check out the [Courier documentation](https://www.courier.com/docs/).

### Setting up the database

NOTE: This project uses [PostgreSQL](https://www.postgresql.org/) on [Supabase](https://supabase.com/database) to store data. Things like authentication are handled by Supabase.

Currently, according to the [Supabase documentation](https://supabase.com/blog/supabase-cli), there isn't any 'right' way to do migrations, however you can initialise your database with the `initdb.sql` file located at the root of the project.

### Authentication

This application uses [Supabase's Authentication](https://supabase.com/auth) with the [GitHub](https://supabase.com/docs/guides/auth/auth-github) and [GitLab](https://supabase.com/docs/guides/auth/auth-gitlab). Refer to the linked guides for how to create an OAuth application and connect it with your account.

### Starting server

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

...and your local development server should now be running on [localhost:8888](https://localhost:8888).

## 🔧 Tools Used

### Frontend

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [kmenu](https://kmenu.hxrsh.in)
- [Framer Motion](https://framer.com/motion)
- [react-hot-toast](https://react-hot-toast.com/)

### Backend

- [Rust](https://rust-lang.org)
- [Netlify Serverless Functions](https://www.netlify.com/products/functions/)
- [Supabase](https://supabase.com)
- [postgrest-rs](https://github.com/supabase-community/postgrest-rs)
- [serde_json](https://docs.rs/serde_json/latest/serde_json/)
- [nanoid](https://zelark.github.io/nano-id-cc/)

### Miscellaneous

- [Figma](https://www.figma.com/)
- [nanoid](https://zelark.github.io/nano-id-cc/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

## 🤞 Contributing

After setting up the project, and making changes:

```git
git add .
git commit -m "commit message"
git push YOUR_REPO_URL YOUR_BRANCH
```
