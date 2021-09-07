import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme/build"
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'

import { firebase } from '../../firebase/firebaseConfig'
import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

jest.mock('../../actions/auth', () =>({
    login: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        notes:[],
        active: {
            id: '132a'
        }
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('test in AppRouter', () => {
    test('should call login if is authenticated', async () => {

        await act(async ()=>{

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456789');

            const user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        })

        expect( login ).toHaveBeenCalled();

    })
    
})
