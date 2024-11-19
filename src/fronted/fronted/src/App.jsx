import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductDetail from './screens/ProductDetailScreen';
import ProjectListingScreen from './screens/ProjectListingScreen';
import Navbar from './components/Navbar/Navbar.jsx';
import Sidebar from './components/Profile/View/Sidebar.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ParticlesComponent from './components/General/Particles.jsx';
import Footer from './components/Hero/Footer.jsx';
import EditProfileScreen from './screens/EditProfileScreen.jsx';
import ViewProfileScreen from './screens/ViewProfileScreen.jsx';
import Dashboard from './screens/Dashboard.jsx';
import MessagingScreen from './screens/MessagingScreen.jsx';
import PrivateRoute from './components/General/PrivateRoute';
import ProfileLayout from './components/Profile/View/ProfileLayout';
import PayingScreen from './screens/PayingScreen';
import YourProjects from './components/Management/yourProjects.jsx';
import ProjectBacklog from './components/Management/ProjectBacklog.jsx';
import FreelancersListScreen from './screens/FreelancersListScreen';
import ConfigScreen from './screens/ConfigScreen';
import ChangePassword from './screens/ChangePassword';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import Notifications from './components/Notifications/Notifications';
import ViewOthersProfileScreen from './screens/ViewOthersProfileScreen';
import OffersScreen from './screens/OffersScreen';
import AboutScreen from "@/screens/AboutScreen.jsx";


function AppContent({ userInfo }) {
    const location = useLocation();
    const showSidebar = location.pathname.startsWith('/profile');

    return (
        <div className="bg-zinc-950 min-h-screen flex flex-col"> {/* Fondo aplicado aquí */}

            <Navbar />
            <div id="mainContent" className="flex flex-grow">
                {showSidebar && <Sidebar id="sidebar" className="w-64" />}
                <div className="flex-grow">
                    <Routes>
                        <Route path="" element={<HomeScreen />} />
                        <Route path="/about" element={<AboutScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/profiles/edit" element={<EditProfileScreen />} />
                        <Route path="/profile" element={<ViewProfileScreen />} />
                        <Route path="/profile/" element={<ViewOthersProfileScreen />} />
                        <Route path="/public/profile/:freelancerId" element={<ViewOthersProfileScreen />} />
                        <Route path="/project/:projectId" element={<ProductDetail />} />
                        <Route path="/profile/project/:projectId/backlog" element={<ProjectBacklog />} />
                        <Route path="/profile/projects/" element={<YourProjects />} />
                        <Route path="/project/:projectId" element={<ProductDetail />} />
                        <Route path="/projects/" element={<ProjectListingScreen />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/messaging" element={<MessagingScreen />} />
                        <Route path="/freelancers" element={<FreelancersListScreen />} />
                        <Route path="/changePassword/:id" element={<ChangePassword />} />
                        <Route path="/profile/notifications" element={<Notifications />} />

                        {/* Rutas protegidas por PrivateRoute */}
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <ProfileLayout />
                                </PrivateRoute>
                            }
                        >
                            <Route index element={<ViewProfileScreen />} />
                            <Route path="edit" element={<EditProfileScreen />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="messaging" element={<MessagingScreen />} />
                            <Route path="payments" element={<PayingScreen />} />
                            <Route path="offers" element={<OffersScreen />} />
                            <Route path="configuration" element={<ConfigScreen />} />
                        </Route>
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function App() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin || {};

    return (
        <Router>
            <AppContent userInfo={userInfo} />
        </Router>
    );
}

export default App;

