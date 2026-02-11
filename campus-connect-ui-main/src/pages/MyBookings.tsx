import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/components/layout/Header";
import { BookingCard, type Booking } from "@/components/events/BookingCard";
import { useToast } from "@/hooks/use-toast";
import { CalendarX } from "lucide-react";

export default function MyBookings() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/bookings/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(res.data);
      } catch (error) {
        toast({
          title: "Failed to load bookings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground mb-8">
          Manage your event registrations
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16">
            <CalendarX className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p>No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
