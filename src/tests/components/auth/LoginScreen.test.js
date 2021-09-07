import { mount } from "enzyme/build"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom'

import { LoginScreen } from '../../../components/Auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from "../../../actions/auth";

jest.mock('../../../actions/auth', () =>({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('test in LoginScreen', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('should match to snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('should shot action startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();

        expect(startGoogleLogin).toHaveBeenCalled();
    })

    test('should call with email and password ', () => {
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(startLoginEmailPassword).toHaveBeenLastCalledWith('', '');
    })
    
    

})
