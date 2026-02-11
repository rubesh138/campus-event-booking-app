import { useEffect, useState } from "react";
import axios from "axios";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, TrendingUp, CalendarCheck } from "lucide-react";

type EventType = {
  _id: string;
  title: string;
  date: string;
  venue: string;
  imageUrl: string;
  totalSeats: number;
  availableSeats: number;
};

export default function AdminDashboard() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH EVENTS FROM BACKEND
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const totalEvents = events.length;
  const totalSeats = events.reduce((acc, e) => acc + e.totalSeats, 0);
  const filledSeats = events.reduce(
    (acc, e) => acc + (e.totalSeats - e.availableSeats),
    0
  );
  const averageAttendance =
    totalSeats === 0 ? 0 : Math.round((filledSeats / totalSeats) * 100);

  const stats = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Registrations",
      value: filledSeats,
      icon: Users,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Avg. Attendance",
      value: `${averageAttendance}%`,
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Upcoming Events",
      value: totalEvents,
      icon: CalendarCheck,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's an overview of your campus events.
            </p>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.slice(0, 5).map((event) => (
                      <div
                        key={event._id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString()} •{" "}
                              {event.venue}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {event.totalSeats - event.availableSeats}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            registrations
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
