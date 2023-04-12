This is the code repository for the backend server that will run on Amazon AWS

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

    