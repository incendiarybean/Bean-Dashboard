import React from 'react';
import { Day } from './';

function Component(props){

    return (
        <div className='col-span-3 xl:col-span-2 grid grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-2 px-0 xl:px-4'>
            {props.Weather.DailyWeather.map((data) => (
                <Day key={`${data.time}-${new Date()}`} {...props} data={data} />
            ))}
        </div>
    );

}

export default Component;