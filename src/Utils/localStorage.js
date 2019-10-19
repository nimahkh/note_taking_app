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

LocalStorage.rmNotes =() => {
  localStorage.removeItem('notes')
}

export default LocalStorage;
