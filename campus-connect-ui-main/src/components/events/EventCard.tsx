import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    category: string;
    image: string;
    date: string;
    time: string;
    location: string;
    seats: number;
  };
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden border shadow">
      <img
        src={event.image || "https://via.placeholder.com/600x400"}
        alt={event.title}
        className="h-44 w-full object-cover"
      />

      <div className="p-5">
        <Badge className="mb-2">{event.category}</Badge>

        <h3 className="font-semibold text-lg mb-3">{event.title}</h3>

        <div className="space-y-1 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {event.time}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.location}
          </div>
        </div>

        {/* ✅ FIXED ID */}
        <Link to={`/event/${event._id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
