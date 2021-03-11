import React from 'react';
import { Users, Channels } from './';

function Component(props){

    return (
        <div className="text-default flex flex-col w-full items-center justify-around">
           <div className='border-b-4 border-accent w-full inline-flex bg-primary leading-none text-black p-2 shadow text-sm'>
                <props.icons.Info/>
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

