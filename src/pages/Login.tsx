import { FormEvent, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Lock, User as UserIcon } from "lucide-react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, login } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const ok = await login(username.trim(), password);

    setLoading(false);

    if (!ok) {
      toast({
        title: "Đăng nhập thất bại",
        description: "Tên đăng nhập hoặc mật khẩu không đúng.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Đăng nhập thành công",
      description: "Chào mừng bạn quay lại khu vực quản trị.",
    });

    navigate(from, { replace: true });
  };

  // Nếu đã đăng nhập rồi mà vào /login, chuyển về /admin
  if (user?.role === "admin") {
    navigate("/admin", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">
              Đăng nhập quản trị
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Chỉ quản trị viên mới có quyền chỉnh sửa bài viết.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  Tên đăng nhập
                </label>
                <Input
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Hãy nhập tài khoản"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Mật khẩu
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Hãy nhập mật khẩu"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>

              <p className="mt-2 text-center text-xs text-muted-foreground">
                Tài khoản demo:{" "}
                <span className="font-mono">***** / ********</span>
              </p>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                <Link
                  to="/"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  Quay lại trang chủ
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;
