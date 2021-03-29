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
        <div className='bg-coolGray-200 dark:bg-coolGray-700 text-gray-800 dark:text-white flex flex-col w-full h-full'>
            <div className='flex justify-around w-full'>
                <div className='flex-1 p-2'>
                    <h1 className='p-2 font-semi-bold'>Home</h1>
                    <hr className='w-full border-gray-400 dark:border-gray-100'/>
                    <p id='home' className='text-center text-red-400 font-bold rounded-full bg-white dark:bg-coolGray-800 shadow p-2 mt-2'>{props.Friday.Today.Wins}</p>
                </div>
                <div className='flex-1 p-2'>
                    <h1 className='p-2 font-semi-bold'>Away</h1>
                    <hr className='w-full border-gray-400 dark:border-gray-100'/>
                    <p id='away' className='text-center text-red-400 font-bold rounded-full bg-white dark:bg-coolGray-800 shadow p-2 mt-2'>{props.Friday.Today.Losses}</p>
                </div>
            </div>
            <div className='flex justify-around w-full -mt-2'>
                <div className='flex-1 p-2'>
                    <hr className='w-full mb-4 border-gray-400 dark:border-gray-100'/>
                    <button onClick={e => update('win', 'add')} className='transition duration-500 ease-in-out bg-white dark:bg-coolGray-800  hover:bg-green-600 rounded w-full shadow p-2 flex justify-center items-center mt-2'>
                       <props.icons.Plus/>
                    </button>
                    <button onClick={e => update('win', 'remove')} className='transition duration-500 ease-in-out bg-white dark:bg-coolGray-800  hover:bg-red-600 rounded w-full shadow p-2 flex justify-center items-center mt-4'>
                        <props.icons.Minus/>
                    </button>
                </div>
                <div className='flex-1 p-2'>
                    <hr className='w-full mb-4 border-gray-400 dark:border-gray-100'/>
                    <button onClick={e => update('loss', 'add')} className='transition duration-500 ease-in-out bg-white dark:bg-coolGray-800 hover:bg-green-600 rounded w-full shadow p-2 flex justify-center items-center mt-2'>
                        <props.icons.Plus/>
                    </button>
                    <button onClick={e => update('loss', 'remove')} className='transition duration-500 ease-in-out bg-white dark:bg-coolGray-800 hover:bg-red-600 rounded w-full shadow p-2 flex justify-center items-center mt-4'>
                        <props.icons.Minus/>
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Component;
