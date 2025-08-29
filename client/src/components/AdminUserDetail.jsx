import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DetailSection = ({ title, data }) => (
    <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-2">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <span className="font-semibold text-gray-500">{key}: </span>
                    <span>{value ? String(value) : 'N/A'}</span>
                </div>
            ))}
        </div>
    </div>
);

const AdminUserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/api/admin/users/${id}`);
                setUser(data);
            } catch (error) {
                toast.error("Failed to fetch user details.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) return <p>Loading user details...</p>;
    if (!user) return <p>User not found.</p>;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">{user.firstName} {user.lastName}</h1>
                    <p className="text-gray-600">{user.email}</p>
                </div>
                <Link to="/admin/users" className="text-sm font-semibold text-blue-600 hover:underline">&larr; Back to all users</Link>
            </div>

            <DetailSection title="Personal Information" data={{
                Gender: user.gender,
                DOB: new Date(user.dateOfBirth).toLocaleDateString(),
                Mobile: user.mobileNumber,
                Aadhaar: user.aadhaarNumber
            }} />

            <DetailSection title="Address" data={user.address || {}} />
            <DetailSection title="Guardian" data={user.guardian || {}} />
            <DetailSection title="Academics" data={user.academics || {}} />
            
        </div>
    );
};

export default AdminUserDetail;
