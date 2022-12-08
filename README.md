<h1 align="center">
    <a href='https://roundest.samuelfr.me'>Roundest-mon</a>
</h1>

<p align="center">
   <a href="https://www.linkedin.com/in/samuel-ferreira-rezende-7bbbba206/">
      <img alt="SamuelFR7" src="https://img.shields.io/badge/-SamuelFR7-27AE60?style=flat&logo=Linkedin&logoColor=white" />
   </a>
  <img alt="Languages" src="https://img.shields.io/github/languages/count/SamuelFR7/roundest-mon?color=%23527AE60" />
  <img alt="lastcommit" src="https://img.shields.io/github/last-commit/SamuelFR7/roundest-mon?color=%23527AE60" />
  <img alt="Issues" src="https://img.shields.io/github/issues/SamuelFR7/roundest-mon?color=%23527AE60">
  <a href="mailto:samuelferreirarezende@gmail.com">
   <img alt="Email" src="https://img.shields.io/badge/-samuelferreirarezende%40gmail.com-%23527AE60" />
  </a>
</p>

<p align="center">
  Which is the rounder pokemon?
</p>

<div align="center">
  <sub> Inspired by
    <a href="https://www.youtube.com/watch?v=PKy2lYEnhgs">this Theo livestream.</a>
  </sub>
</div>


# 📌 Contents

* [Technologies](#rocket-technologies) 
* [How to Run](#computer-how-to-run)

# :rocket: Technologies
This project was made using the follow technologies:

* [Typescript](https://www.typescriptlang.org/)      
* [NextJS](https://nextjs.org)
* [tRPC](https://trpc.io)
* [Planetscale](https://planetscale.com)
* [Prisma](https://www.prisma.io)
* [TailwindCSS](https://tailwindcss.com)
* [Zod](https://zod.dev)


# :computer: How to run

```bash
# Clone Repository
$ git clone https://github.com/SamuelFR7/roundest-mon.git
```

```bash
# Install Dependencies
$ yarn

# Create a .env with .env.example schema and run migrations in linked database
$ yarn prisma migrate dev

# Run the script fill-db
$ yarn ts-node ./scripts/fill-db.ts

# Run Aplication in backend in frontend
$ yarn dev
```
Go to http://localhost:3000/ to see the result.

Thank You! 🚀