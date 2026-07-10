import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Pages
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Subjects from "../pages/Subjects/Subjects";
import SubjectDetails from "../pages/Subjects/SubjectDetails";
import TopicDetails from "../pages/Subjects/TopicDetails";
import Projects from "../pages/Projects/Projects";
import ProjectDetails from "../pages/Projects/ProjectDetails";
import Resources from "../pages/Resources/Resources";
import MockInterview from "../pages/MockInterview/MockInterview";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";

import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Landing />} />

      {/* Authentication */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Route>

      {/* Protected Routes */}

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:id" element={<SubjectDetails />} />
        <Route path="/topic-details" element={<TopicDetails />} />
        <Route path="/topics/:topicId" element={<TopicDetails />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} /> 
        <Route path="/resources" element={<Resources />} />
        <Route path="/mockinterview" element={<MockInterview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;