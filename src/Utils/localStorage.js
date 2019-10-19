const LocalStorage = {};

LocalStorage.getNotes = () => {
  return localStorage.getItem("notes")
}

LocalStorage.set = (key, value) => {
  localStorage.setItem(key, value)
}

LocalStorage.setNotes = (value) => {
  localStorage.setItem("notes", value)
}

LocalStorage.remove = (item) => {
  localStorage.removeItem(item)
}

export default LocalStorage;
