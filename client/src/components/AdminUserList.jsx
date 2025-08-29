import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('/api/admin/users');
                setUsers(data);
            } catch (error) {
                toast.error("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Manage Users</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <Link to={`/admin/users/${user._id}`} key={user._id} className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all">
                        <h3 className="font-bold text-lg text-gray-900">{user.firstName} {user.lastName}</h3>
                        <p className="text-sm text-gray-600 break-all">{user.email}</p>
                        <p className="text-xs text-gray-400 mt-2">Role: {user.role}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminUserList;
