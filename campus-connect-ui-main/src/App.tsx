import { HashRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Chatbot from "@/components/Chatbot";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EventDetails from "./pages/EventDetails";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateEvent from "./pages/admin/CreateEvent";
import EventList from "./pages/admin/EventList";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <HashRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />

        <Route
          path="/event/:id"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* 🔥 ADMIN ROUTES (FORCE ENABLED FOR DEMO) */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateEvent />} />
        <Route path="/admin/events" element={<EventList />} />

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      {/* CHATBOT */}
      <Chatbot />

    </HashRouter>
  );
}