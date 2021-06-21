import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NoteAppBar = () => {
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.notes)

    const inputFile = useRef(null);

    const handleSave = () => {
        dispatch(startSaveNote(active))
    }

    const handlePictureClick = () =>{
        inputFile.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if( file ) {
            dispatch(startUploading(file))
        }
    }


    return (
        <div className='notes__appbar'>
            <time>June 12 2021</time>

            <input 
                type='file'
                style={{display: 'none'}}
                ref={inputFile}
                onChange={handleFileChange}
            />

            <div>
                <button
                    className='btn'
                    onClick={handlePictureClick}
                >
                    picture
                </button>
                <button
                    className='btn'
                    onClick={handleSave}
                >
                    save
                </button>
            </div>
        </div>
    )
}
