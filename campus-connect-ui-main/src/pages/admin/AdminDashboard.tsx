import { useEffect, useState } from "react";
import axios from "axios";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, CalendarCheck } from "lucide-react";

type EventType = {
  _id: string;
  title: string;
  date: string;
  location: string;
  image?: string;
  registrations?: number;
};

export default function AdminDashboard() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const token = localStorage.getItem("token");

        // EVENTS
        const eventsRes = await axios.get(
          "http://localhost:5000/api/events",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setEvents(eventsRes.data);

        // USERS COUNT
        const usersRes = await axios.get(
          "http://localhost:5000/api/auth/count"
        );

        setTotalUsers(usersRes.data.totalUsers);

      } catch (error) {
        console.error("Dashboard fetch error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  const totalEvents = events.length;

  const totalRegistrations = events.reduce(
    (sum, event) => sum + (event.registrations ?? 0),
    0
  );

  const stats = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: Calendar,
    },
    {
      title: "Total Registrations",
      value: totalRegistrations,
      icon: Users,
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
    },
    {
      title: "Upcoming Events",
      value: totalEvents,
      icon: CalendarCheck,
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
              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className="h-4 w-4" />
                    </CardHeader>

                    <CardContent>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* RECENT EVENTS */}
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

                          {event.image && (
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}

                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString()} • {event.location}
                            </p>
                          </div>

                        </div>

                        <div className="text-right">
                          <p className="font-semibold">
                            {event.registrations ?? 0}
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