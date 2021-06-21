import swal from 'sweetalert2';


import { db } from "../firebase/firebaseConfig";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(doc.id, newNote));
        dispatch(noteAdd(doc.id, newNote));
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const noteAdd = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url
        }

        const noteFirestore = { ...note };
        delete noteFirestore.id

        db.doc(`${uid}/journal/notes/${note.id}`).update(noteFirestore);

        dispatch(refreshNote(note.id, noteFirestore));

        swal.fire('Saved', note.title, 'success');
    }
}



export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active } = getState().notes

        swal.fire({
            title: 'Uploading',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                swal.showLoading();
            }
        })

        const fileUrl = await fileUpload(file);
        active.url = fileUrl;

        swal.close();

        dispatch(startSaveNote(active))

    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));

        swal.fire('Completed', 'successfully note deleted', 'success')
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const notesLogout = () => ({
    type: types.notesLogoutCleaning
})