import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme/build';
import '@testing-library/jest-dom';

import { RegisterScreen } from '../../../components/Auth/RegisterScreen';
import { types } from '../../../types/types';

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
        active: null
    }
};

const store = mockStore(initState);

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);


describe('test in RegisterScreen', () => {

    test('should match to snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('should make dispatch', () => {

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'name is required'
        })  
    })

    test('should  show alert box', () => {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'name is required'
            },
            notes:{
                notes:[],
                active: null
            }
        };
        
        const store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );
        
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true)
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);

    })
    
    
    
})
