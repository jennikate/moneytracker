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
- Ibpack 5

First FE is not responsive as current usecase is only for widescreen desktop.

### Future plans
Aim to replicate FE with different frameworks/languages/libraries for practice, including making responsive and a native mobile version

TODO:
- NextJS
- Typescript
- React Native



## References

NextJS / Express example: https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-express
Prisma REST API ref: https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/rest


## TODO
- create payment form
  - populate defaults
  - pass id's



- update error messages on backend so it returns as an error
- handle errors on FE
- refactor so functions use function not const, save const for variables
- display payment list
- filters on display
- refactor forms so there's one form that takes different horizontal/vertical class as rest of form is same
- improve colours https://convertingcolors.com/hex-color-5B3256.html#:~:text=The%20Hex%20color%205B3256%20is,the%20grayscale%20version%20is%20424242.
- clean up global consts
- improve getting data for Payment form so it's not rendering so many times