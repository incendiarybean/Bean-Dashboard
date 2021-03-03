import React from 'react';
import { Users, Channels } from './';

function Component(props){

    return (
        <div className="text-default flex flex-col w-full items-center justify-around">
           <div className='border-b-4 border-accent w-full inline-flex bg-primary leading-none text-black p-2 shadow text-sm'>
                <span className='inline-flex text-white rounded-full h-6 px-1 justify-center items-center'>
                    <svg height='25' viewBox='0 0 21 21' width='25' xmlns='http://www.w3.org/2000/svg'><g fill='none' fillRule='evenodd'><circle cx='10.5' cy='10.5' r='8' stroke='white' strokeLinecap='round' strokeLinejoin='round'/><path d='m10.5 14.5v-4' stroke='white' strokeLinecap='round' strokeLinejoin='round'/><circle cx='10.5' cy='7.5' fill='white' r='1'/></g></svg>
                </span>
                <p className='hover:text-blue-500 underline name inline-flex mt-1 px-2 text-default'>{props.data.server[0].name}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 flex flex-wrap justify-between w-full">
                <Users {...props} />
                <Channels {...props} />
            </div>
        </div>
    );

}

export default Component;

