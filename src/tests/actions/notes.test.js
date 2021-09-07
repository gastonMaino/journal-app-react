/**
* @jest-environment node
*/

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: () => Promise.resolve('www.test.com/fotoTest.jpg')
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '2n1UmZmBKhZTFuRRpLoh',
            title: 'hi world',
            body: 'test'
        }
    }
};

let store = mockStore(initState);


describe('test in notes.js', () => {
    beforeEach(() => {
        store = mockStore(initState);
    })
    test('should make a new note with starNewNote', async () => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete();
    })

    test('should load notes', async () => {
        await store.dispatch(startLoadingNotes('TESTING'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    })

    test('should updated note', async () => {
        const note = {
            id: '2n1UmZmBKhZTFuRRpLoh',
            title: 'hi world',
            body: 'test'
        };

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdate);

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get()

        expect(docRef.data().title).toBe(note.title);
    })

    test('should update url', async () => {
        const file = [];
        await store.dispatch(startUploading(file));

        const docRef = await db.doc('/TESTING/journal/notes/2n1UmZmBKhZTFuRRpLoh').get();

        expect(docRef.data().url).toBe('www.test.com/fotoTest.jpg');
    })





})
