import React, { useState, useEffect , useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import { useAuth } from '../context/AuthContext'; 


// Helper function to format dates nicely
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

// A small component for displaying detail items to avoid repetition
const DetailItem = ({ label, value }) => (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
    </div>
);


const ScholarshipDetailPage = () => {
    const { id } = useParams(); // Gets the ':id' from the URL
   const { user, token, refetchUser } = useAuth();
    const [scholarship, setScholarship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isApplying, setIsApplying] = useState(false);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {

        const checkIfApplied = (applications) => {
            if (applications && applications.length > 0) {
                const applied = applications.some(app => app.scholarshipId === id);
                setIsApplied(applied);
            }
        };

        const fetchScholarshipDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/scholarships/${id}`);
                setScholarship(response.data);
                if (user) {
                    checkIfApplied(user.appliedScholarships);
                }
                setError(null);
            } catch (err) {
                console.error("Failed to fetch scholarship details:", err);
                setError("Could not load scholarship details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchScholarshipDetails();
    }, [id , user]); // Re-run this effect if the ID in the URL changes

    const handleApply = async () => {
        if (!user) {
            toast.error("Please log in to apply.");
            return;
        }

        setIsApplying(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            
            await axios.post(`/api/users/apply/${id}`, {}, config);
            
            toast.success("Applied Successfully!");
            setIsApplied(true);

            await refetchUser(); 
        } catch (err) {
            const message = err.response?.data?.message || "Application failed. Please try again.";
            toast.error(message);
        } finally {
            setIsApplying(false);
        }
    };


    // if (loading) {
    //     return <div className="text-center py-20">Loading scholarship information...</div>;
    // }

    // if (error) {
    //     return <div className="text-center py-20 text-red-600">{error}</div>;
    // }

    // if (!scholarship) {
    //     return <div className="text-center py-20">Scholarship not found.</div>;
    // }

    if (loading) return <div className="text-center py-20">Loading scholarship information...</div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
    if (!scholarship) return <div className="text-center py-20">Scholarship not found.</div>;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        {/* 1. Name of the scholarship */}
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{scholarship.title}</h1>

                        {/* 2. Organization name */}
                        <p className="mt-2 text-lg text-gray-600">Provided by: <span className="font-semibold">{scholarship.organization}</span></p>

                        {/* 3. Description */}
                        <div className="mt-6 prose prose-lg text-gray-700">
                            <h2 className="text-xl font-bold">Description</h2>
                            <p>{scholarship.description}</p>
                        </div>
                        
                        {/* Details Section */}
                        <div className="mt-8 border-t border-gray-200">
                           <dl className="divide-y divide-gray-200">
                                {/* 4. Category */}
                                <DetailItem label="Category" value={scholarship.category} />
                                
                                {/* 5. Start and End Date */}
                                <DetailItem label="Application Start Date" value={formatDate(scholarship.start_date)} />
                                <DetailItem label="Application End Date" value={formatDate(scholarship.end_date)} />
                                
                                {/* 6. Gender */}
                                <DetailItem label="Gender Eligibility" value={scholarship.gender} />
                                
                                {/* Other useful details from your schema */}
                                <DetailItem label="Education Level" value={scholarship.educationLevel} />
                                <DetailItem label="Applicable State" value={scholarship.state} />
                                <DetailItem label="Applicable Course" value={scholarship.course} />
                                <DetailItem label="Award" value={scholarship.award} />
                           </dl>
                        </div>

                        {/* Action Button */}
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link 
                                to="https://www.buddy4study.com/scholarships" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto text-center bg-gray-100 text-gray-800 font-bold px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
                            >
                                Visit Official Site
                            </Link>
                            
                            <button 
                                onClick={handleApply}
                                disabled={isApplying || isApplied}
                                className={`w-full sm:w-auto text-center font-bold px-8 py-3 rounded-lg transition-colors shadow-md disabled:cursor-not-allowed disabled:opacity-60
                                    ${isApplied 
                                        ? 'bg-green-200 text-green-800' 
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                    }
                                `}
                            >
                                {isApplying ? 'Submitting...' : isApplied ? '✓ Applied' : 'Apply Now'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link to="/services" className="text-green-600 hover:text-green-800 font-medium">
                        &larr; Back to all scholarships
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipDetailPage;