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

LocalStorage.note =(id) => {
  if(LocalStorage.getNotes()!==null){
    const List=JSON.parse(LocalStorage.getNotes());
    return List[id];
  }
  return []
}

LocalStorage.rowExists= (object)=>{
  const List=JSON.parse(LocalStorage.getNotes());
  if(List!==null && List.length>0){
    return List.filter(item=>{
      return object.id===item.id;
    })
  }
  else{
    return [];
  }
}

LocalStorage.findId= (id)=>{
  const List=JSON.parse(LocalStorage.getNotes());
  if(List!==null && List.length>0){
    return List.filter(item=>{
      return id===item.id;
    })
  }
  else{
    return [];
  }
}

LocalStorage.updateId= (id,itemObject)=>{
  const List=JSON.parse(LocalStorage.getNotes());
  if(List!==null && List.length>0){
    const updatedList= List.filter(item=>{
      if(id===item.id){
        const {title, message, category}=itemObject
        item.title=title;
        item.message=message;
        item.category=category;
      }
      return item
    })
    LocalStorage.setNotes(JSON.stringify(updatedList));
    return true
  }
  else{
    return false;
  }
}

export default LocalStorage;
