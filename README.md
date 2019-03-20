# notes API
A fullstack notes app designed and implemented by James Hall

See the API's [documentation](DOCS.md).

# Getting Started

- Navigate to the notes-app Angular-app. There you should build the project with `ng build`. Use watch to have live reload `ng build --watch`
- The `/dist` will deposit into the nginx folder and be read by nginx when spinning up from the `docker-compose up` command.
- next the only commands you need enter aftter that should be `docker-compose up`. It will build on the first time.
- Navigate to `localhost:80` on a chrome browser. 
- Interact with project.
- You should also be able to edit code and see it appear. 
- If you edit a large amount of changes and make 

## LocalDev Mode
The backend can run seperate from the front end, you need to have an instance of postgres running.
The postgres database should be postgres, `notesDev`. the config file contains other details if needed for configuring the database.
The test run locally, you need to have a `notesTest` added in postgres.
### Generate Docs
 To generate current docs to project run `npm run docs`
 
### How to run tests.
 To run local system level tests use `npm run docker:systemTests`.

### How to run the project.
1. In the root of the project directory run in your terminal or IDE use the start script `npm run dev` this will start the api server. The express server will display a port to connect to.
2. Use postman or terminal window to send api calls

### Generating Docs
To get the most recent api docs run `npm run docs` in the root of the project directory.

## Directory structure

```
.github/
.vscode/
|
coverage/
|
notes-app/
| 
node_modules/
|
src/
├─ api/
│  ├─ notes/
│  │  ├─ controller.js
│  │  ├─ index.js
│  │  └─ index.test.js
├─ migrations/
├─ models/
├─ seeders/
├─ services/
│  ├─ express/
├─ config.js
└─ index.js
|
.sequelizerc
|
docker-compose.yml
|
Dockerfile
|
package.json
|
README.md

```

### server/api/

Here is where the API endpoints are defined. Each API has its own folder.

#### server/api/some-endpoint/controller.js

This is the API controller file. It defines the main router middlewares which use the API model.

#### server/api/some-endpoint/index.js

This is the entry file of the API. It defines the routes using, along other middlewares (like session, validation etc.), the middlewares defined in the `some-endpoint.controller.js` file.

### services/
Here you can put `helpers`, `libraries` and other types of modules which you want to use in your APIs.
