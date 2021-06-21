import React from 'react'

export const NothingSelected = () => {
    return (
        <div className='nothing__main-content'>
            <p className='nothing__main-pargraph'>
                Select something
                <span className='nothing__main-paragraph-span'>or create an entry </span>
            </p>

            <i className='far fa-star fa-4x mt-3'></i>
        </div>
    )
}
