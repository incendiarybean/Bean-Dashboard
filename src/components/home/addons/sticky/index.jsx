import React from 'react';
import { Note } from './addon';

function Component(props){

    if(!props.Notes.Loaded){
        return <props.Loader {...{color:'purple', text:'Loading...'}}/>;
    } else if(props.Notes.Loaded === 'Failed') {
        return <props.Loader {...{color:'red', text:'Failed...'}}/>;
    } else {
        return (
            <div style={{ backgroundImage: `url('${props.Theme.background}')` }} id='notes_container' onDoubleClick={(e) => props.Notes.createNote(e)} className='bg-coolGray-200 dark:bg-coolGray-700 animate__animated animate__fadeIn notes-container relative bg-blue-500 shadow-inner hidden lg:block w-full h-full'>
                {props.Notes.Note.map((data) => (
                    <Note key={data._id} {...props} data={data} />
                ))}
                    <div className="animate__animated animate__fadeIn absolute p-1 transform scale-125 bg-coolGray-100 dark:bg-coolGray-700 rounded-full shadow m-3" onClick={e => props.Notes.createNote({ target: document.getElementById('notes_container') , clientX: 800, clientY:150 })}>
                        <svg className='transform scale-125 cursor-pointer text-accent hover:text-blue-500 animate__animated animate__fadeIn' height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                            <g className="stroke-current" fill="none" fillRule="evenodd" stroke="#9f7aea" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 4)"><path d="m10.5.5h-8c-1.1045695 0-2 .8954305-2 2v8c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2v-8c0-1.1045695-.8954305-2-2-2z" transform="matrix(0 1 -1 0 13 0)"/><path d="m6.5 3.5v6.056"/><path d="m6.5 3.5v6" transform="matrix(0 1 -1 0 13 0)"/></g>
                        </svg>
                    </div>
            </div>
        );
    }

}

export default Component;