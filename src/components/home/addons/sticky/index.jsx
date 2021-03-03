import React from 'react';
import { Note } from './addon';

function Component(props){

    const Loader = (props) => {
        return (
            <div className='hidden lg:flex shadow-inner bg-other w-full p-2 justify-center items-center'>
                <div  className={`-mt-20 animate__animated animate__flash animate__infinite animate__slower shadow-lg absolute w-96 rounded-lg border border-${props.color}-400`}>
                    <div className={`note relative rounded-t-lg w-full p-1 flex justify-between border-b border-${props.color}-400`}>
                        <p className={`font-semi-bold leading-wide px-2 text-${props.color}-400`}>{props.text}</p>
                        <svg height='21' viewBox='0 0 21 21' width='21' xmlns='http://www.w3.org/2000/svg'><circle className={`stroke-current text-${props.color}-400`} cx='10.5' cy='10.5' fill='none' r='8' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round'/></svg>
                    </div>
                    <div id='note_content' className='h-56 note p-2'>
                        <div className={`p-2 bg-${props.color}-400 rounded mt-4`}></div>
                        <div className={`p-2 bg-${props.color}-400 rounded mt-4 w-2/3`}></div>
                        <div className={`p-2 bg-${props.color}-400 rounded mt-4`}></div>
                        <div className={`p-2 bg-${props.color}-400 rounded mt-4 w-2/3`}></div>
                    </div>
                </div>
            </div>
        );
    };

    if(!props.Notes.Loaded){
        return <Loader {...{color:'purple', text:'Loading...'}}/>;
    } else if(props.Notes.Loaded === 'Failed') {
        return <Loader {...{color:'red', text:'Failed...'}}/>;
    } else {
        return (
            <div style={{ backgroundImage: `url('${props.Theme.background}')` }} id='notes_container' onDoubleClick={(e) => props.Notes.createNote(e)} className='notes-container animate__animated animate__fadeIn relative bg-blue-500 shadow-inner hidden lg:block w-full h-full'>
                {props.Notes.Note.map((data) => (
                    <Note key={data._id} {...props} data={data} />
                ))}
                <div className='p-1 group absolute bg-primary border-accent border-b-4 shadow rounded-t-md top-2 left-2 flex w-auto justify-between'>
                    <div className="transform scale-125" onClick={e => props.Notes.createNote({ target: document.getElementById('notes_container') , clientX: 800, clientY:150 })}>
                        <svg className='transform scale-125 cursor-pointer text-accent hover:text-blue-500 animate__animated animate__fadeIn' height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                            <g className="stroke-current" fill="none" fillRule="evenodd" stroke="#9f7aea" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 4)"><path d="m10.5.5h-8c-1.1045695 0-2 .8954305-2 2v8c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2v-8c0-1.1045695-.8954305-2-2-2z" transform="matrix(0 1 -1 0 13 0)"/><path d="m6.5 3.5v6.056"/><path d="m6.5 3.5v6" transform="matrix(0 1 -1 0 13 0)"/></g>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

}

export default Component;