import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');
        if(isLoggedIn) {
            navigate('/');
            window.location.reload();
        }
    },[navigate]);

    const validateEmail = () => {
        const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        return emailRegex.test(email);
    };

    const validatePassword = () => {
        return password.length >= 6 && password.length <= 16;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError({ email: '', password: '' });  // Reset error messages

        if (!validateEmail()) {
            setError((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
            return;
        }

        if (!validatePassword()) {
            setError((prevErrors) => ({ ...prevErrors, password: 'Password must be between 6 and 16 characters' }));
            return;
        }

        const payload = { email, password };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/token', payload);
            if (response.data.token) {  // Assuming the token is in response.data.token
                localStorage.setItem('token', response.data.token);  // Store token in localStorage
                navigate('/');  // Redirect upon successful login
            } else {
                setLoginError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            setLoginError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold text-center mb-6 text-white">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.email && <p className="text-red-500 text-xs mt-2">{error.email}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error.password && <p className="text-red-500 text-xs mt-2">{error.password}</p>}
                </div>
                {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
