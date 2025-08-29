// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MyApplications = () => {
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchApplications = async () => {
//             try {
//                 // This assumes your AuthContext sets the auth token header
//                 const response = await axios.get('/api/users/my-applications');
//                 setApplications(response.data);
//             } catch (error) {
//                 console.error("Failed to fetch applications:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchApplications();
//     }, []);

//     if (loading) {
//         return <p>Loading your applications...</p>;
//     }

//     return (
//         <div className="bg-white p-8 rounded-2xl shadow-lg">
//             <h2 className="text-3xl font-extrabold text-gray-800 mb-6">My Applications</h2>
//             {applications.length > 0 ? (
//                 <div className="space-y-4">
//                     {applications.map(app => (
//                         <div key={app._id} className="p-4 border rounded-lg flex justify-between items-center">
//                             <div>
//                                 <h3 className="font-bold">{app.scholarshipId.title}</h3>
//                                 <p className="text-sm text-gray-500">Applied on: {new Date(app.appliedDate).toLocaleDateString()}</p>
//                             </div>
//                             <span className="font-semibold text-blue-600">{app.status}</span>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>You have not applied for any scholarships yet.</p>
//             )}
//         </div>
//     );
// };

// export default MyApplications;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token'); // or get from AuthContext
                if (!token) {
                    console.error("No auth token found");
                    setLoading(false);
                    return;
                }

                const response = await axios.get('/api/users/my-applications', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setApplications(response.data || []);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) {
        return <p>Loading your applications...</p>;
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">My Applications</h2>

            {applications.length > 0 ? (
                <div className="space-y-4">
                    {applications.map(app => (
                        <div
                            key={app._id}
                            className="p-4 border rounded-lg flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold">
                                    {app.scholarshipId?.title || 'Scholarship Deleted'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Applied on:{' '}
                                    {app.appliedDate
                                        ? new Date(app.appliedDate).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </div>
                            <span className="font-semibold text-blue-600">
                                {app.status || 'Unknown'}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have not applied for any scholarships yet.</p>
            )}
        </div>
    );
};

export default MyApplications;
