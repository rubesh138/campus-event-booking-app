import { HashRouter, Routes, Route } from "react-router-dom";
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

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER */}
        <Route path="/" element={<Index />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* 🔥 ADMIN (NO PROTECTION FOR DEMO) */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateEvent />} />
        <Route path="/admin/events" element={<EventList />} />

        {/* FALLBACK */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      <Chatbot />
    </HashRouter>
  );
}