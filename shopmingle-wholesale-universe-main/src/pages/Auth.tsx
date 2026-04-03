import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { signIn, signUp, getCurrentUser, signOut } from "@/lib/dataService";
import { LogOut, User, ShoppingBag } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const u = await signIn(email, password);
        setUser(u);
        toast.success("Successfully logged in!");
        navigate("/");
      } else {
        await signUp(email, password);
        toast.success("Signup successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    toast.success("Logged out successfully");
  };

  if (user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-accent-foreground" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-2">My Account</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/catalog")}
                className="w-full bg-gradient-gold text-accent-foreground font-bold h-12 flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full h-12 flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? "Enter your credentials to continue" : "Join ShopMingle today"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:ring-2 focus:ring-gold/50 outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:ring-2 focus:ring-gold/50 outline-none"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-gold text-accent-foreground font-bold text-lg h-12"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gold hover:underline font-medium focus:outline-none"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
