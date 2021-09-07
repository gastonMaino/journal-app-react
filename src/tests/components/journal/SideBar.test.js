import { mount } from "enzyme/build"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom'


import { SideBar } from "../../../components/journal/SideBar";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";


jest.mock('../../../actions/auth', () =>({
    startLogout: jest.fn()
}))
jest.mock('../../../actions/notes', () =>({
    startNewNote: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        name: 'gaston'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        notes:[],
        active: null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <SideBar />
        </MemoryRouter>
    </Provider>
);


describe('tes in SideBar', () => {
    
    test('should match to snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should call action startLogout', () => {
        wrapper.find('.btn').prop('onClick')();

        expect(startLogout).toHaveBeenCalled();
    })

    test('should call action ', () => {
        wrapper.find('.journal__new-entry').prop('onClick')()

        expect(startNewNote).toHaveBeenCalled();
    })
    
    
    

})
