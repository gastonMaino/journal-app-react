import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {
    const dispatch = useDispatch()
    const noteDate = moment(date);

    const handleClick = () => {
        dispatch(activeNote(id, {
            date,
            title,
            body,
            url
        }))
    }

    return (
        <div className='journal__entry' onClick={handleClick} >
            {
                url &&
                <div
                    className='journal__entry-picture'
                    style={{
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }
                    }
                ></div>
            }
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    {title}
                </p>
                <p className='journal__entry-content'>
                    { body }
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <time>{noteDate.format('dddd')} {noteDate.format('Do')}</time>
            </div>
        </div >
    )
}
