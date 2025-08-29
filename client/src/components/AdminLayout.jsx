import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiUsers, FiAward, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const linkClasses = "flex items-center px-4 py-3 text-lg font-semibold text-gray-600 rounded-lg";
    const activeLinkClasses = "bg-blue-100 text-blue-700";

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-screen-xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <aside className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Panel</h2>
                        <nav className="space-y-2">
                            <NavLink to="/admin/dashboard" end className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-100'}`}><FiGrid className="mr-3" /> Dashboard</NavLink>
                            <NavLink to="/admin/users" className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-100'}`}><FiUsers className="mr-3" /> Users</NavLink>
                            <NavLink to="/admin/scholarships" className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-100'}`}><FiAward className="mr-3" /> Scholarships</NavLink>
                            <button onClick={handleLogout} className={`${linkClasses} w-full text-red-600 hover:bg-red-50`}>
                                <FiLogOut className="mr-3" /> Logout
                            </button>
                        </nav>
                    </aside>
                    <main className="md:col-span-3">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
