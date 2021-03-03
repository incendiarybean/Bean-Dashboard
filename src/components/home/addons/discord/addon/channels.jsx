import React from 'react';
import { User } from './';

function Component(props){

    const showChild = (e) => {
        let target = e.target;
        let trigger = false;
        while(!trigger){
            target = target.parentElement;
            if(target.nodeName === 'DIV') trigger = true;
        }
        target.parentElement.children[1].classList.toggle('hidden');
        target.parentElement.querySelectorAll('#up')[0].classList.toggle('hidden');
        target.parentElement.querySelectorAll('#down')[0].classList.toggle('hidden');
    };

    return (
        <div className="col-span-3 xl:col-span-2 flex-col bg-primary mt-2 p-2 border-b-4 border-accent">
            {props.data.channels.map(data => {
                return (
                    <div key={`${data.name}-channel-${new Date()}`} className="cursor-pointer select-none">
                        <div id={data.name} onClick={e => showChild(e)} className="flex shadow p-1 rounded-full bg-other text-default my-1 shadow-md">
                            <span className="flex-1 flex truncate">
                                <span className="p-1">
                                    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                                        <g className="stroke-current" fill="none" fillRule="evenodd" stroke="#2a2e3b" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)"><path d="m1.5 4.5h3l5-4v14l-5-4h-3c-.55228475 0-1-.4477153-1-1v-4c0-.55228475.44771525-1 1-1zm10 8c1.3333333-1 2-2.66666667 2-5s-.6666667-4-2-5"/><path d="m11.5 5.5v4"/></g>
                                    </svg>
                                </span>
                                <span className="mt-1">
                                    <p className="px-2 truncate">{data.name}</p>
                                </span>
                            </span>
                            <span className="p-1">
                                <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                                    <circle className={`fill-current ${(data.users.length > 0) ? 'text-green-400' : 'text-red-400' }`} cx="10.5" cy="10.5" fill="none" r="8" stroke="#2a2e3b" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <span id="up" className="p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                    <g className="stroke-current " fill="none" fillRule="evenodd" stroke="#2A2E3B" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 8.5 10.5)"><circle cx="8.5" cy="8.5" r="8"/><polyline points="9.563 6.355 9.611 10.645 5.321 10.597" transform="scale(1 -1) rotate(-45 -13.055 0)"/></g>
                                </svg>
                            </span>
                            <span id="down" className="p-1 hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                                    <g className="stroke-current "fill="none" fillRule="evenodd" stroke="#2A2E3B" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-90 10.5 8.5)"><circle cx="8.5" cy="8.5" r="8"/><polyline points="9.621 6.379 9.621 10.621 5.379 10.621" transform="scale(1 -1) rotate(-45 -13.02 0)"/></g>
                                </svg>
                            </span>
                        </div>
                        <div className="flex-0 hidden">
                            {data.users.map(data => {
                                return (
                                    <User {...data} />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );

}

export default Component;

