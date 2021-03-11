import React from 'react';
import { Link } from 'react-router-dom';
function Nav(props) {

    return(
        <nav className='sticky max-h-full top-0 z-30 flex items-center justify-between flex-wrap bg-primary border-accent border-b-4 shadow-lg'>
            <div className='block lg:hidden p-2'>
                <button onClick={props.Theme.menu} className='links mr-4 flex items-center px-3 py-2 border rounded text-accent border-accent hover:text-accent hover:bg-accent'>
                    <props.icons.Burger/>
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
                                <div className="transition duration-300 group focus-within:border-accent hover:border-accent flex p-1 rounded border border-default bg-primary w-64">
                                    <input
                                        onKeyDown={props.Search.Google}
                                        onFocus={props.Search.setKeyIterator}
                                        onBlur={props.Search.hideSearch}
                                        id='search'
                                        className='transition duration-300 group ml-4 placeholder-default bg-primary focus:outline-none'
                                        placeholder='Search'
                                        autoComplete='off'
                                        list='quick-search'
                                    />
                                    <button onClick={props.Search.ButtonSearch} className="w-8 h-8 rounded bg-accent flex items-center justify-around hover:bg-gray-700">
                                        <props.icons.Search/>
                                    </button>
                                </div>
                                <div className='absolute dropdown-content hidden w-full bg-secondary rounded-b' id='quick-search'>
                                {(props.Search.Results.length > 0) ?
                                    props.Search.Results.map((data, index) => (
                                        (index === 9) ?
                                            <a className="rounded-b hover:bg-other" href={decodeURIComponent(data.url)} key={data.search}>
                                                <div className="rounded-b hover:bg-other w-full p-2">
                                                    <p dangerouslySetInnerHTML={{__html: decodeURIComponent(data.search)}}></p>
                                                </div>
                                            </a>
                                            :
                                            <a href={decodeURIComponent(data.url)} key={data.search}>
                                                <div className="hover:bg-other w-full p-2">
                                                    <p dangerouslySetInnerHTML={{__html: decodeURIComponent(data.search)}}></p>
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
                            <props.icons.Settings/>
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