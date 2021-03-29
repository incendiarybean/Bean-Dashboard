import React from 'react';
import { Server } from './addon';

function Component(props){

    const Provider = () => {
        if(!props.Discord.Loaded){
            return <props.Loading {...props} name='Discord'/>;
        } else if (props.Discord.Loaded === 'Failed') {
            return <props.Failed/>;
        } else {
            return <props.Loaded {...props} name='Discord JS' url='https://discord.js.org/#/' />;
        }
    };

    return (
        <div className='animate__animated animate__fadeIn w-full h-auto'>
            <div className='px-4 pt-2 flex justify-between'>
                <div className='flex-1'>
                    <h1 className='p-2 font-semi-bold'>Discord</h1>
                    <hr className='border-default w-full'/>
                </div>
                <Provider />
            </div>
            {(props.Discord.Group.length > 0 && props.Discord.Loaded !== 'Failed') ?
                <div className='w-full h-auto max-h-full overflow-visible xl:overflow-x-auto'>
                    <div id='discord_container' className='discord w-full flex flex-col xl:flex-row px-4 mb-2'>
                        {props.Discord.Group.map((data) => (
                            <Server key={`${data.name}-${new Date()}`} {...props} data={data} />
                        ))}
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    );

}

export default Component;