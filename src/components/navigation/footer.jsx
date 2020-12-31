import React from 'react';

function footer(){
    return(				
        <div className="w-full flex justify-center p-2">
            <div className="inline-flex bg-primary leading-none text-black rounded-full p-2 shadow text-sm">
                <span className="inline-flex bg-accent text-white rounded-full h-6 px-1 justify-center items-center text-">
                    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><circle cx="10.5" cy="10.5" r="8" stroke="white" strokeLinecap="round" strokeLinejoin="round"/><path d="m10.5 14.5v-4" stroke="white" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10.5" cy="7.5" fill="white" r="1"/></g></svg>
                </span>
                <span className="name inline-flex mt-1 px-2 text-default">Created by Benjamin Weare under the PI Development 2020.</span>
            </div>
        </div>
    );
}

export default footer;