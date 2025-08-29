import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        // Show a loading indicator while auth state is being checked
        return <div>Loading...</div>;
    }

    // If authenticated and the user role is 'admin', render the child components (Outlet).
    // Otherwise, navigate them to the home page.
    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
