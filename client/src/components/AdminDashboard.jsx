// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FiUsers, FiAward } from 'react-icons/fi';

// const StatCard = ({ icon, label, value, color }) => (
//     <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center">
//         <div className={`p-3 rounded-full ${color}`}>{icon}</div>
//         <div className="ml-4">
//             <p className="text-3xl font-extrabold text-gray-800">{value}</p>
//             <p className="text-gray-500 font-semibold">{label}</p>
//         </div>
//     </div>
// );

// const AdminDashboard = () => {
//     const [stats, setStats] = useState({ totalUsers: 0, totalScholarships: 0 });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const { data } = await axios.get('/api/admin/stats');
//                 setStats(data);
//             } catch (error) {
//                 console.error("Failed to fetch admin stats:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStats();
//     }, []);

//     return (
//         <div>
//             <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Admin Dashboard</h1>
//             {loading ? <p>Loading stats...</p> : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <StatCard icon={<FiUsers size={24} className="text-blue-600"/>} label="Total Users" value={stats.totalUsers} color="bg-blue-100" />
//                     <StatCard icon={<FiAward size={24} className="text-green-600"/>} label="Total Scholarships" value={stats.totalScholarships} color="bg-green-100" />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminDashboard;


// 16-08-2025
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const StatusButton = ({ currentStatus, newStatus, onClick, children, color }) => (
    <button
        onClick={() => onClick(newStatus)}
        disabled={currentStatus === newStatus}
        className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
            currentStatus === newStatus
                ? `${color} text-white`
                : `bg-gray-200 text-gray-700 hover:bg-gray-300`
        }`}
    >
        {children}
    </button>
);

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const { data } = await axios.get('/api/admin/applications');
            setApplications(data);
        } catch (error) {
            toast.error("Failed to fetch applications.");
            console.error("Failed to fetch applications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusUpdate = async (userId, applicationId, status) => {
        try {
            await axios.put('/api/admin/application-status', { userId, applicationId, status });
            toast.success(`Application status updated to ${status}`);
            // Update the status in the local state for immediate feedback
            setApplications(prevApps =>
                prevApps.map(app =>
                    app.applicationId === applicationId ? { ...app, status } : app
                )
            );
        } catch (error) {
            toast.error("Failed to update status.");
            console.error("Failed to update status:", error);
        }
    };

    if (loading) return <p>Loading applications...</p>;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Scholarship Applications</h1>
            <div className="space-y-4">
                {applications.length > 0 ? applications.map(app => (
                    <div key={app.applicationId} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">{app.scholarshipTitle}</h3>
                                <p className="text-sm text-gray-600">Applicant: <span className="font-semibold">{app.userName}</span></p>
                                <p className="text-sm text-gray-500">
                                    Education: {app.userAcademics?.qualification || 'N/A'} - {app.userAcademics?.stream || 'N/A'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-blue-600">{app.status}</p>
                                <p className="text-xs text-gray-400">{new Date(app.appliedDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t flex items-center gap-2">
                            <StatusButton currentStatus={app.status} newStatus="Awarded" onClick={(status) => handleStatusUpdate(app.userId, app.applicationId, status)} color="bg-green-500">Approve</StatusButton>
                            <StatusButton currentStatus={app.status} newStatus="Rejected" onClick={(status) => handleStatusUpdate(app.userId, app.applicationId, status)} color="bg-red-500">Reject</StatusButton>
                            <StatusButton currentStatus={app.status} newStatus="In Review" onClick={(status) => handleStatusUpdate(app.userId, app.applicationId, status)} color="bg-yellow-500">In Review</StatusButton>
                        </div>
                    </div>
                )) : <p>No applications found.</p>}
            </div>
        </div>
    );
};

export default AdminDashboard;
