import {Link, useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);  // Set to true if token exists
    }, []);

    const handleLogout = () => {
        // Remove token from localStorage and update state
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Main Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">To Do</span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/" className={`block py-2 px-3 rounded md:p-0 ${
                                location.pathname === '/'
                                    ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500'
                                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:dark:hover:text-blue-500'
                            }`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/todo" className={`block py-2 px-3 rounded md:p-0 ${
                                location.pathname === '/todo'
                                    ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500'
                                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:dark:hover:text-blue-500'
                            }`}>
                                Todo
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={`block py-2 px-3 rounded md:p-0 ${
                                location.pathname === '/about'
                                    ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500'
                                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:dark:hover:text-blue-500'
                            }`}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={`block py-2 px-3 rounded md:p-0 ${
                                location.pathname === '/contact'
                                    ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500'
                                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:dark:hover:text-blue-500'
                            }`}>
                                Contact
                            </Link>
                        </li>
                        {isLoggedIn ? (
                            <li>
                                <button onClick={handleLogout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Login/Register
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
