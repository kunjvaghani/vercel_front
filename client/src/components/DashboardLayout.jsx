import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiFileText, FiAward, FiSettings, FiLogOut } from 'react-icons/fi';
// Make sure you have useAuth hook from your AuthContext
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const linkClasses = "flex items-center px-4 py-3 text-lg font-semibold text-gray-600 rounded-lg transition-colors";
    const activeLinkClasses = "bg-green-100 text-green-700";

    return (
        <div className="min-h-screen" style={{ backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #e6f7f6 100%)' }}>
            <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* --- Sidebar --- */}
                    <aside className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit">
                        <nav className="space-y-2">
                            <NavLink to="/dashboard" end className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-50'}`}><FiGrid className="mr-3" /> Dashboard</NavLink>
                            <NavLink to="/dashboard/my-applications" className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-50'}`}><FiFileText className="mr-3" /> My Applications</NavLink>
                            <NavLink to="/dashboard/awarded" className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-50'}`}><FiAward className="mr-3" /> Awarded</NavLink>
                            <NavLink to="/dashboard/settings" className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-50'}`}><FiSettings className="mr-3" /> Settings</NavLink>
                            <button onClick={handleLogout} className={`${linkClasses} w-full text-red-600 hover:bg-red-50`}>
                                <FiLogOut className="mr-3" /> Logout
                            </button>
                        </nav>
                    </aside>

                    {/* --- Main Content --- */}
                    <main className="md:col-span-3">
                        <Outlet /> {/* Child routes will render here */}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
