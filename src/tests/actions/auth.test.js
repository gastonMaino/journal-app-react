import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth"
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);

describe('test in actions of auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
    })

    test('should make a action', () => {
        const loginRef = login('testingID', 'testing');
        const logoutRef = logout();

        expect(loginRef).toEqual({
            type: types.login,
            payload: {
                uid: 'testingID',
                displayName: 'testing'
            }
        });

        expect(logoutRef).toEqual({
            type: types.logout
        });
    })

    test('should make logout', async () => {
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });
        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });

    })

    test('should login with email and password', async () => {
        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456789'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        })
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'zl3mD4VTFhNN6Q7nwLmmgkAJCP72',
                displayName: null
            }
        })
        expect(actions[2]).toEqual({
            type: types.uiRemoveLoading
        })

    })
    


})
