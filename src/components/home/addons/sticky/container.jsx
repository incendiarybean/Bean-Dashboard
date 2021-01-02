import React from 'react';
import { default as Note } from './note';

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
            <div style={{ backgroundImage: `url('${props.Theme.background}')` }} id='notes_container' onDoubleClick={(e) => props.Notes.createNote(e)} className='animate__animated animate__fadeIn relative bg-blue-500 shadow-inner hidden lg:block w-full h-full'>
                {props.Notes.Note.map((data) => (
                    <Note key={data._id} {...props} data={data} />
                ))}
                <div className='group absolute bg-primary shadow-md rounded-full top-4 left-2 flex'>
                    <div onClick={e => props.Notes.createNote({ target: document.getElementById('notes_container') , clientX: 800, clientY:150 })} className='transition-width duration-500 ease-in-out w-0 group-hover:w-full h-full flex'>
                        <svg className='cursor-pointer text-accent hover:text-blue-500 mt-1 ml-2 hidden group-hover:block animate__animated animate__fadeIn h-full w-full' width='32' height='32' viewBox='0 0 21 21' xmlns='http://www.w3.org/2000/svg'>
                            <g className='stroke-current' fill='none' fillRule='evenodd' stroke='#9f7aea' strokeLinecap='round' strokeLinejoin='round' transform='translate(2 3)'><path d='m8 16c4.4380025 0 8-3.5262833 8-7.96428571 0-4.43800246-3.5619975-8.03571429-8-8.03571429-4.43800245 0-8 3.59771183-8 8.03571429 0 4.43800241 3.56199755 7.96428571 8 7.96428571z'/><path d='m4 8h8'/><path d='m8 12.0563492v-8.0563492z'/></g>
                        </svg>
                    </div>
                    <div className='p-1'>
                        <svg className='cursor-pointer text-accent hover:text-blue-500 transform group-hover:rotate-180' xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 21 21'>
                            <g className='stroke-current' fill='none' fillRule='evenodd' stroke='#9f7aea' strokeLinecap='round' strokeLinejoin='round' transform='translate(2 2)'><circle cx='8.5' cy='8.5' r='8'/><polyline points='9.628 6.362 9.628 10.604 5.338 10.556' transform='scale(1 -1) rotate(-45 -12.997 0)'/></g>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

}

export default Component;