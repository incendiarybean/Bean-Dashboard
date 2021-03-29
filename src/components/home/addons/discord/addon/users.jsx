import React from 'react';

function Component(props){

    return (
        <div className="bg-white dark:bg-gray-700 col-span-3 xl:col-span-1 flex-col mt-2 p-2 border-b-4 border-accent shadow">
            {props.data.users.map(data => {
                return (
                    <div key={`${data.username}-user-${new Date()}`} className="bg-gray-100 dark:bg-coolGray-800 border border-gray-200 dark:border-gray-700 flex p-1 rounded-full  my-1 shadow">
                        <img alt="Discord Profile" className="rounded-full" height="24" width="24" src={data.user.avatarURL ? data.user.avatarURL : data.user.defaultAvatarURL}/>
                        <p className="px-2 truncate">{data.username}</p>
                    </div>
                );
            })}
        </div>
    );

}

export default Component;

