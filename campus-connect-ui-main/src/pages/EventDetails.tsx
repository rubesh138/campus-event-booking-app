import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

type EventType = {
  _id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  totalSeats: number;
  availableSeats: number;
  image?: string;
};

const formatTime = (time: string) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  let h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${minutes} ${ampm}`;
};

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventType | null>(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ NEW

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load event");
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      if (!id) {
        setError("Invalid event ID");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first ❗");
        navigate("/login");
        return;
      }

      setLoading(true);
      setError(""); // ✅ clear old error

      await API.post(
        `/bookings/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegistered(true);

      setEvent((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          availableSeats: prev.availableSeats - 1,
        };
      });

    } catch (error: any) {
      console.error(error);
      setError(error?.response?.data?.message || "Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <p className="p-10">Loading...</p>;

  const bookedSeats = event.totalSeats - event.availableSeats;
  const progress = (bookedSeats / event.totalSeats) * 100;

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-6">

      {/* LEFT */}
      <div className="md:col-span-2">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={event.image || "https://via.placeholder.com/1200x600"}
            alt={event.title}
            className="w-full h-96 object-cover"
          />

          <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
            {event.category}
          </span>
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(event.date).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              {formatTime(event.time)}
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} />
              {event.location}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              About this Event
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Experience an exciting campus event filled with learning,
              innovation, and networking.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white shadow rounded-xl p-6 h-fit">
        <h2 className="text-xl font-semibold mb-4">
          Registration
        </h2>

        {/* ✅ ERROR MESSAGE UI */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 mb-3">
          <Users size={20} className="text-green-600" />
          <p className="text-gray-600">Available Seats</p>

          <span className="ml-auto font-semibold text-green-600">
            {event.availableSeats} / {event.totalSeats}
          </span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {registered ? (
          <div className="bg-green-100 border border-green-300 text-green-700 p-6 rounded-lg text-center">
            <div className="text-3xl mb-2">✔</div>
            <h3 className="font-semibold text-lg">
              You're Registered!
            </h3>
          </div>
        ) : (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleRegister}
            disabled={event.availableSeats === 0 || loading}
          >
            {loading ? "Registering..." : "Register for Event"}
          </Button>
        )}

        <Button
          variant="outline"
          className="w-full mt-3"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

    </div>
  );
}