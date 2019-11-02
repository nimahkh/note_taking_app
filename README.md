## Note Taking App - React

[![Build Status](https://travis-ci.org/nimahkh/note_taking_app.svg?branch=master)](https://travis-ci.org/nimahkh/note_taking_app)

[![CircleCI](https://circleci.com/gh/nimahkh/note_taking_app.svg?style=svg)](https://circleci.com/gh/nimahkh/note_taking_app)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

#### Demo link :fire::fire:

[http://note_taking_app_nima.surge.sh/](http://note_taking_app_nima.surge.sh/)

#### File Structure :fire::fire:

The structure of the project is Feature First Design pattern.
You will see that all of the files are related to the one `components` component and each folder has own styles.
If each component needs own reducers and actions, they will have them in the root folder.

Shared folders (the features that are shared to all components) are outside of components.
so, `statemanagement` and `Utils` should be on the `src` root.

```
|   |   ├── components
|   |   |   ├── CreateNote
|   |   |   |   ├── index.js
|   |   |   |   ├── styles.js
|   |   |   |   ├── Snackbar.js
|   |   |   ├── MainComponent
|   |   |   |   ├── index.js
|   |   |   |   ├── styles.js
|   |   |   ├── NoteBooks
|   |   |   |   ├── index.js
|   |   |   |   ├── styles.js
|   |   |   ├── NoteList
|   |   |   |   ├── index.js
|   |   |   |   ├── styles.js
|   |   |   |   ├── ListNotes.test.js
|   |   |   |   ├── Note.js
|   |   ├── statemanagement
|   |   |   ├── index.js
|   |   ├── Utils
|   |   |   ├── localStorage.js
|   |   |   ├── localStorage.test.js
|   |   |   ├── Modal.js
|   |   |   ├── showModal.js
|   |   |   ├── TestUtils.js

```

#### Commands

##### Run

The command to run CRA project on 3000 port.

`npm run start`

##### Build

The command to build project in `build` folder.

`npm run build`

##### Test

The command to run unit tests.

`npm run test`

##### Prettier

The command to run Prettier to make codes Pretty with nice indents.

`npm run prettier`

##### ES Lint

The command to run ESLint .

`npm run lint`

#### Husky (Git webhook) :dog:

Husky is a tool ( and also a cute Dog :dog: ) to make webhooks on Github.
I make a Webhook to run prettier and ESLint before pushing.

#### Architecture :fire::fire:

- ##### Styling :heavy_check_mark:

There are many UI kits for styling to choose, but I recommend using`Material-UI` because of the JSS and rendering performances in new hooks features. :sunglasses:

- ##### Components :heavy_check_mark:

Components are following the `First Feature` structure. experimentaly, this structure helps to organizing your application and develop it with a team of React developers

- ##### State management :heavy_check_mark:

The state management in this project is, Context API.

- ##### Importing components :heavy_check_mark:

Main components name in their folder is index.js. so you can import it like below :

```
import NoteList from "../components/NoteList"
```

instead of

```
import NoteList from "../components/NoteList/NoteListComponent"
```

It's better to use package.json inside of all Components folder with a `name` tag to explain a detail for that component.

```
{
  "main": "NoteListComponent.js"
}

```

But this feature is just in CRA and for babel configs, you have to configure webpack with `directory-named-webpack-plugin` plugin.

### Features :fire::fire:

- [x] The user should be able to create a new note.
- [x] The user should be able to edit and delete a note.
- [x] The user should be able to navigate through multiple notes.
- [x] Search function to find notes.
- [x] Create notes in different categories.
- [x] Create notes in different Notebooks.
- [x] Move notes trough categories.
- [x] Markdown editor.
- [x] Using localStorage to store notes.

### Run :fire::fire:

#### npm :v:

run the command below:

- `npm run build`

- optional if not exists : `npm i -g serve`

- `npm run serve build/`

- open `http://localhost:5000`

#### Docker :v::v:

- first build the project:

`docker build . -t nta-react`

- now run the Docker on port 80

`docker run -p 8080:80 nta-react`

- open the project on `localhost:8080`

### CI/CD

#### Travis CI :v:

Configuration of Travis CI/CD is inside of .travis.yml file.

```
language: node_js
node_js:
  - "stable"
cache:
  directories:
    - node_modules
script:
  - npm test
  - npm run build
deploy:
  provider: surge
  skip_cleanup: true
  domain: note_taking_app_nima.surge.sh
  project: ./build/
on:
  branch: master

```

Script block is running the tests at first, then building the project. Deploy section is deploying the project on `surge.sh` domain from `build` folder.

#### CircleCI :v::v:

Configuration of Circle CI is inside of .circleci folder.

```
version: 2
jobs:
  build:
    docker:
      - image: circleci/node:12.13.0

    working_directory: ~/repo

    steps:
      - checkout

      # Download and cache dependencies
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package.json" }}
            # fallback to using the latest cache if no exact match is found
            - v1-dependencies-

      - run: npm install

      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package.json" }}

      # run tests!
      - run: npm run test
```
