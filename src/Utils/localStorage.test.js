import LocalStorage from "./localStorage"
import {clearLocaStorage} from "./TestUtils"

beforeEach(() => {
    clearLocaStorage()
})

const object = {
    id: 123456789,
    message: "Testi Message",
    category: "Family",
    title: "Test Title",
    notebook:""
}

const unExistsObject = {
    id: 123456780,
    message: "Testi Message",
    category: "Family",
    title: "Test Title",
    notebook:""
}

const objects = [
    {
        id: 123456789,
        message: "Testi Message",
        category: "Family",
        title: "Test Title",
        notebook:""
    }, {
        id: 123456785,
        message: "Second Testi Message",
        category: "work",
        title: "Second Test Title",
        notebook:""
    }
]

const HomeNoteBook = [
    {
        id: 23456789,
        message: "Home Message",
        category: "Family",
        title: "Test Title",
        notebook:""
    }, {
        id: 23456785,
        message: "Second Home Message",
        category: "work",
        title: "Second Test Title",
        notebook:""
    }
]

const UniversityNoteBook = [
    {
        id: 23456789,
        message: "University Message",
        category: "Family",
        title: "Test Title"
    }, {
        id: 23456785,
        message: "Second University Message",
        category: "work",
        title: "Second Test Title"
    }
]

const NoteNextMonth=[];

describe("Test Locastorage functionality", () => {

    test("test insert note", () => {
        //first set the item
        LocalStorage.setNotes(JSON.stringify(object))
        //now check with normal localStorage
        const insertedLocalStorage = localStorage.getItem('notes');

        expect(JSON.parse(insertedLocalStorage)).toEqual(object);
    })

    test("get the note with id 123456785", () => {
        //first set Notes object
        LocalStorage.setNotes(JSON.stringify(objects))
        //find the item with id 123456785
        const findObject = LocalStorage.findId(123456785)[0]
        //it must be equal to objects[1]
        expect(findObject.message).toEqual(objects[1].message);
        expect(findObject.title).toEqual(objects[1].title);
        expect(findObject.category).toEqual(objects[1].category);
        expect(findObject.id).toEqual(objects[1].id);
        //it dont have to be equal to objects[0]
        expect(findObject.message).not.toEqual(objects[0].message);
        expect(findObject.title).not.toEqual(objects[0].title);
        expect(findObject.category).not.toEqual(objects[0].category);
        expect(findObject.id).not.toEqual(objects[0].id);
    })

    test("update the note with id 123456785", () => {
        //first set Notes object
        LocalStorage.setNotes(JSON.stringify(objects))

        //update the objects[1]
        let updateObject = objects[1]

        updateObject.title = "Come On"
        updateObject.message = "It's Our Life"
        updateObject.category = "Friends"

        const updatedObject = LocalStorage.updateId(123456785, updateObject)
        const updatedItem = LocalStorage.findId(123456785)[0];
        const unUpdatedItem = LocalStorage.findId(123456789)[0];
        //it must be equal to new values
        expect(updatedItem.message).toEqual("It's Our Life");
        expect(updatedItem.title).toEqual("Come On");
        expect(updatedItem.category).toEqual("Friends");
        expect(updatedItem.id).toEqual(123456785);

        //it dont have to be equal to pervious object
        expect(updatedObject.message).not.toEqual(objects[1].message);
        expect(updatedObject.title).not.toEqual(objects[1].title);
        expect(updatedObject.category).not.toEqual(objects[1].category);
        expect(updatedObject.id).not.toEqual(objects[1].id);

        //un Updated object must be the same as it was
        expect(unUpdatedItem.message).toEqual(objects[0].message);
        expect(unUpdatedItem.title).toEqual(objects[0].title);
        expect(unUpdatedItem.category).toEqual(objects[0].category);
        expect(unUpdatedItem.id).toEqual(objects[0].id);
    })

    test("Check that object with the id , exists", () => {
        //first set the item
        LocalStorage.setNotes(JSON.stringify(objects))
        const isRowExists = LocalStorage.rowExists(object);

        expect(isRowExists.length !== 0).toBe(true);

        const RowIsNotExists = LocalStorage.rowExists(unExistsObject);

        expect(RowIsNotExists.length === 0).toBe(true);
    })

    test("Set All NoteBooks", () => {
        //first set the item
        LocalStorage.set('Home',JSON.stringify(HomeNoteBook))
        LocalStorage.set('University',JSON.stringify(UniversityNoteBook))
        LocalStorage.set('Next Month',JSON.stringify(NoteNextMonth))
        const AllNotes=LocalStorage.getAllNotes();
        const Assert= [...NoteNextMonth,...UniversityNoteBook,...HomeNoteBook];

        expect(AllNotes).toEqual(Assert)

        const AssertNot= [...HomeNoteBook,...UniversityNoteBook,...NoteNextMonth];
        //wont be equal
        expect(AllNotes).not.toEqual(AssertNot)
    })

    test("Get One NoteBook", () => {
        //first set the item
        LocalStorage.set('Home',JSON.stringify(HomeNoteBook))

        const Home=JSON.parse(LocalStorage.getNotebooks('Home'));

        expect(Home).toEqual(HomeNoteBook)
    })

})
