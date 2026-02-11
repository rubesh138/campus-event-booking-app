export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  totalSeats: number;
  availableSeats: number;
  category: string;
  imageUrl: string;
  registeredStudents: number;
}

export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  date: string;
  time: string;
  venue: string;
  status: "confirmed" | "pending" | "cancelled";
  registeredAt: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Tech Innovation Summit 2024",
    description: "Join us for an exciting day of technology discussions, workshops, and networking. Learn about the latest trends in AI, blockchain, and cloud computing from industry experts. Perfect for students interested in technology and innovation.",
    date: "2024-03-15",
    time: "09:00 AM",
    venue: "Main Auditorium, Building A",
    totalSeats: 200,
    availableSeats: 45,
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    registeredStudents: 155,
  },
  {
    id: "2",
    title: "Annual Cultural Fest",
    description: "Experience the vibrant cultural diversity of our campus with performances, art exhibitions, and food stalls from around the world. Celebrate unity in diversity!",
    date: "2024-03-20",
    time: "10:00 AM",
    venue: "Open Air Theatre",
    totalSeats: 500,
    availableSeats: 230,
    category: "Cultural",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    registeredStudents: 270,
  },
  {
    id: "3",
    title: "Career Fair 2024",
    description: "Meet top recruiters from leading companies. Bring your resume and dress professionally. Pre-registration required for guaranteed entry.",
    date: "2024-03-25",
    time: "11:00 AM",
    venue: "Convention Center",
    totalSeats: 300,
    availableSeats: 78,
    category: "Career",
    imageUrl: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800",
    registeredStudents: 222,
  },
  {
    id: "4",
    title: "Entrepreneurship Workshop",
    description: "Learn the fundamentals of starting your own business. Topics include ideation, funding, marketing, and scaling your startup.",
    date: "2024-04-02",
    time: "02:00 PM",
    venue: "Business School, Room 301",
    totalSeats: 50,
    availableSeats: 12,
    category: "Workshop",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    registeredStudents: 38,
  },
  {
    id: "5",
    title: "Sports Day Championship",
    description: "Annual inter-department sports competition featuring athletics, basketball, football, and more. Come support your department!",
    date: "2024-04-10",
    time: "08:00 AM",
    venue: "University Stadium",
    totalSeats: 1000,
    availableSeats: 650,
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1461896836934- voices-of-the-night?w=800",
    registeredStudents: 350,
  },
  {
    id: "6",
    title: "Guest Lecture: AI in Healthcare",
    description: "Dr. Sarah Chen from Stanford discusses the revolutionary impact of artificial intelligence in modern healthcare and medicine.",
    date: "2024-04-15",
    time: "03:00 PM",
    venue: "Lecture Hall 2",
    totalSeats: 150,
    availableSeats: 89,
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800",
    registeredStudents: 61,
  },
];

export const categories = [
  "All",
  "Technology",
  "Cultural",
  "Career",
  "Workshop",
  "Sports",
];

export const bookings: Booking[] = [
  {
    id: "b1",
    eventId: "1",
    eventTitle: "Tech Innovation Summit 2024",
    date: "2024-03-15",
    time: "09:00 AM",
    venue: "Main Auditorium, Building A",
    status: "confirmed",
    registeredAt: "2024-02-28",
  },
  {
    id: "b2",
    eventId: "3",
    eventTitle: "Career Fair 2024",
    date: "2024-03-25",
    time: "11:00 AM",
    venue: "Convention Center",
    status: "confirmed",
    registeredAt: "2024-03-01",
  },
  {
    id: "b3",
    eventId: "4",
    eventTitle: "Entrepreneurship Workshop",
    date: "2024-04-02",
    time: "02:00 PM",
    venue: "Business School, Room 301",
    status: "pending",
    registeredAt: "2024-03-05",
  },
];
