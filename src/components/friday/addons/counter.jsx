import React from 'react';

function Component(props){

    const update = (type, action) => {
        let params = new URLSearchParams({type:type, action:action});
        fetch(`https://${process.env.REACT_APP_HOST}/api/v0/friday?${params}`, {
            method: 'PATCH'
        })
        .then(data => data.json())
        .then(() => {
            props.custom('💠Updated Friday.');
        })
        .catch(e => {
            return props.error(e);
        });

        switch(type){
            case 'win':
                if(action === 'add') return props.Friday.Today.addWin();
                else return props.Friday.Today.removeWin();
            case 'loss':
                if(action === 'add') return props.Friday.Today.addLoss();
                else return props.Friday.Today.removeLoss();
            default:
                return props.error('💥 No information supplied!');
        }
    };

    return (
        <div className='bg-secondary flex flex-col w-full h-full'>
            <div className='p-2 flex justify-around w-full'>
                <div className='flex-1 p-2'>
                    <h1 className='p-2 text-default font-semi-bold'>Home</h1>
                    <hr className='w-full'/>
                    <p id='home' className='text-center text-red-400 font-bold rounded-full bg-other shadow-md p-2 mt-2'>{props.Friday.Today.Wins}</p>
                </div>
                <div className='flex-1 p-2'>
                    <h1 className='p-2 text-default font-semi-bold'>Away</h1>
                    <hr className='w-full'/>
                    <p id='away' className='text-center text-red-400 font-bold rounded-full bg-other shadow-md p-2 mt-2'>{props.Friday.Today.Losses}</p>
                </div>
            </div>
            <div className='p-2 flex justify-around w-full'>
                <div className='flex-1 p-2'>
                    <hr className='w-full mb-4'/>
                    <button onClick={e => update('win', 'add')} className='transition duration-500 ease-in-out bg-other hover:bg-green-600 rounded w-full shadow p-2 flex justify-center items-center mt-2'>
                        <svg className='text-default' height='25' viewBox='0 0 21 21' width='25' xmlns='http://www.w3.org/2000/svg'>
                            <g className='stroke-current' fill='none' fillRule='evenodd' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round' transform='translate(2 3)'><path d='m8 16c4.4380025 0 8-3.5262833 8-7.96428571 0-4.43800246-3.5619975-8.03571429-8-8.03571429-4.43800245 0-8 3.59771183-8 8.03571429 0 4.43800241 3.56199755 7.96428571 8 7.96428571z'/><path d='m4 8h8'/><path d='m8 12.0563492v-8.0563492z'/></g>
                        </svg>
                    </button>
                    <button onClick={e => update('win', 'remove')} className='transition duration-500 ease-in-out bg-other hover:bg-red-600 rounded w-full shadow p-2 flex justify-center items-center mt-4'>
                        <svg className='text-default' height='25' viewBox='0 0 21 21' width='25' xmlns='http://www.w3.org/2000/svg'>
                            <g className='stroke-current' fill='none' fillRule='evenodd' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round' transform='translate(2 3)'><path d='m8 16c4.4380025 0 8-3.5262833 8-7.96428571 0-4.43800246-3.5619975-8.03571429-8-8.03571429-4.43800245 0-8 3.59771183-8 8.03571429 0 4.43800241 3.56199755 7.96428571 8 7.96428571z'/><path d='m4 8h8'/></g>
                        </svg>
                    </button>
                </div>
                <div className='flex-1 p-2'>
                    <hr className='w-full mb-4'/>
                    <button onClick={e => update('loss', 'add')} className='transition duration-500 ease-in-out bg-other hover:bg-green-600 rounded w-full shadow p-2 flex justify-center items-center mt-2'>
                        <svg className='text-default' height='25' viewBox='0 0 21 21' width='25' xmlns='http://www.w3.org/2000/svg'>
                            <g className='stroke-current' fill='none' fillRule='evenodd' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round' transform='translate(2 3)'><path d='m8 16c4.4380025 0 8-3.5262833 8-7.96428571 0-4.43800246-3.5619975-8.03571429-8-8.03571429-4.43800245 0-8 3.59771183-8 8.03571429 0 4.43800241 3.56199755 7.96428571 8 7.96428571z'/><path d='m4 8h8'/><path d='m8 12.0563492v-8.0563492z'/></g>
                        </svg>
                    </button>
                    <button onClick={e => update('loss', 'remove')} className='transition duration-500 ease-in-out bg-other hover:bg-red-600 rounded w-full shadow p-2 flex justify-center items-center mt-4'>
                        <svg className='text-default' height='25' viewBox='0 0 21 21' width='25' xmlns='http://www.w3.org/2000/svg'>
                            <g className='stroke-current' fill='none' fillRule='evenodd' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round' transform='translate(2 3)'><path d='m8 16c4.4380025 0 8-3.5262833 8-7.96428571 0-4.43800246-3.5619975-8.03571429-8-8.03571429-4.43800245 0-8 3.59771183-8 8.03571429 0 4.43800241 3.56199755 7.96428571 8 7.96428571z'/><path d='m4 8h8'/></g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Component;
