import React from 'react';
import { Users, Channels } from './';

function Component(props){

    return (
        <div className=" flex flex-col w-full items-center justify-around">
           <div className='bg-white dark:bg-gray-700 border-b-4 border-accent w-full inline-flex leading-none text-coolGray-800 dark:text-white p-2 shadow text-sm'>
                <props.icons.Info/>
                <p className='hover:text-blue-500 underline name inline-flex mt-1 px-2 '>{props.data.server[0].name}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 flex flex-wrap justify-between w-full">
                <Users {...props} />
                <Channels {...props} />
            </div>
        </div>
    );

}

export default Component;

