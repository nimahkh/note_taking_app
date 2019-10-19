const LocalStorage = {};

LocalStorage.get = (item) => {
  return localStorage.getItem(item)
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
