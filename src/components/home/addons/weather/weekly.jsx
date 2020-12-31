import React from 'react';
import Day from './day';

function Component(props){

    return (
        <div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-4 p-2">
            {props.Weather.DailyWeather.map((data) => (
                <Day key={data.time} {...props} data={data} />
            ))}
        </div>
    );
    
}

export default Component;