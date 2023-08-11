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
- markup payment source form
- check what happens on submit of 2 field forms (recipient, payment source)
- add GET to create options list on the selects
- finish submit function so all 4 forms submit as expected
- figure out why the vertical 100% isn't enclosing all the forms (float issue? bt I don't use floats so...)
- update error messages on backend so it returns as an error
- handle errors on FE