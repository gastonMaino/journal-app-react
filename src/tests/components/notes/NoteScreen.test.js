import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme/build"
import { Provider } from 'react-redux';

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
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
    notes: {
        notes: [],
        active: {
            id: 1234,
            title: 'hi',
            body: 'world',
            date: 0
        }
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
);




describe('test in NoteScreen', () => {
    test('should match to snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('should shot activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'update note'
            }
        })

        expect(activeNote).toHaveBeenLastCalledWith(1234, {
            body: 'world',
            title: 'update note',
            id:1234,
            date: 0 
        });
    })
    

})
