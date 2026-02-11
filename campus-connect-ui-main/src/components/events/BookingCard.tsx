import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Booking {
  _id: string;
  event: {
    title: string;
    date: string;
    time: string;
    location: string;
  } | null;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  // ✅ SAFETY CHECK (PREVENT BLANK PAGE)
  if (!booking.event) return null;

  const { event } = booking;

  return (
    <div className="bg-card rounded-xl p-5 shadow-card border">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-start gap-3 mb-3">
            <h3 className="font-semibold text-lg">
              {event.title}
            </h3>
            <Badge className="bg-success/10 text-success border-success/20">
              {booking.status}
            </Badge>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              {new Date(event.date).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              {event.time}
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {event.location}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Registered on{" "}
            {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
