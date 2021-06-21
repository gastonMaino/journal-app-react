import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { activeNote, startDeleting } from '../../actions/notes';
import { NoteAppBar } from './NoteAppBar';
import { useForm } from '../../hooks/useForm/useForm';

export const NoteScreen = () => {
    const dispatch = useDispatch();

    const { active } = useSelector(state => state.notes)
    const [values, handleInputChange, reset] = useForm(active);
    const { title, body, id } = values;
    const activeId = useRef(active.id);

    useEffect(() => {
        if (active.id !== activeId.current) {
            reset(active);
            activeId.current = active.id
        }
    }, [active, reset])

    useEffect(() => {
        dispatch(activeNote(values.id, { ...values }));
    }, [values, dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className='notes__main-content'>
            <NoteAppBar />

            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='some awesome title'
                    className='notes__title-input'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder='what happened today?'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
            </div>

            {
                (active.url) &&
                <div className='notes__image'>
                    <img src={active.url} alt='bird cage' />
                </div>
            }

            <button
                className='btn btn-danger'
                onClick={handleDelete}
            >
                delete
            </button>

        </div>
    )
}
