import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {

    return(
        <nav className='sticky max-h-full top-0 z-30 flex items-center justify-between flex-wrap bg-primary border-accent border-b-4 shadow-lg'>
            <div className='block lg:hidden p-2'>
                <button onClick={props.Theme.menu} className='links mr-4 flex items-center px-3 py-2 border rounded text-accent border-accent hover:text-accent hover:bg-accent'>
                    <svg className='fill-current stroke-current text-default h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><title>Menu</title><path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'/></svg>
                </button>
            </div>
            <div className='text-default w-full lg:h-full block flex flex-col flex-grow lg:flex-row lg:items-center justify-between text-left lg:w-auto'>
                <div className='animate__animated mx-4 linklist hidden h-full flex flex-col items-center lg:items-start lg:block text-md lg:flex-grow'>
                    <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
                        <div id='links-block' className='text-md pb-3 lg:pb-0 px-3 lg:px-0 lg:text-sm h-full lg:flex-grow'>
                            <Link to={`/`} className='bg-other rounded p-2 block mt-4 lg:inline-block lg:mt-0 text-default hover:bg-accent mr-4'>Home</Link>
                            <Link to={`/stats`} className='bg-other rounded p-2 block mt-4 lg:inline-block lg:mt-0 text-default hover:bg-accent mr-4'>Friday</Link>
                            <Link to={`/sandstorm`} className='bg-other rounded p-2 block mt-4 lg:inline-block lg:mt-0 text-default hover:bg-accent mr-4'>Sandstorm Randomizer</Link>
                            <a href='https://benweare.co.uk' className='bg-other rounded p-2 block mt-4 lg:inline-block lg:mt-0 text-default hover:bg-accent mr-4'>About</a>
                            <a href='https://github.com/incendiarybean/BeanPi' className='bg-other rounded p-2 block mt-4 lg:inline-block lg:mt-0 text-default hover:bg-accent mr-4'>Source</a>
                        </div>
                        <div id='chatbox' className='relative w-64 flex flex-col justify hidden xl:block z-2 mr-6 text-center'>
                            <div className='group rounded shadow h-auto bg-secondary'>
                                <div className="flex p-1 rounded border bg-primary w-64">
                                    <input
                                        onKeyDown={props.Search.Google}
                                        onFocus={props.Search.setKeyIterator}
                                        onBlur={props.Search.hideSearch}
                                        id='search'
                                        className='ml-4 placeholder-default bg-primary focus:outline-none'
                                        placeholder='Search'
                                        autoComplete='off'
                                        list='quick-search'
                                    />
                                    <button onClick={props.Search.ButtonSearch} className="w-8 h-8 rounded bg-accent flex items-center justify-around hover:bg-other">
                                        <svg className='search-icon transform scale-125' height='21' viewBox='0 0 21 21' width='21' xmlns='http://www.w3.org/2000/svg'><g className='stroke-current text-default' fill='none' fillRule='evenodd' stroke='white' strokeLinecap='round' strokeLinejoin='round'><circle className='stroke-current text-default' cx='8.5' cy='8.5' r='5'/><path d='m17.571 17.5-5.571-5.5'/></g></svg>
                                    </button>
                                </div>
                                <div className='absolute dropdown-content hidden w-full bg-secondary' id='quick-search'>
                                {(props.Search.Results.length > 0) ?
                                    props.Search.Results.map((data) => (
                                        <a href={decodeURIComponent(data.url)} key={data.search}>
                                            <div className="hover:bg-other w-full p-2">
                                                {decodeURIComponent(data.search)}
                                            </div>
                                        </a>
                                    ))
                                    :
                                    <div></div>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div tabIndex='1' className='linklist hidden lg:block h-full relative started-container shadow-full inline-block p-2 lg:-ml-2 lg:pl-2 w-full lg:w-56 hover:bg-hover lg:inline-block lg:mt-0 cursor-pointer'>
                    <div className='started p-1 text-md'>
                        <div className='text-md flex flex-row justify-between'>
                            <p>Settings</p>
                            <svg height='21' viewBox='0 0 21 21' width='21' xmlns='http://www.w3.org/2000/svg'><g className='stroke-current text-default' fill='none' fillRule='evenodd' stroke='#2a2e3b' strokeLinecap='round' strokeLinejoin='round'><path className='stroke-current text-default' d='m14.5 9v-6.5'/><path className='stroke-current text-default' d='m14.5 18.5v-4.5'/><circle className='stroke-current text-default' cx='14.5' cy='11.5' r='2.5'/><path className='stroke-current text-default' d='m6.5 5v-2.5'/><path className='stroke-current text-default' d='m6.5 18.5v-8.5'/><circle cx='6.5' cy='7.5' r='2.5'/></g></svg>
                        </div>
                        <p className='lg:px-1 lg:-mt-1 lg:ml-1 text-accent text-xs'>Change your preferences.</p>
                    </div>
                    <div className='animate__animated animate__fadeIn animate__faster absolute bg-gray-100 text-left lg:text-center bg-primary rounded-b z-50 w-full lg:w-56 shadow-lg lg:mt-2 -ml-2' style={{display:'none'}}>
                        <div className='w-full h-16 flex flex-col justify-around p-4 hover:bg-hover items-center rounded-b'>
                            <p className='h-6'>Pick a Colour</p>
                            <div className='flex justify-around'>
                                <span id='set-blue' onClick={() => {props.Theme.setColor('blue');}} className='block p-1 self-center hover:border-2 :border-gray-400 rounded-full transition ease-in duration-300'>
                                    <span className='block rounded-full w-4 h-4 bg-blue-500'></span>
                                </span>
                                <span id='set-purple' onClick={() => {props.Theme.setColor('purple');}} className='block p-1 self-center hover:border-2 border-gray-400 rounded-full transition ease-in duration-300'>
                                    <span className='block rounded-full w-4 h-4 bg-purple-500'></span>
                                </span>
                                <span id='set-indigo' onClick={() => {props.Theme.setColor('indigo');}} className='block p-1 self-center hover:border-2 border-gray-400 rounded-full transition ease-in duration-300'>
                                    <span className='block rounded-full w-4 h-4 bg-indigo-500'></span>
                                </span>
                                <span id='set-yellow' onClick={() => {props.Theme.setColor('yellow');}} className='block p-1 self-center hover:border-2 border-gray-400 rounded-full transition ease-in duration-300'>
                                    <span className='block rounded-full w-4 h-4 bg-yellow-500'></span>
                                </span>
                                <span id='set-orange' onClick={() => {props.Theme.setColor('orange');}} className='block p-1 self-center hover:border-2 border-gray-400 rounded-full transition ease-in duration-300'>
                                    <span className='block rounded-full w-4 h-4 bg-yellow-600'></span>
                                </span>
                                <span id='set-green' onClick={() => {props.Theme.setColor('green');}} className='block p-1 self-center  hover:border-2 border-gray-400 rounded-full transition ease-in duration-300'>
                                    <span className='block rounded-full w-4 h-4 bg-green-500'></span>
                                </span>
                                <span id='set-red' onClick={() => {props.Theme.setColor('red');}} className='block p-1 self-center hover:border-2 border-gray-400 rounded-full transition ease-in duration-300'>
                                    <span className='block rounded-full w-4 h-4 bg-red-500'></span>
                                </span>
                            </div>
                        </div>
                        <div className='w-full flex justify-around p-4 hover:bg-hover items-center rounded-b'>
                            <p>Light</p>
                            <div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
                                <input type='checkbox' onClick={props.Theme.setTheme} name='toggle' id='toggle' className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'/>
                                <label htmlFor='toggle' className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'></label>
                            </div>
                            <p>Dark</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Nav;