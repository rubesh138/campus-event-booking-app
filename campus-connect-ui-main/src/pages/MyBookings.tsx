import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ USE SERVICE FUNCTIONS
import { getMyBookings, cancelBooking } from "@/api/bookings";

export default function MyBookings() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
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

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ CANCEL BOOKING
  const handleCancel = async (id: string) => {
    try {
      await cancelBooking(id);

      toast({
        title: "Booking cancelled",
      });

      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      toast({
        title: "Cancel failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-10 max-w-3xl mx-auto">

        {/* ✅ REMOVED HEADING FOR REVIEW */}
        <div className="mb-4"></div>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16">
            <CalendarX className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p>No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const event = booking.event;
              if (!event) return null;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-xl border shadow-sm p-6 flex justify-between items-start hover:shadow-md transition"
                >
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      {event.title}
                    </h2>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      {new Date(event.date).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Clock size={16} />
                      {event.time}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <MapPin size={16} />
                      {event.location}
                    </div>

                    <span className="inline-block mt-3 text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      confirmed
                    </span>
                  </div>

                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}