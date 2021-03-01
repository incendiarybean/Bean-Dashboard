import React, { useEffect } from 'react';

function Component(props){

    useEffect(() => {
        props.Sandstorm.reset();
    }, []);

    switch(props.Sandstorm.Loaded){
        case true:
            return (
                <div className='p-10 animate__animated animate__fadeIn bg-secondary w-full h-auto'>
                    <div className="flex">
                        {props.Sandstorm.Players.map((data, index) => {
                            return (
                                <div key={index} className='p-2 flex justify-around w-full'>
                                    <div className='flex flex-col p-2'>
                                        <input id={`player-${index}`} className="border-b text-default focus:outline-none mt-4 bg-primary p-2 px-4" placeholder="Who?"></input>
                                        <button onClick={props.Sandstorm.addPlayer} className='transition duration-500 ease-in-out text-default bg-other hover:bg-green-600 rounded w-full shadow p-2 flex justify-center items-center mt-2'>Add Another Player?</button>
                                        <button onClick={() => {props.Sandstorm.removePlayer(index);}} className='transition duration-500 ease-in-out text-default bg-other hover:bg-red-600 rounded w-full shadow p-2 flex justify-center items-center mt-2'>Remove Player?</button>
                                        <div className="bg-primary p-2 mt-2 rounded shadow">
                                            {(props.Sandstorm.users.length > 0 && props.Sandstorm.users[index]) ?
                                                Object.keys(props.Sandstorm.users[index]).map((item) => {
                                                    return (
                                                        <div key={`${item}-${index}`} className="ml-3 text-default">
                                                            <div className="mt-2 font-bold" > {item}: </div>
                                                            {
                                                                (item === 'CLASS' || item === 'user') ?
                                                                    (item === 'CLASS') ?
                                                                        <p className="ml-2 underline" key={`class-${index}`}> {props.Sandstorm.users[index][item]} </p>
                                                                        :
                                                                        <p key={`user-${index}`}>{(document.getElementById(`player-${index}`)) ? document.getElementById(`player-${index}`).value : 'Reload.' }</p>
                                                                :
                                                                Object.keys(props.Sandstorm.users[index][item]).map((attach) => {
                                                                    return (
                                                                        <p className="ml-2" key={`${attach}-${index}`}> {attach} : {props.Sandstorm.users[index][item][attach]} </p>
                                                                    );
                                                                })
                                                            }
                                                            <hr className='my-2 w-full'/>

                                                        </div>
                                                    );
                                                })
                                                :
                                                <div className="p-2 text-default">Press Generate to render!</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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