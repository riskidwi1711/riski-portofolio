import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Mountain, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useProfile } from "@/lib/api"; // Import useProfile

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
];

export function Header() {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const { data: profileData } = useProfile(); // Fetch profile data

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = cn(
    "sticky top-0 z-50 w-full transition-all duration-300",
    scrolled ? "border-b border-border/40 bg-background/80 backdrop-blur-lg" : "bg-transparent"
  );

  const HireMeButton = () => (
    <Link to="/contact">
      <Button className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 font-medium text-white backdrop-blur-3xl">
          Hire Me
        </span>
      </Button>
    </Link>
  );

  // Dynamically create social links based on profileData
  const socialLinks = [
    profileData?.htmlUrl && {
      to: profileData?.htmlUrl,
      label: "GitHub",
      icon: Github,
    },
    profileData?.linkedin && {
      to: profileData?.linkedin,
      label: "LinkedIn",
      icon: Linkedin,
    },
  ].filter(Boolean); // Filter out any null/undefined entries

  if (isMobile) {
    return (
      <header className={headerClasses}>
        <div className="container flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <Mountain className="h-6 w-6 text-orange-400" />
            <span className="sr-only">Riski Patrio</span>
          </NavLink>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background/95 backdrop-blur-lg">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  {navLinks.map((link) => (
                     <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        cn("hover:text-orange-400 transition-colors", isActive ? "text-orange-400 font-bold" : "text-muted-foreground")
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <div className="flex items-center gap-4 mt-6">
                    {socialLinks.map((link) => (
                      <a
                        key={link.to}
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-orange-400 transition-colors"
                      >
                        <link.icon className="h-6 w-6" />
                      </a>
                    ))}
                  </div>
                  <div className="mt-6">
                    <HireMeButton />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={headerClasses}>
      <div className="container flex h-16 items-center">
        <NavLink to="/" className="mr-6 flex items-center space-x-2">
          <Mountain className="h-6 w-6 text-orange-400" />
          <span className="sr-only">Riski Patrio</span>
        </NavLink>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn("hover:text-orange-400 transition-colors", isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400 font-bold" : "text-foreground/70")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {socialLinks.map((link) => (
              <Tooltip key={link.to}>
                <TooltipTrigger asChild>
                  <a
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-orange-400">
                      <link.icon className="h-5 w-5" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
          <HireMeButton />
        </div>
      </div>
    </header>
  );
}