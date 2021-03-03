import React from 'react';

function Component(props){

    return (
        <div className="col-span-3 xl:col-span-1 flex-col bg-primary mt-2 p-2 border-b-4 border-accent">
            {props.data.users.map(data => {
                return (
                    <div key={`${data.username}-user-${new Date()}`} className="flex shadow p-1 rounded-full bg-other text-default my-1 shadow-md">
                        <img alt="Discord Profile" className="rounded-full" height="24" width="24" src={data.user.avatarURL ? data.user.avatarURL : data.user.defaultAvatarURL}/>
                        <p className="px-2 truncate">{data.username}</p>
                    </div>
                );
            })}
        </div>
    );

}

export default Component;

