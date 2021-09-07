import { removeError, removeLoading, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types";

describe('test in ui.js', () => {
    test('should make all actions', () => {
        const action = setError('error');

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'error'
        })

        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const removeLoadingAction = removeLoading();

        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });
        expect(removeLoadingAction).toEqual({
            type: types.uiRemoveLoading
        });

    })

})
