# Getting started
- Get NodeJS v18.10.0 - installing via [nvm](https://github.com/coreybutler/nvm-windows) is recommended
- run `npm install` to install dependencies
- run `npm run start` to start local development server
- we are using `qwik-nx` nx plugin that has the following code generators:
    - library `nx generate qwik-nx:lib`
    - component `nx generate qwik-nx:component`
    - route `nx generate qwik-nx:route`
- deployment is handled via github action set up in `.github/workflows/deploy.yml`
