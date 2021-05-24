import React from 'react';
import { Weather, Articles, Sticky, Discord } from './addons';
import { Footer } from '../index.js';

function Main(props){
    let isReady = false;

    if(props.News.Loaded && props.Weather.Loaded && props.Notes.Loaded){
        isReady = true;
    }

    switch(isReady){
        case true:
            return (
                <div className='transition duration-300 ease-in-out flex w-full h-full bg-coolGray-100 dark:bg-coolGray-700'>
                    <div className='transition duration-300 ease-in-out text-coolGray-800 dark:text-white bg-coolGray-100 dark:bg-coolGray-600 overflow-auto w-full lg:w-1/2 h-full'>
                        <Weather {...props} />
                        <Discord {...props} />
                        <Articles {...props} />
                        <Footer />
                    </div>
                    <Sticky {...props} />
                </div>
            );
        default:
            return (
                <div className='transition duration-300 ease-in-out flex justify-around w-full h-full bg-coolGray-100 dark:bg-coolGray-700'>
                    <div className='self-center flex justify-around flex-col'>
                        <props.icons.LoaderDots/>
                    </div>
                </div>
            );
    }
   

}

export default Main;
