import { Link, useLocation, useNavigate } from "react-router-dom";
import { Brain, PenSquare, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast({
      title: "Đã đăng xuất",
      description: "Bạn đã rời khỏi khu vực quản trị.",
    });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">RL Blog</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button
              variant={location.pathname === "/" ? "secondary" : "ghost"}
              size="sm"
            >
              Trang chủ
            </Button>
          </Link>

          <Link to="/admin">
            <Button
              variant={location.pathname === "/admin" ? "default" : "outline"}
              size="sm"
              className="gap-2"
            >
              <PenSquare className="h-4 w-4" />
              Quản trị
            </Button>
          </Link>

          {user && (
            <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">
                Đăng nhập với quyền quản trị:{" "}
                <span className="font-medium text-foreground">
                  {user.username}
                </span>
              </span>
            </div>
          )}

          {user ? (
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 gap-1"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </Button>
          ) : (
            <Link to="/login">
              <Button
                variant={location.pathname === "/login" ? "secondary" : "ghost"}
                size="sm"
                className="ml-2 gap-1"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
