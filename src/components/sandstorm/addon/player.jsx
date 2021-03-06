import React from 'react';

function Component(props){

    return (
        <div key={`${props.data}-${props.index}`} className="p-3 ml-3 bg-white dark:bg-coolGray-800 text-coolGray-800 dark:text-white">
            <div className="font-bold" > {props.data}: </div>
            {
                (props.data === 'CLASS' || props.data === 'user') ?
                    (props.data === 'CLASS') ?
                        <p className="ml-2 underline" key={`class-${props.index}`}> {props.Sandstorm.users[props.index][props.data]} </p>
                        :
                        <p key={`user-${props.index}`}>{(document.getElementById(`player-${props.index}`)) ? document.getElementById(`player-${props.index}`).value : 'Reload.' }</p>
                :
                Object.keys(props.Sandstorm.users[props.index][props.data]).map((attach) => {
                    return (
                        <p className="ml-2" key={`${attach}-${props.index}`}> {attach} : {props.Sandstorm.users[props.index][props.data][attach]} </p>
                    );
                })
            }
            <hr className='my-2 w-full'/>

        </div>
    );

}

export default Component;