import React from 'react';
import { Weather, Articles, Sticky, Discord } from './addons';
import { Footer } from '../index.js';

function Main(props){

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

}

export default Main;
