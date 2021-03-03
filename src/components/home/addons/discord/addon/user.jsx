import React from 'react';

function Component(props){

    return (
        <div className="flex flex-col">
            <div className="flex shadow p-1 rounded-full text-default my-1 min-w-48 w-1/2 ml-4 bg-secondary">
                <img alt="Discord Profile" className="rounded-full" height="24" width="24" src={props.avatarURL ? props.avatarURL : props.defaultAvatarURL}/>
                <p className="px-2 truncate">{props.nickname ? props.nickname : props.username}</p>
            </div>
        </div>
    );

}

export default Component;