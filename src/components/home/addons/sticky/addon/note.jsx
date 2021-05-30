import React, { useEffect } from 'react';

function Component(props){
    
    useEffect(() => {
        props.drag(document.getElementById(props.data._id));
        if(props.Notes.element(props.data._id) !== null){
            props.Notes.element(props.data._id).addEventListener('dragend', (e) => {
                props.Notes.log(props.Notes.getTarget(props.data), props.data);
                e.stopImmediatePropagation();
            });
        }

        if(new Date(props.data.notification).toLocaleDateString() === new Date().toLocaleDateString()){
            props.custom('You have a pending sticky! Check it!');
        }
    }, [props]);

    return (
        <div drag='true' id={props.data._id} style={{'top':props.data.top, 'left':props.data.left}} className={`z-0 focus-within:z-50 active:z-50 focus:z-50 note animate__animated animate__fadeIn shadow absolute min-w-56 max-w-96 rounded bg-${props.data.color}-400`}>
            <div className={`note relative cursor-grab active:cursor-grabbing bg-${props.data.color}-600 rounded-t w-full p-1 flex justify-end text-${props.data.color}-600`}>
                <props.icons.openSettings {...props}/>
            </div>
            <div id="settings" className={`bg-white dark:bg-coolGray-800 text-coolGray-700 dark:text-white absolute -top-10 -left-52 w-48 animate__animated animate__fadeIn ${props.data.showColor} flex flex-wrap justify-around rounded m-1 shadow-lg`}>
                <div className={` flex justify-between w-full rounded-t p-2`}>
                    <p className="font-semibold uppercase">Settings</p>
                    <props.icons.CloseSettings {...props}/>
                </div>
                <div className="rounded-b w-full p-1">
                    <hr className="mb-2 -mt-1"/>
                    <p className="uppercase font-semibold text-xs p-1">Colour:</p>
                    <div className="flex p-1 w-full justify-around">
                        <p onClick={e => props.Notes.color(props.data, 'yellow')} className='transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded-full border w-4 h-4'></p>
                        <p onClick={e => props.Notes.color(props.data, 'green')} className='cursor-pointer bg-green-400 hover:bg-green-500 rounded-full border w-4 h-4'></p>
                        <p onClick={e => props.Notes.color(props.data, 'blue')} className='cursor-pointer bg-blue-400 hover:bg-blue-500 rounded-full border w-4 h-4'></p>
                        <p onClick={e => props.Notes.color(props.data, 'gray')} className='cursor-pointer bg-white hover:bg-coolGray-300 rounded-full border w-4 h-4'></p>
                        <p onClick={e => props.Notes.color(props.data, 'purple')} className='cursor-pointer bg-purple-400 hover:bg-purple-500 rounded-full border w-4 h-4'></p>
                        <p onClick={e => props.Notes.color(props.data, 'red')} className='cursor-pointer bg-red-400 hover:bg-red-500 rounded-full border w-4 h-4'></p>
                    </div>
                    <hr className="my-2"/>
                    <div className="flex flex-col w-full">
                        <div className="group flex justify-left w-3/4">
                            <props.icons.Reminder/>
                            <p className="uppercase font-semibold text-xs p-1">Reminder:</p>
                        </div>
                        <input onChange={e => props.Notes.saveNotification(e, props.data)} className="bg-white dark:bg-coolGray-800 text-coolGray-700 dark:text-white ml-2 -my-1 " type="date"/>
                        {props.data.notification ?
                            <p className="text-xs uppercase font-semibold ml-2">Alarm for: {props.data.notification ? props.data.notification.split('T')[0] : 'None set.'}</p>
                            :
                            <p className="text-xs uppercase font-semibold ml-2">No Alarm Set.</p>
                        }
                        <hr className="my-2"/>
                        <div onClick={e => props.Notes.deleteNote(props.Notes.element(props.data._id), props.data)} className="group flex justify-left hover:text-red-400 cursor-pointer w-3/4">
                            <props.icons.Trash {...props} />
                            <p className="uppercase font-semibold text-xs p-1">Delete?</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="shadow-inner">
                <div id='note_content' onKeyUp={e => props.Notes.logChange(e, props.data)} className='focus:z-50 note p-2 outline-none' contentEditable='true' dangerouslySetInnerHTML={{__html: decodeURIComponent(props.data.content)}} suppressContentEditableWarning={true}></div>
                <div className="flex justify-between">
                    <div id='author' className='mx-1 text-xs italic'>{props.data.author}</div>
                    <div id='date' className='mx-1 text-xs italic'>{new Date(props.data.lastModified).toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    );

}

export default Component;