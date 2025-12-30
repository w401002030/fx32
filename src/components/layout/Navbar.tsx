import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ContactDrawer } from '@/components/contact/ContactDrawer';
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: '首页', path: '/' },
    { name: '交易市场', path: '/shop' },
    { name: '科普中心', path: '/knowledge' },
    { name: '实盘战绩', path: '/#performance' },
  ];
  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    setIsMenuOpen(false);
    if (path.startsWith('/#')) {
      e.preventDefault();
      const hash = path.split('#')[1];
      if (location.pathname !== '/') {
        navigate(`/#${hash}`);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
  return (
    <>
      <nav className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-2 md:py-3"
          : "bg-transparent py-4 md:py-5"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,255,136,0.8)]">
                <Logo size={scrolled ? 28 : 32} />
              </div>
              <span className="text-xl md:text-2xl font-black font-display tracking-tighter text-white">EAforex</span>
            </Link>
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                link.path.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className={cn(
                      "text-sm font-bold transition-all hover:text-primary tracking-wide",
                      location.pathname === '/' && location.hash === "#" + link.path.split('#')[1] ? "text-primary" : "text-gray-400"
                    )}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "text-sm font-bold transition-all hover:text-primary tracking-wide",
                      location.pathname === link.path ? "text-primary" : "text-gray-400"
                    )}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="ml-6 pl-6 border-l border-white/10">
                <Button
                  onClick={() => setIsDrawerOpen(true)}
                  size="sm"
                  className="btn-gradient font-bold px-6 rounded-full gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> 咨询客服
                </Button>
              </div>
            </div>
            <div className="md:hidden flex items-center gap-3">
              <Button
                onClick={() => setIsDrawerOpen(true)}
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-primary/10"
              >
                <MessageSquare className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden animate-in fade-in slide-in-from-top-4 bg-black/95 backdrop-blur-2xl border-b border-white/5">
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                link.path.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.path}
                    className="block py-2.5 text-lg font-bold text-gray-300 hover:text-primary border-b border-white/5 last:border-0"
                    onClick={(e) => handleLinkClick(e, link.path)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block py-2.5 text-lg font-bold text-gray-300 hover:text-primary border-b border-white/5 last:border-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-4 pb-2">
                <Button
                  className="w-full btn-gradient font-bold rounded-xl h-12 gap-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsDrawerOpen(true);
                  }}
                >
                  <MessageSquare className="w-5 h-5" /> 咨询客服
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <ContactDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
}