import React from 'react';
import { Weather, Weekly } from './addon';

function Component(props){

    const Provider = () => {
        if(!props.Weather.Loaded){
            return <props.Loading {...props} name='Weather'/>;
        } else if (props.Weather.Loaded === 'Failed') {
            return <props.Failed/>;
        } else {
            return <props.Loaded {...props} name='Met Office API'/>;
        }
    };

    return (
        <div className='animate__animated animate__fadeIn w-full h-auto'>
            <div className='px-4 pt-2 flex justify-between'>
                <div className='flex-1'>
                    <h1 className='p-2  font-semi-bold'>Weather</h1>
                    <hr className='border-default w-full'/>
                </div>
                <Provider />
            </div>
            {(props.Weather.Loaded && props.Weather.Loaded !== 'Failed') ?
                <div className='grid grid-cols-3 gap-4 px-4 xl:px-0 mb-2'>
                    <Weather {...props} />
                    <Weekly {...props} />
                </div>
                :
                <div></div>
            }

        </div>
    );

}

export default Component;

