import React from 'react';

function Component(props){

    return (
        <div className='transition duration-300 ease-in-out overflow-hidden w-auto h-auto flex flex-col items-center p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-coolGray-800 bg-white dark:bg-coolGray-700 border-accent border-b-4 shadow'>
            <p className='my-2 text-xs  text-center'>{props.data.Day}</p>
            <div className='overflow-hidden w-16 h-16 flex items-center justify-center border border-accent rounded-full text-accent p-4 text-5xl'>
                {props.data.Icon}
            </div>
            <p className='mt-2 text-xs  text-center'>{props.data.Description}</p>
            <p className='mt-2 text-xs  text-center'>{props.data.MaxTemp}</p>
        </div>
    );

}

export default Component;