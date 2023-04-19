This is the code repository for the backend server that will run on Amazon AWS
Start backend:
```
Project3_Zeta $ npm run build
Project3_Zeta $ cd backend2
Project3_Zeta $ npm run start-dev & npm run dev


```
Typescript files:
* tsconfig.json - settings for typescript
* src/ - folder for typescript source files
    * index.ts - Typescript entrypoint for backend server
* build/ - folder for compiled typescript source files
    * index.js - Compiled version of src/index.ts


Node/NPM Files:
* package.json - describes the libraries this uses
* package-lock.json - used by npm to keep track of packages
* node_modules/** - all of the external NPM packages

Docker:
* Docker allows us to specify a specific linux configuration to automate the setting up of the server

