import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            setMessage({ text: 'Passwords do not match.', type: 'error' });
            return;
        }

        try {
            const response = await axios.post('/api/auth/update-password', {
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword
            });

            setMessage({ text: 'Password updated successfully! Redirecting to home page...', type: 'success' });

            // Redirect to home page after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            setMessage({ text: error.response?.data?.message || 'Failed to update password.', type: 'error' });
        }
    };

    const labelStyle = "block text-lg font-bold text-gray-800 mb-2";
    const inputStyle = "w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500";

    return (
        <div
            className="min-h-screen w-full font-sans py-12 px-4"
            style={{ backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #e6f7f6 100%)' }}
        >
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 sm:p-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-800">Reset Your Password</h1>
                </div>

                {message.text && (
                    <div className={`p-4 mb-6 rounded-lg text-center font-medium text-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className={labelStyle}>Your Email Address:</label>
                        <input id="email" type="email" name="email" required className={inputStyle} />
                    </div>
                    <div>
                        <label htmlFor="password" className={labelStyle}>New Password:</label>
                        <input id="password" type="password" name="password" required className={inputStyle} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className={labelStyle}>Confirm New Password:</label>
                        <input id="confirmPassword" type="password" name="confirmPassword" required className={inputStyle} />
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-green-600 hover:bg-green-700">
                            Save New Password
                        </button>
                    </div>
                </form>
                <p className="text-center text-md mt-6">
                    <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                        &larr; Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
