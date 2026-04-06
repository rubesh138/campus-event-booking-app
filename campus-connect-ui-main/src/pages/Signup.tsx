import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/api/auth";

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        name: formData.name, // ✅ CORRECT FIELD
        email: formData.email,
        password: formData.password,
      });

      toast({
        title: "Account created!",
        description: "Welcome to CampusEvents. You can now sign in.",
      });

      navigate("/login");
    } catch (err: any) {
      toast({
        title: "Signup failed",
        description: err.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-12 items-center justify-center">
        <div className="max-w-md text-primary-foreground">
          <GraduationCap className="h-16 w-16 mb-8" />
          <h1 className="text-4xl font-bold mb-4">Join CampusEvents</h1>
          <p className="text-lg opacity-90">
            Create your account and start exploring amazing events.
            Connect with fellow students and learn new things.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">

          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create an account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create account"}
            </Button>

          </form>

          {/* Login Link */}
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}