import React, {useState} from 'react';

function Main(props){
    const [mode, setMode] = useState('login');

    switch(mode){
        case 'sign':
            return (
                <div className='transition duration-300 ease-in-out flex w-full h-full bg-coolGray-100 dark:bg-coolGray-700'>
                    <div className='transition duration-300 flex justify-around ease-in-out text-coolGray-800 dark:text-white bg-coolGray-100 dark:bg-coolGray-600 overflow-auto w-full h-full'>
                        <form id="signUp" onSubmit={e => props.SignUp(e)} className="transition duration-300 ease-in-out flex flex-col self-center py-20 px-10 shadow bg-white dark:bg-coolGray-800 rounded text-center">
                            <input autoComplete="false" id="firstname" type="text" placeholder="Firstname" name="password" className="transition duration-300 ease-in-out my-2 p-2 rounded bg-coolGray-100 dark:bg-coolGray-700 shadow-inner"></input>
                            <input autoComplete="false" id="surname" type="text" placeholder="Surname" name="password" className="transition duration-300 ease-in-out my-2 p-2 rounded bg-coolGray-100 dark:bg-coolGray-700 shadow-inner"></input>
                            <input autoComplete="false" id="username" type="text" placeholder="Username" name="username" className="transition duration-300 ease-in-out my-2 p-2 rounded bg-coolGray-100 dark:bg-coolGray-700 shadow-inner"></input>
                            <input autoComplete="false" id="password" type="password" placeholder="Password" name="password" className="transition duration-300 ease-in-out my-2 p-2 rounded bg-coolGray-100 dark:bg-coolGray-700 shadow-inner"></input>
                            <input autoComplete="false" id="email" type="email" placeholder="Email" name="password" className="transition duration-300 ease-in-out my-2 p-2 rounded bg-coolGray-100 dark:bg-coolGray-700 shadow-inner"></input>
                            <button type="submit" className="transition duration-300 ease-in-out text-white my-2 p-2 rounded bg-gray-900 hover:bg-green-600 hover:text-green-100">Sign Up</button>
                            <button onClick={() => {setMode('login');}} type="button" className="transition duration-300 ease-in-out text-white p-2 rounded bg-gray-900 hover:bg-green-600 hover:text-green-100">Login</button>
                        </form>
                    </div>
                </div>
            );
        default:
            return (
                <div className='transition duration-300 ease-in-out flex w-full h-full bg-coolGray-100 dark:bg-coolGray-700'>
                    <div className='transition duration-300 flex justify-around ease-in-out text-coolGray-800 dark:text-white bg-coolGray-100 dark:bg-coolGray-600 overflow-auto w-full h-full'>
                        <form id="signOn" onSubmit={e => props.Login(e)} className="transition duration-300 ease-in-out flex flex-col self-center py-20 px-10 shadow bg-white dark:bg-coolGray-800 rounded text-center">
                            <input autoComplete="false" id="username" type="text" placeholder="Username" name="username" className="transition duration-300 ease-in-out my-1 p-2 rounded bg-coolGray-100 dark:bg-coolGray-700 shadow-inner"></input>
                            <input autoComplete="false" id="password" type="password" placeholder="Password" name="password" className="transition duration-300 ease-in-out my-1 p-2 rounded bg-coolGray-100 dark:bg-coolGray-700 shadow-inner"></input>
                            <button type="submit" className="transition duration-300 ease-in-out my-2 p-2 rounded bg-gray-900 hover:bg-green-600 text-white hover:text-green-100">Login</button>
                            <button onClick={() => {setMode('sign');}} type="button" className="transition duration-300 ease-in-out p-2 rounded text-white bg-gray-900 hover:bg-green-600 hover:text-green-100">Sign Up</button>
                        </form>
                    </div>
                </div>
            );
    }
    

}

export default Main;
