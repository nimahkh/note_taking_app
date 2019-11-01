
## Note Taking App - React

[![Build Status](https://travis-ci.org/nimahkh/note_taking_app.svg?branch=master)](https://travis-ci.org/nimahkh/note_taking_app)

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

#### Architecture :fire::fire:

- ##### Styling :heavy_check_mark:

There are many UI kits for styling to choose, but I recommend using`Material-UI` because of the JSS and rendering performances in new hooks features. :sunglasses:

-  ##### Components :heavy_check_mark:

Components are following the `First Feature` structure. experimentaly, this structure helps to organizing your application and develop it with a team of React developers

-  ##### State management :heavy_check_mark:

The state management in this project is, Context API.

-  ##### Importing components :heavy_check_mark:

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
