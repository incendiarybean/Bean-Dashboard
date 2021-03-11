import React from 'react';
import { Player } from './addon';

function Component(props){

    if(!props.Sandstorm.Loaded){
        return <props.Loader {...{color:'purple', text:'Loading...'}}/>;
    } else if(props.Sandstorm.Loaded === 'Failed') {
        return <props.Loader {...{color:'red', text:'Failed...'}}/>;
    } else {
        return (
            <div className='p-10 animate__animated animate__fadeIn bg-secondary w-full h-auto'>
                <div className="flex bg-primary border-b-4 border-accent">
                    {props.Sandstorm.Players.map((data, index) => {
                        return (
                            <div key={index} className='p-2 flex justify-around w-full'>
                                <div className='flex flex-col p-2'>
                                    <input id={`player-${index}`} className="border-b text-default focus:outline-none mt-4 bg-other p-2 px-4" placeholder="Who?"></input>
                                    <div className="bg-primary p-2 mt-2 rounded">
                                        {(props.Sandstorm.users.length > 0 && props.Sandstorm.users[index]) ?
                                            Object.keys(props.Sandstorm.users[index]).map((item) => {
                                                return <Player key={`${item}.player-${new Date()}`} {...props} data={item} index={index}/>;
                                            })
                                            :
                                            <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button onClick={props.Sandstorm.addPlayer} className='transition duration-500 ease-in-out text-default bg-other hover:bg-green-600 rounded w-full shadow p-2 flex justify-center items-center mt-2'>Add Another Player?</button>
                <button onClick={props.Sandstorm.removePlayer} className='transition duration-500 ease-in-out text-default bg-other hover:bg-red-600 rounded w-full shadow p-2 flex justify-center items-center mt-2'>Remove Player?</button>
                <button onClick={props.Sandstorm.generate} className='transition duration-500 ease-in-out text-default bg-other hover:bg-green-600 rounded w-full shadow p-2 flex justify-center items-center mt-2'>Generate!</button>
            </div>
        );
    }

}

export default Component;