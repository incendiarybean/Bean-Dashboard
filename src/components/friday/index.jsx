import React from 'react';
import {Stats, Counter} from './addons';

function Main(props){

    const Loader = (props) => {
        return (
            <div className="flex w-full h-full overflow-hidden">
                <div className="shadow-inner bg-other w-full p-2 flex justify-center items-center">
                    <div  className={`-mt-20 animate__animated animate__flash animate__infinite animate__slower shadow-lg absolute w-96 rounded-lg border border-${props.color}-400`}>
                        <div className={`note relative rounded-t-lg w-full p-1 flex justify-between border-b border-${props.color}-400`}>
                            <p className={`font-semi-bold leading-wide px-2 text-${props.color}-400`}>{props.text}</p>
                            <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><circle className={`stroke-current text-${props.color}-400`} cx="10.5" cy="10.5" fill="none" r="8" stroke="#2a2e3b" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div id="note_content" className="h-56 note p-2">
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

    if(!props.Friday.Loaded){
        return <Loader {...{color:"purple", text:"Loading..."}}/>
    } else if(props.Friday.Loaded === "Failed") {
        return <Loader {...{color:"red", text:"Failed..."}}/>
    } else {
        return (
            <div className="flex w-full h-full overflow-hidden">
                <Counter {...props} />
                <Stats {...props} />
            </div>
        );
    }

}

export default Main;
