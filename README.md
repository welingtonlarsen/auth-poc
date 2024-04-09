<div align="center">

# API POC - API

![](https://img.shields.io/badge/Status-Done-green)

</div>
<div align="center">

![](https://img.shields.io/badge/Autor-Welington%20Larsen-brightgreen)
![](https://img.shields.io/badge/Backend-Nodejs-brightgreen)
![](https://img.shields.io/badge/Frontend-Reacjs-brightgreen)

</div>

### Description
This is a POC about Auth, usiging Reactjs and Nodejs. With the implementation it is possible to authenticate an user using Password Grant Type.

### Features
- Create user
- Login
- Logout
- Private routes
- Public routes

### FYI
It's not necessary to use Redux for such a small POC, but I chose this state manager because it's present in my current job stack.

### Running API
```bash
# set node version
nvm use

# install dependencies
yarn

# generate client and models
yarn prisma:generate

# execute migrations
yarn prisma:migrate:dev

# start the app
yarn dev
```

### Running Frontend
```bash
# set node version
nvm use

# install dependencies
yarn

# generate client and models
yarn dev
```