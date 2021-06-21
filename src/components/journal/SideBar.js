import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const SideBar = () => {

    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch( startLogout() )
    }

    const { name } = useSelector(state => state.auth);

    const handleAddEntry = () =>{
        dispatch(startNewNote());
    }

    return (
        <aside className='journal__sidebar animate__animated animate__fadeIn animate__fast'>
            <div className='journal__sidebar-navbar'>
                <h1 className='mt-3 journal__sidebar-title'>
                    <i className='far fa-moon'></i>
                    <span>{name}</span>
                </h1>

                <button className='btn' onClick={handleLogout}>
                    logout
                </button>
            </div>

            <div className='journal__new-entry' onClick={handleAddEntry}>
                <i className='far fa-calendar-plus fa-5x'></i>
                <p className='mt-2'>new entry</p>
            </div>

            <JournalEntries />
        </aside>
    )
}
