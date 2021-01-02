import React, { useEffect } from 'react';

function Component(props){
    
    useEffect(() => {
        props.drag(document.getElementById(props.data._id));
        props.Notes.element(props.data._id).addEventListener("dragend", (e) => {
            props.Notes.log(props.Notes.getTarget(props.data), props.data);
            e.stopImmediatePropagation();
        });
    }, [props])

    return (
        <div drag="true" id={props.data._id} style={{"top":props.data.top, "left":props.data.left}} className={`group z-0 focus-within:z-50 active:z-50 focus:z-50 note animate__animated animate__fadeIn shadow-lg absolute min-w-56 max-w-96 rounded-lg bg-${props.data.color}-400`}>
            <div className={`note relative cursor-grab active:cursor-grabbing bg-${props.data.color}-600 rounded-t-lg w-full p-1 flex justify-end text-${props.data.color}-600`}>
                <svg onClick={e => props.Notes.showColor(props.data)} height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g className={`cursor-pointer fill-current hover:text-${props.data.color}-400`} fill="none" fillRule="evenodd" stroke="#2a2e3b" strokeLinecap="round" strokeLinejoin="round"><circle cx="10.5" cy="10.5" r="8"/><path d="m6.5 8.5h8"/><path d="m8.5 10.5h4"/><path d="m9.5 12.5h2"/></g></svg>                
                <svg onClick={e => props.Notes.deleteNote(props.Notes.element(props.data._id), props.data)} height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g className="cursor-pointer fill-current hover:text-red-400" fill="none" fillRule="evenodd" stroke="#2a2e3b" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><g transform="matrix(0 1 -1 0 17 0)"><path d="m5.5 11.5 6-6"/><path d="m5.5 5.5 6 6"/></g></g></svg>
            </div>
            <div className={`absolute -top-10 w-32 -right-0 animate__animated animate__fadeIn ${props.data.showColor} p-2 bg-${props.data.color}-500 flex flex-wrap justify-around rounded-lg m-1`}>
                <p onClick={e => props.Notes.color(props.data, "yellow")} className="transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded-full border w-4 h-4"></p>
                <p onClick={e => props.Notes.color(props.data, "green")} className="cursor-pointer bg-green-400 hover:bg-green-500 rounded-full border w-4 h-4"></p>
                <p onClick={e => props.Notes.color(props.data, "blue")} className="cursor-pointer bg-blue-400 hover:bg-blue-500 rounded-full border w-4 h-4"></p>
                <p onClick={e => props.Notes.color(props.data, "gray")} className="cursor-pointer bg-white hover:bg-gray-300 rounded-full border w-4 h-4"></p>
                <p onClick={e => props.Notes.color(props.data, "purple")} className="cursor-pointer bg-purple-400 hover:bg-purple-500 rounded-full border w-4 h-4"></p>
                <p onClick={e => props.Notes.color(props.data, "red")} className="cursor-pointer bg-red-400 hover:bg-red-500 rounded-full border w-4 h-4"></p>
            </div>
            <div id="note_content" onKeyUp={e => props.Notes.logChange(e, props.data)} className="focus:z-50 note p-2" contentEditable="true" dangerouslySetInnerHTML={{__html: decodeURIComponent(props.data.content)}} suppressContentEditableWarning={true}></div>
        </div>
    );

}

export default Component;