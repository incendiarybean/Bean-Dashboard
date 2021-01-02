import React from 'react';
import { Weather, Articles, Sticky } from './addons';
import { Footer } from '../index.js';

function Main(props){

    return (
        <div className='flex w-full h-full'>
            <div className='bg-secondary overflow-auto w-full lg:w-1/2 h-full'>
                <Weather {...props} />
                <Articles {...props} />
                <Footer />
            </div>
            <Sticky {...props} />
        </div>
    );
}

export default Main;
