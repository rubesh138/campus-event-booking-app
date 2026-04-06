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
    totalSeats: number;
    availableSeats: number;
  };
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition duration-300">

      {/* Event Image */}
      <div className="relative">
        <img
          src={event.image || "https://via.placeholder.com/600x400"}
          alt={event.title}
          className="h-48 w-full object-cover"
        />

        <Badge className="absolute top-4 left-4 bg-white text-black shadow">
          {event.category}
        </Badge>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-xl mb-4">{event.title}</h3>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            {new Date(event.date).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            {event.time}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            {event.location}
          </div>

        </div>

        <hr className="my-4" />

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
            <Users className="h-4 w-4" />
            {event.availableSeats} seats left
          </div>

          <Link to={`/event/${event._id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              View Details
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
}