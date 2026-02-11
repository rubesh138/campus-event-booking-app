import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@/lib/mockData";
import axios from "axios";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    seats: "",
    category: "",
    image: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const payload = {
        title: formData.title,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        seats: Number(formData.seats),
        image: formData.image || "https://via.placeholder.com/600x400",
      };

      await axios.post(
        "http://localhost:5000/api/events",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Event created successfully",
      });

      navigate("/admin/events");
    } catch (error) {
      toast({
        title: "Failed to create event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">

                <Label>Title</Label>
                <Input onChange={(e) => handleChange("title", e.target.value)} />

                <Label>Description</Label>
                <Textarea onChange={(e) => handleChange("description", e.target.value)} />

                <Label>Date</Label>
                <Input type="date" onChange={(e) => handleChange("date", e.target.value)} />

                <Label>Time</Label>
                <Input type="time" onChange={(e) => handleChange("time", e.target.value)} />

                <Label>Location</Label>
                <Input onChange={(e) => handleChange("location", e.target.value)} />

                <Label>Seats</Label>
                <Input type="number" onChange={(e) => handleChange("seats", e.target.value)} />

                <Label>Category</Label>
                <Select onValueChange={(v) => handleChange("category", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "All").map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Label>Image URL (optional)</Label>
                <Input onChange={(e) => handleChange("image", e.target.value)} />

                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Event"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
