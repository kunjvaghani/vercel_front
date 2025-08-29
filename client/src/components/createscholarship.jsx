import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateScholarship = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await axios.post('/api/scholarships', data);
            console.log('Scholarship created:', response.data);
            setMessage({ text: 'Scholarship successfully created!', type: 'success' });
            e.target.reset();
        } catch (error) {
            console.error('Error creating scholarship:', error);
            setMessage({ text: error.response?.data?.message || 'Failed to create scholarship.', type: 'error' });
        }
    };

    const inputStyle = "w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";
    const labelStyle = "block text-lg font-bold text-gray-800 mb-2";

    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
        "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
        "Ladakh", "Puducherry", "Chandigarh", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep"
    ];

    const courseOptions = [
        "Engineering", "Medical", "Arts", "Science", "Commerce", "Law", "Management", "General"
    ];

    return (
        
        <div 
            className="min-h-screen w-full font-sans py-12 px-4 sm:px-6 lg:px-8"
            style={{ backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #e6f7f6 100%)' }}
        >
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 sm:p-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        Let's Be Part Of  <span className="text-green-600">Scholarship</span>
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">Fill in the details below to add a scholarship to the portal.</p>
                </div>

                {message.text && (
                    <div className={`p-4 mb-6 rounded-lg text-center font-medium text-lg ${
                        message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="title" className={labelStyle}>Title:</label>
                            <input id="title" type="text" name="title" required className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="organization" className={labelStyle}>Organization:</label>
                            <input id="organization" type="text" name="organization" required className={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className={labelStyle}>Description:</label>
                        <textarea id="description" name="description" required rows="4" className={inputStyle}></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="award" className={labelStyle}>Award:</label>
                            <input id="award" type="text" name="award" required placeholder="e.g., ₹10,000 per year" className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="officialLink" className={labelStyle}>Official Link:</label>
                            <input id="officialLink" type="url" name="officialLink" required className={inputStyle} />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                            <label htmlFor="category" className={labelStyle}>Category:</label>
                            <select id="category" name="category" required className={inputStyle}>
                                <option value="General">General</option>
                                <option value="EWS">EWS</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="educationLevel" className={labelStyle}>Education Level:</label>
                            <select id="educationLevel" name="educationLevel" required className={inputStyle}>
                                <option value="Class 9-10">Class 9-10</option>
                                <option value="Class 11-12">Class 11-12</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Postgraduate">Postgraduate</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gender" className={labelStyle}>Gender:</label>
                            <select id="gender" name="gender" required className={inputStyle}>
                                <option value="All">All</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="start_date" className={labelStyle}>Start Date:</label>
                            <input id="start_date" type="date" name="start_date" required className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="end_date" className={labelStyle}>End Date:</label>
                            <input id="end_date" type="date" name="end_date" required className={inputStyle} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="course" className={labelStyle}>Course:</label>
                            <select id="course" name="course" required className={inputStyle}>
                                {courseOptions.map((course) => (
                                    <option key={course} value={course}>{course}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="state" className={labelStyle}>State:</label>
                            <select id="state" name="state" required className={inputStyle}>
                                {indianStates.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    

                    <div className="pt-6">
                        <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out hover:scale-105">
                            Create Scholarship
                        </button>
                    </div>
                </form>

                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button type="button" onClick={() => window.location.reload('0')} className="w-full sm:w-auto px-6 py-3 border-2 border-green-600 text-green-700 font-bold rounded-full hover:bg-green-50 transition-colors">
                        Add Another
                    </button>
                    <button type="button" onClick={() => navigate('/')} className="w-full sm:w-auto px-6 py-3 border border-transparent text-gray-700 font-bold rounded-full hover:bg-gray-100 transition-colors">
                        Go Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateScholarship;
