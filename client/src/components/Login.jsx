import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

// Google Icon SVG
const GoogleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 9.92C34.553 6.08 29.613 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.841-5.841C34.553 6.08 29.613 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.618-3.22-11.303-7.583l-6.571 4.819A20.003 20.003 0 0 0 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.617 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Get the login function and loading state from context
    const { login, loading } = useAuth(); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Use the login function from context
        const result = await login(email, password); 

        if (result.success) {
            navigate('/'); // Redirect on successful login
        } else {
            setError(result.message || 'Login failed. Please check your credentials.');
        }
    };

    const handleGoogleLogin = () => {
        console.log('Initiating Google Login...');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans text-lg font-semibold shadow-2xl">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl text-gray-800">
                        Student Portal Login
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Welcome back! Please enter your details.
                    </p>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-50"
                >
                    <GoogleIcon />
                    <span className="ml-3">Log in with Google</span>
                </button>

                <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative px-2 bg-white text-sm text-gray-500">
                        Or continue with
                    </div>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && <p className="text-center text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all" placeholder="you@example.com" />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all" placeholder="••••••••" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500">Forgot your password?</Link>
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-50">
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-green-600 hover:text-green-500">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
