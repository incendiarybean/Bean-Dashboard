import React from 'react';
import { Weather, Articles, Sticky, Discord } from './addons';
import { Footer } from '../index.js';

function Main(props){

    return (
        <div className='flex w-full h-full'>
            <div className='text-gray-800 dark:text-white bg-gray-100 dark:bg-coolGray-600 overflow-auto w-full lg:w-1/2 h-full'>
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
