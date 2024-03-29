import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme/build";
import { Provider } from 'react-redux';

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'hi',
    body: 'world',
    url: 'https://algunlugar.com/foto.jpeg'
}

const wrapper = mount(
    <Provider store={store}>
            <JournalEntry {...note} />
    </Provider>
);


describe('test in JournalEntry', () => {
    test('should match to snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('should active note', () => {
        wrapper.find('.journal__entry').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, {...note})
        );
    })
    
})
