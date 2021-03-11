import React from 'react';

function Component(props){

    return (
        <div key={`${props.data}-${props.index}`} className="ml-3 text-default">
            <div className="mt-2 font-bold" > {props.data}: </div>
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