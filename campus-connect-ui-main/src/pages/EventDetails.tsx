import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import API from "@/api/api";
import { bookEvent } from "@/api/bookings";

type EventType = {
  _id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  seats: number;
  image?: string;
};

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch {
        toast({
          title: "Event not found",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, toast]);

  const handleBook = async () => {
    if (!event) return;

    try {
      setBooking(true);
      await bookEvent(event._id);

      toast({
        title: "Event booked successfully 🎉",
      });

      navigate("/my-bookings");
    } catch (err: any) {
      toast({
        title: "Booking failed",
        description: err.response?.data?.message || "Already booked",
        variant: "destructive",
      });
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!event) return <p className="p-6">Event not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-muted-foreground mb-4">{event.category}</p>

      <p>📅 {new Date(event.date).toLocaleDateString()}</p>
      <p>⏰ {event.time}</p>
      <p>📍 {event.location}</p>
      <p className="mb-6">🪑 Seats left: {event.seats}</p>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>

        <Button onClick={handleBook} disabled={booking}>
          {booking ? "Booking..." : "Book Event"}
        </Button>
      </div>
    </div>
  );
}
