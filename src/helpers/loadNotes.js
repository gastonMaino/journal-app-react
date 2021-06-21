import { db } from "../firebase/firebaseConfig"

export const loadNotes = async (uid) => {
    const noteSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];

    noteSnap.forEach( (snapChildren) => {
        notes.push({
            id: snapChildren.id,
            ...snapChildren.data()
        })
    })

    return notes;
}