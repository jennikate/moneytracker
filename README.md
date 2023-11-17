# Money Tracker

## Backend
- Prisma (ORM)
- SQLite (database)

Prisma studio: `npx prisma studio` -> view db in browser
Update db model: `npx prisma migrate dev --name <name>`

## Frontend

### v1 - React
Created first FE with 
- React 18
- React Router 6
- Webpack 5

First FE is not responsive as current usecase is only for widescreen desktop.

### Future plans
Aim to replicate FE with different frameworks/languages/libraries for practice, including making responsive and a native mobile version

TODO:
- Typescript
- React Native
- NextJS?



## References

NextJS / Express example: https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-express
Prisma REST API ref: https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/rest


## TODOs
- remove horizontal form as not used
- check for other unused items
- write tests

---
- refactor so functions use function not const, save const for variables
- refactor to reduce repetiton (forms, mappers maybe)
- clean up global consts

---
- update error messages on backend so it returns as an error
- handle error responses on FE

---
- improve colours https://convertingcolors.com/hex-color-5B3256.html#:~:text=The%20Hex%20color%205B3256%20is,the%20grayscale%20version%20is%20424242.

- improve getting data for Payment form so it's not rendering so many times
- make responsive


NOTE: remember Santander and HSBC payment sources currently have no related method and therefore break