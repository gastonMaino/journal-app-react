import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

describe('test in authReducer.js', () => {

    
    
    test('should return a loged state', () => {
        const initialState = {}
        
        const state = authReducer(initialState, {
            type: types.login,
            payload: {
                uid: '1a2a3a4a',
                displayName: 'roberto'
            }
        });
        
        expect(state).toEqual({
            uid: '1a2a3a4a',
            name: 'roberto'
        });
    })
    
    test('should return a logout state', () => {
        
        const initialState = {
            uid: '1a2a3a4a',
            name: 'roberto'
        }
        
        const state = authReducer(initialState, {
            type: types.logout
        });
        
        expect(state).toEqual({});
    })
    
    
    test('should return a default of state', () => {
        const initialState = {
            uid: '1a2a3a4a',
            name: 'roberto'
        }

        const state = authReducer(initialState, {
            type: 'hi'
        });

        expect(state).toEqual(initialState);
    })
})
