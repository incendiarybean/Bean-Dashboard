import React from 'react';
import { Server } from './addon';

function Component(props){

    const Provider = () => {
        if(!props.News.Loaded){
            return (
                <div className='w-56 inline-flex leading-none text-sm'>
                    <span className='w-full shadow bg-primary rounded-full inline-flex items-center px-4 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-white transition ease-in-out duration-150 cursor-not-allowed' disabled=''>
                        <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                        </svg>
                        <p className='name inline-flex mt-1 text-default'>Loading Discord...</p>
                    </span>
                </div>
            );
        } else if (props.News.Loaded === 'Failed') {
            return (
                <div className='w-56 inline-flex leading-none text-sm'>
                    <div className='w-full inline-flex bg-primary leading-none text-black rounded-full p-2 shadow text-sm'>
                        <span className='inline-flex text-white rounded-full h-6 p-1 py-2 justify-center items-center text-'>
                            <svg height='25' viewBox='0 0 21 21' width='25' xmlns='http://www.w3.org/2000/svg'><g className='stroke-current' fill='none' fillRule='evenodd'><circle cx='10.5' cy='10.5' r='8' stroke='white' strokeLinecap='round' strokeLinejoin='round'/><path d='m10.5 11.5v-5' stroke='white' strokeLinecap='round' strokeLinejoin='round'/><circle cx='10.5' cy='14.5' fill='white' r='1'/></g></svg>
                        </span>
                        <p className='name inline-flex mt-1 px-2 text-default'>Failed.</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='p-2 flex-initial'>
                    <div className='w-full inline-flex bg-primary leading-none text-black rounded-full p-2 shadow text-sm'>
                        <span className='inline-flex text-white rounded-full h-6 px-1 justify-center items-center'>
                            <svg height='25' viewBox='0 0 21 21' width='25' xmlns='http://www.w3.org/2000/svg'><g fill='none' fillRule='evenodd'><circle cx='10.5' cy='10.5' r='8' stroke='white' strokeLinecap='round' strokeLinejoin='round'/><path d='m10.5 14.5v-4' stroke='white' strokeLinecap='round' strokeLinejoin='round'/><circle cx='10.5' cy='7.5' fill='white' r='1'/></g></svg>
                        </span>
                        <p className='hover:text-blue-500 underline name inline-flex mt-1 px-2 text-default'>Provided by Discord.</p>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className='animate__animated animate__fadeIn bg-secondary w-full h-auto'>
            <div className='px-4 pt-2 flex justify-between'>
                <div className='flex-1'>
                    <h1 className='p-2 text-default font-semi-bold'>Discord</h1>
                    <hr className='w-full'/>
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