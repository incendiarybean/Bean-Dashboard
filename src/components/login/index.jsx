import React, {useState} from 'react';

function Main(props){
    const [mode, setMode] = useState('Login');

    const LogMode = () => {
        return (
            <div className='transition duration-300 flex justify-around ease-in-out text-coolGray-800 dark:text-white bg-coolGray-100 dark:bg-coolGray-600 overflow-auto w-full h-full'>
                {(mode !== 'Login') ?
                    <form id="signUp" onSubmit={e => props.SignUp(e)} className="transition duration-300 ease-in-out flex flex-col self-center py-16 px-10 shadow-md bg-white dark:bg-coolGray-800 text-center">
                        <p className="bg-blue-400 dark:bg-purple-400 p-2 rounded font-semibold text-white shadow mb-4">Bean-Dashboard</p>
                        <h1 className="font-semibold text-coolGray-700 dark:text-white text-left uppercase">Sign Up</h1>
                        <input autoComplete="false" id="firstname" type="text" placeholder="Firstname" name="password" className="transition duration-300 ease-in-out my-1 p-2 bg-coolGray-100 dark:bg-coolGray-700 shadow-inner border-b-2 border-coolGray-200 dark:border-coolGray-600 hover:border-blue-400 focus:border-purple-400 dark:hover:border-purple-400 dark:focus:border-blue-400 outline-none"></input>
                        <input autoComplete="false" id="surname" type="text" placeholder="Surname" name="password" className="transition duration-300 ease-in-out my-1 p-2 bg-coolGray-100 dark:bg-coolGray-700 shadow-inner border-b-2 border-coolGray-200 dark:border-coolGray-600 hover:border-blue-400 focus:border-purple-400 dark:hover:border-purple-400 dark:focus:border-blue-400 outline-none"></input>
                        <input autoComplete="false" id="username" type="text" placeholder="Username" name="username" className="transition duration-300 ease-in-out my-1 p-2 bg-coolGray-100 dark:bg-coolGray-700 shadow-inner border-b-2 border-coolGray-200 dark:border-coolGray-600 hover:border-blue-400 focus:border-purple-400 dark:hover:border-purple-400 dark:focus:border-blue-400 outline-none"></input>
                        <input autoComplete="false" id="password" type="password" placeholder="Password" name="password" className="transition duration-300 ease-in-out my-1 p-2 bg-coolGray-100 dark:bg-coolGray-700 shadow-inner border-b-2 border-coolGray-200 dark:border-coolGray-600 hover:border-blue-400 focus:border-purple-400 dark:hover:border-purple-400 dark:focus:border-blue-400 outline-none"></input>
                        <input autoComplete="false" id="email" type="email" placeholder="Email" name="password" className="transition duration-300 ease-in-out my-1 p-2 bg-coolGray-100 dark:bg-coolGray-700 shadow-inner border-b-2 border-coolGray-200 dark:border-coolGray-600 hover:border-blue-400 focus:border-purple-400 dark:hover:border-purple-400 dark:focus:border-blue-400 outline-none"></input>
                        <button type="submit" className="transition duration-300 ease-in-out text-white my-2 p-2 rounded bg-gray-900 hover:bg-green-600 hover:text-green-100">Create Account!</button>
                        <button onClick={() => {setMode('Login');}} type="button" className="transition duration-300 ease-in-out text-blue-400 hover:text-purple-400 dark:text-purple-400 dark:hover:text-blue-400 outline-none">Already a Member? (Login)</button>
                    </form>
                    :
                    <form id="signOn" onSubmit={e => props.Login(e)} className="transition duration-300 ease-in-out flex flex-col self-center py-16 px-10 shadow-md bg-white dark:bg-coolGray-800 text-center">
                        <p className="bg-blue-400 dark:bg-purple-400 p-2 rounded font-semibold text-white shadow mb-4">Bean-Dashboard</p>
                        <h1 className="font-semibold text-coolGray-700 dark:text-white text-left uppercase">Login</h1>
                        <input autoComplete="false" id="username" type="text" placeholder="Username" name="username" className="transition duration-300 ease-in-out my-1 p-2 bg-coolGray-100 dark:bg-coolGray-700 shadow-inner border-b-2 border-coolGray-200 dark:border-coolGray-600 hover:border-blue-400 focus:border-purple-400 dark:hover:border-purple-400 dark:focus:border-blue-400 outline-none"></input>
                        <input autoComplete="false" id="password" type="password" placeholder="Password" name="password" className="transition duration-300 ease-in-out my-1 p-2 bg-coolGray-100 dark:bg-coolGray-700 shadow-inner border-b-2 border-coolGray-200 dark:border-coolGray-600 hover:border-blue-400 focus:border-purple-400 dark:hover:border-purple-400 dark:focus:border-blue-400 outline-none"></input>
                        <button type="submit" className="transition duration-300 ease-in-out my-2 p-2 rounded bg-gray-900 hover:bg-green-600 text-white hover:text-green-100">Login</button>
                        <button onClick={() => {setMode('Sign');}} type="button" className="transition duration-300 ease-in-out text-blue-400 hover:text-purple-400 dark:text-purple-400 dark:hover:text-blue-400 outline-none">No Account? (Sign Up)</button>
                    </form>
                }
            </div>
        );
    };

    return (
        <div className='transition duration-300 ease-in-out flex w-full h-full bg-coolGray-100 dark:bg-coolGray-700'>
            <LogMode/>
        </div>
    );
}

export default Main;
