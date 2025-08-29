import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // --- Core Info ---
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
        gender: '',
        dateOfBirth: '',
        aadhaarNumber: '',

        // --- Address ---
        address: {
            state: '',
            city: '',
            pinCode: '',
            fullAddress: '',
            domicileState: '',
        },

        // --- Guardian Details ---
        guardian: {
            name: '',
            contactNumber: '',
        },

        // --- Academic Details ---
        academics: {
            qualification: '',
            courseName: '',
            stream: '',
            collegeSchoolName: '',
            rollNumber: '',
            currentYearSemester: '',
            boardUniversity: '',
            cgpaOrPercentage: '',
        },

        // --- Documents ---
        documents: {
            photo: null,
            aadhaarCard: null,
            incomeCertificate: null,
            casteCertificate: null,
            disabilityCertificate: null,
            previousYearResult: null,
            admissionProof: null,
            marksheet10th: null,
            marksheet12th: null,
        }
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handles changes for simple and nested form fields
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    
    // Handles file inputs
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const [section, field] = name.split('.');
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: files[0]
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        
        setLoading(true);

        // Use FormData to handle both file uploads and text data.
        const data = new FormData();

        // Append all text fields
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('mobileNumber', formData.mobileNumber);
        data.append('gender', formData.gender);
        data.append('dateOfBirth', formData.dateOfBirth);
        data.append('aadhaarNumber', formData.aadhaarNumber);

        // Append nested objects as stringified JSON
        data.append('address', JSON.stringify(formData.address));
        data.append('guardian', JSON.stringify(formData.guardian));
        data.append('academics', JSON.stringify(formData.academics));

        // Append files
        Object.keys(formData.documents).forEach(key => {
            if (formData.documents[key]) {
                data.append(key, formData.documents[key]);
            }
        });

        try {
            // Axios will automatically set the correct 'multipart/form-data' header
            const response = await axios.post('/api/auth/register', data);

            console.log('Registration successful:', response.data);
            navigate('/login');

        } catch (err) {
            console.error('Registration failed:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-lg font-bold">
            <div className="sm:mx-auto sm:w-full sm:max-w-3xl ">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your Student Account
                </h2>
                <p className="mt-2 text-center text-1xl text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-green-600 hover:text-green-600 font-semibold">
                        Log in here
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl text-2xl font-bold shadow-2xl">
                <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10">
                    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                        {error && <p className="text-center text-sm text-red-600 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
                        
                        {/* --- Personal Information Section --- */}
                        <div className="space-y-6 pt-8 text-lg font-bold">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                                <p className="mt-1 text-sm text-gray-500">Basic details about the student.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3"><label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label><input type="text" name="firstName" id="firstName" required value={formData.firstName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-3"><label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label><input type="text" name="lastName" id="lastName" required value={formData.lastName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-4"><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label><input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-3"><label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label><input type="tel" name="mobileNumber" id="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-3"><label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700">Aadhaar Number</label><input type="text" name="aadhaarNumber" id="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-3"><label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label><input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-3"><label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label><select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"><option>Select Gender</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                                <div className="sm:col-span-3"><label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label><input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-3"><label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label><input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                            </div>
                        </div>

                        {/* --- Address Section --- */}
                        <div className="space-y-6 pt-8">
                            <div><h3 className="text-lg leading-6 font-medium text-gray-900">Address</h3></div>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6"><label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">Full Address</label><input type="text" name="address.fullAddress" id="fullAddress" value={formData.address.fullAddress} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-2"><label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label><input type="text" name="address.city" id="city" value={formData.address.city} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-2"><label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label><input type="text" name="address.state" id="state" value={formData.address.state} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-2"><label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label><input type="text" name="address.pinCode" id="pinCode" value={formData.address.pinCode} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                            </div>
                        </div>

                        {/* --- Academic Details Section --- */}
                        <div className="space-y-6 pt-8">
                             <div><h3 className="text-lg leading-6 font-medium text-gray-900">Academic Details</h3></div>
                             <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3"><label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Highest Qualification</label><select id="qualification" name="academics.qualification" value={formData.academics.qualification} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"><option>Select</option><option>10th</option><option>12th</option><option>Diploma</option><option>Graduation</option></select></div>
                                <div className="sm:col-span-3"><label htmlFor="stream" className="block text-sm font-medium text-gray-700">Stream</label><input type="text" name="academics.stream" id="stream" value={formData.academics.stream} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                                <div className="sm:col-span-6"><label htmlFor="collegeSchoolName" className="block text-sm font-medium text-gray-700">College/School Name</label><input type="text" name="academics.collegeSchoolName" id="collegeSchoolName" value={formData.academics.collegeSchoolName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /></div>
                             </div>
                        </div>

                        {/* --- Documents Upload Section --- */}
                        <div className="space-y-6 pt-8">
                             <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Documents Upload</h3>
                                <p className="mt-1 text-sm text-gray-500">Please upload the required documents.</p>
                             </div>
                             <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3"><label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label><input type="file" name="documents.photo" id="photo" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/></div>
                                <div className="sm:col-span-3"><label htmlFor="aadhaarCard" className="block text-sm font-medium text-gray-700">Aadhaar Card</label><input type="file" name="documents.aadhaarCard" id="aadhaarCard" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/></div>
                                <div className="sm:col-span-3"><label htmlFor="marksheet10th" className="block text-sm font-medium text-gray-700">10th Marksheet</label><input type="file" name="documents.marksheet10th" id="marksheet10th" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/></div>
                                <div className="sm:col-span-3"><label htmlFor="marksheet12th" className="block text-sm font-medium text-gray-700">12th Marksheet</label><input type="file" name="documents.marksheet12th" id="marksheet12th" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/></div>
                             </div>
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Cancel</button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                >
                                    {loading ? 'Registering...' : 'Create Account'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
