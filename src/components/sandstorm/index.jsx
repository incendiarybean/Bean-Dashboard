import React from 'react';
import { Player } from './addon';

function Component(props){
    switch(props.Sandstorm.Loaded){
        case true:
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
        default:
            return (
                <div className='flex w-full h-full overflow-hidden'>
                    <div className='shadow-inner bg-other w-full p-2 flex justify-center items-center'>
                        <div  className={`-mt-20 animate__animated animate__flash animate__infinite animate__slower shadow-lg absolute w-96 rounded-lg border border-${props.color}-400`}>
                            <div className={`note relative rounded-t-lg w-full p-1 flex justify-between border-b border-${props.color}-400`}>
                                <p className={`font-semi-bold leading-wide px-2 text-${props.color}-400`}>{props.text}</p>
                                <svg height='21' viewBox='0 0 21 21' width='21' xmlns='http://www.w3.org/2000/svg'><circle className={`stroke-current text-${props.color}-400`} cx='10.5' cy='10.5' fill='none' r='8' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round'/></svg>
                            </div>
                            <div id='note_content' className='h-56 note p-2'>
                                <div className={`p-2 bg-${props.color}-400 rounded mt-4`}></div>
                                <div className={`p-2 bg-${props.color}-400 rounded mt-4 w-2/3`}></div>
                                <div className={`p-2 bg-${props.color}-400 rounded mt-4`}></div>
                                <div className={`p-2 bg-${props.color}-400 rounded mt-4 w-2/3`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }



}

export default Component;