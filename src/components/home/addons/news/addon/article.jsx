import React from 'react';

function Component(props){

    return (
        <a className='min-w-100 group transition duration-300 ease-in-out bg-white dark:bg-coolGray-700 article relative shadow cursor-pointer bg-white dark:bg-coolGray-700 hover:bg-blue-100 dark:hover:bg-coolGray-800 overflow-hidden border-b-4 border-accent w-full mt-4 xl:mt-0 xl:w-1/3 mr-0 md:mr-4' href={props.data.link}>
            <img src={props.data.img} alt='People' className='transition duration-300 ease-in-out group-hover:opacity-75 w-full h-full object-cover h-32'/>
            <div className='h-full absolute bottom-0 z-50 bg-coolGray-700 bg-opacity-75 w-full flex flex-col'>
                <div className='shadow-inner p-4 min-h-24 z-10 overflow-none'>
                    <p className='text-accent font-semibold text-xs mb-1 leading-none'>News</p>
                    <h3 className='text-white font-semibold mb-2 text-xl leading-tight sm:leading-normal'>{props.data.title}</h3>
                </div>
                <div className='font-bold bg-accent w-1/2 rounded-tr absolute bottom-0 p-2 z-20'>
                    <div className='text-sm flex items-center'>
                        <svg height='21' viewBox='0 0 21 21' width='21' xmlns='http://www.w3.org/2000/svg'>
                            <g className='stroke-current text-white' fill='none' fillRule='evenodd' transform='translate(2 2)'><path className='stroke-current' d='m2.5.5h12c1.1045695 0 2 .8954305 2 2v12c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-12c0-1.1045695.8954305-2 2-2z' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round'/><path className='stroke-current' d='m.5 4.5h16' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round'/><g className='stroke-current text-white' fill='#2a2e3b'><g><circle className='stroke-current' cx='8.5' cy='8.5' r='1'/><circle className='stroke-current' cx='4.5' cy='8.5' r='1'/></g><circle className='stroke-current' cx='4.5' cy='12.5' r='1'/></g></g>
                        </svg>
                        <p className='ml-2 text-white leading-none'>{ props.data.date }</p>
                    </div>
                </div>
            </div>
        </a>
    );

}

export default Component;

