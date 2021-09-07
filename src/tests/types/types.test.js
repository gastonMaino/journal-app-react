import { types } from "../../types/types"

describe('test in types.js', () => {
    const typesTest = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
        uiStartLoading: '[UI] Start Loading',
        uiRemoveLoading: '[UI] Remove Loading',
        notesAddNew: '[NOTES] NEW NOTE',
        notesActive: '[NOTES] SET NOTE ACTIVE',
        notesLoad: '[NOTES] LOAD NOTE',
        notesUpdate: '[NOTES] UPDATE NOTE',
        notesFileUrl: '[NOTES] UPDATE IMAGE URL',
        notesDelete: '[NOTES] DELETE NOTE',
        notesLogoutCleaning: '[NOTES] LOGOUT CLEANING'
    }
    test('should match to object', () => {
        expect(types).toEqual(typesTest);
    })

})
