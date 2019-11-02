const LocalStorage = {};

LocalStorage.get = key => {
  return localStorage.getItem(key);
};
LocalStorage.set = (key, value) => {
  return localStorage.setItem(key, value);
};
LocalStorage.remove = key => {
  return localStorage.removeItem(key);
};
/**
 * get all notes
 **/
LocalStorage.getNotes = () => {
  return LocalStorage.get("notes");
};

/**
 * get all notes of notebooks
 **/
LocalStorage.getNotebooks = notebook => {
  return LocalStorage.get(notebook);
};

/**
 * set a group of Notes
 **/
LocalStorage.setNotes = value => {
  LocalStorage.set("notes", value);
};

/**
 * remove Notes
 **/
LocalStorage.rmNotes = () => {
  LocalStorage.remove("notes");
};

/**
 * remove Notes
 **/
LocalStorage.rmNoteBook = notebok => {
  LocalStorage.remove(notebok);
};

/**
 * get a note by index
 **/
LocalStorage.note = id => {
  if (LocalStorage.getNotes() !== null) {
    const List = JSON.parse(LocalStorage.getNotes());
    return List[id];
  }
  return [];
};

/**
 * check that note exists by id
 **/
LocalStorage.rowExists = object => {
  const List = JSON.parse(LocalStorage.getNotes());
  if (List !== null && List.length > 0) {
    return List.filter(item => {
      return object.id === item.id;
    });
  } else {
    return [];
  }
};

/**
 * check that note exists by id in specific notebook
 **/
LocalStorage.rowExistsIn = (notebook, object) => {
  const List = JSON.parse(localStorage.getItem(notebook));
  if (List !== null && List.length > 0) {
    return List.filter(item => {
      return object.id === item.id;
    });
  } else {
    return [];
  }
};
LocalStorage.getAllNotes = () => {
  let NoteNextMonth = LocalStorage.getNotebooks("Next Month");
  let University = LocalStorage.getNotebooks("University");
  let Home = LocalStorage.getNotebooks("Home");
  let Notes = LocalStorage.getNotebooks("notes");
  let All;
  NoteNextMonth = NoteNextMonth !== null ? JSON.parse(NoteNextMonth) : [];
  University = University !== null ? JSON.parse(University) : [];
  Home = Home !== null ? JSON.parse(Home) : [];
  Notes = Notes !== null ? JSON.parse(Notes) : [];
  All = [...NoteNextMonth, ...University, ...Home, ...Notes];

  return All;
};
/**
 * get node by id
 **/
LocalStorage.findId = id => {
  const List = LocalStorage.getAllNotes();
  if (List !== null && List.length > 0) {
    return List.filter(item => {
      return id === item.id;
    });
  } else {
    return [];
  }
};

/**
 * update a note by id
 **/
LocalStorage.updateId = (id, itemObject) => {
  const List = JSON.parse(
    LocalStorage.getNotebooks(
      itemObject.notebook === "" ? "notes" : itemObject.notebook
    )
  );

  let notebookIs = itemObject.notebook;
  if (List !== null && List.length > 0) {
    const updatedList = List.filter(item => {
      if (id === item.id) {
        const { title, message, category } = itemObject;
        item.title = title;
        item.message = message;
        item.category = category;
      }
      return item;
    });
    LocalStorage.set(
      notebookIs === "" ? "notes" : notebookIs,
      JSON.stringify(updatedList)
    );
    return true;
  } else {
    return false;
  }
};

export default LocalStorage;
