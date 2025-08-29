import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import your existing page components
import NavBar from './components/NavBar';
import LoginPage from './components/Login';
import RegisterPage from './components/RegisterPage';
import ImageSlider from './components/ImageSlider';
import StatsSection from './components/StatsSection';
import TypingAnimation from './components/TypingAnimation';
import ApplicationSteps from './components/ApplicationSteps';
import BecomePartner from './components/BecomePartner';
import Footer, { AboutUsPage, ContactUsPage, FAQPage, TermsAndConditionsPage } from './components/Footer';
import CreateScholarship from './components/createscholarship';
import Services from "./components/StudentServicesPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import DashboardPage from './components/DashBoardPage';
import DashboardLayout from './components/DashboardLayout';
import MyApplications from './components/MyApplications';
import ScholarshipDetailPage from './components/ScholarshipDetailPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import AdminUserList from './components/AdminUserList'; // <-- Import new
import AdminUserDetail from './components/AdminUserDetail'; // <-- Import new

// --- Main App Component ---
const App = () => {
    return (
        <AuthProvider>
            <Router>
                
                <NavBar />
                <main>
                    <Routes>
                        <Route path="/" element={
                            <div>
                                <TypingAnimation
                                    text="Welcome To The Scholarship Portal"
                                    className="text-center text-4xl mt-10 font-bold text-green-700"
                                    duration={70}
                                />
                                <ImageSlider />
                                <StatsSection />
                                <ApplicationSteps />
                                <BecomePartner />
                            </div>
                        } />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/contact" element={<ContactUsPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/terms" element={<TermsAndConditionsPage />} />
                        <Route path="/create-scholarship" element={<CreateScholarship />} />
                        <Route path="/services" element={<Services />}></Route>
                        <Route path="/forgot-password" element={<ForgotPasswordPage />}> </Route>
                        <Route path="*" element={<div className="text-center text-2xl mt-10">Page Not Found</div>} />
                        <Route path="/scholarship/:id" element={<ScholarshipDetailPage />} />

                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<DashboardPage />} />
                            <Route path="my-applications" element={<MyApplications />} />
                            {/* Add routes for 'awarded' and 'settings' later */}
                        </Route>

                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route path="dashboard" element={<AdminDashboard />} />
                                <Route path="users" element={<AdminUserList />} />
                                {/* --- THIS IS THE MISSING ROUTE --- */}
                                <Route path="users/:id" element={<AdminUserDetail />} />
                                <Route path="scholarships" element={<div>Scholarships Management Page Coming Soon</div>} />
                            </Route>
                        </Route>

                    </Routes>
                </main>

                <Footer />
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
            </Router>
        </AuthProvider>
    );
};

export default App;
