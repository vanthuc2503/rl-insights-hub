import { Link, useLocation } from 'react-router-dom';
import { Brain, PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">RL Blog</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button
              variant={location.pathname === '/' ? 'secondary' : 'ghost'}
              size="sm"
            >
              Trang chủ
            </Button>
          </Link>
          <Link to="/admin">
            <Button
              variant={location.pathname === '/admin' ? 'default' : 'outline'}
              size="sm"
              className="gap-2"
            >
              <PenSquare className="h-4 w-4" />
              Quản trị
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
