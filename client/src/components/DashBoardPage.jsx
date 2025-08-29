import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiFileText, FiClock, FiAward } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

// --- Reusable Stat Card ---
const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4 border border-gray-100">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-3xl font-extrabold text-gray-800">{value}</p>
            <p className="text-gray-500 font-semibold">{label}</p>
        </div>
    </div>
);

// --- Recommended Scholarship Card ---
const RecommendedScholarshipCard = ({ scholarship }) => (
    <div className="bg-white p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="flex items-start space-x-4">
            <img
                src={scholarship.imageUrl}
                alt={scholarship.title}
                className="w-16 h-16 object-cover rounded-xl"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/100x100/e6f7f6/15803d?text=S';
                }}
            />
            <div>
                <h4 className="font-bold text-gray-800">{scholarship.title}</h4>
                <p className="text-sm text-gray-500">{scholarship.organization}</p>
                <p className="text-md font-bold text-green-700 mt-1">{scholarship.award}</p>
            </div>
        </div>
        <div className="mt-4 flex justify-end">
            <Link
                to={`/scholarship/${scholarship._id}`}
                className="text-sm font-semibold text-green-600 hover:underline"
            >
                View Details &rarr;
            </Link>
        </div>
    </div>
);

const DashboardPage = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ applied: 0, inReview: 0, awarded: 0 });
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch recommended scholarships + update stats when user changes
    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get('/api/scholarships');
                setRecommended(res.data.slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch recommendations:", error);
            } finally {
                setLoading(false);
            }
        };

        // Update stats from user data
        if (user && user.appliedScholarships) {
            const applications = user.appliedScholarships;
            setStats({
                applied: applications.length,
                inReview: applications.filter(a => a.status === 'In Review').length,
                awarded: applications.filter(a => a.status === 'Awarded').length,
            });
        }

        fetchRecommendations();
    }, [user]);

    if (!user) {
        return <div>Loading dashboard...</div>;
    }

    const gotoServicePage = () => {
        navigate('/services');
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Welcome back, {user?.firstName || user.name}!
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                    Here's your scholarship summary and recommendations.
                </p>
            </div>

            {/* Stats */}
            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <StatCard icon={<FiFileText size={24} className="text-blue-600" />} label="Applied" value={stats.applied} color="bg-blue-100" />
                    <StatCard icon={<FiClock size={24} className="text-orange-600" />} label="In Review" value={stats.inReview} color="bg-orange-100" />
                    <StatCard icon={<FiAward size={24} className="text-green-600" />} label="Awarded" value={stats.awarded} color="bg-green-100" />
                </div>

                {/* Recommended Scholarships */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Recommended for You</h3>
                    {loading ? (
                        <p>Loading recommendations...</p>
                    ) : (
                        <div className="space-y-4">
                            {recommended.length > 0 ? (
                                recommended.map(scholarship => (
                                    <RecommendedScholarshipCard key={scholarship._id} scholarship={scholarship} />
                                ))
                            ) : (
                                <p>No recommendations found at this time.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Go to Service Page Button */}
            <div className="mt-12">
                <button
                    className="w-full sm:w-auto text-center font-bold px-8 py-3 rounded-lg transition-colors shadow-md disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer bg-green-600 text-white hover:bg-green-700"
                    onClick={gotoServicePage}
                >
                    Go to Service Page
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
