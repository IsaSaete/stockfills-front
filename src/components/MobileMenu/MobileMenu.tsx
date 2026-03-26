import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Stock", href: "/stock" },
  { label: "Historial", href: "/historial" },
];

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isMounted) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (isOpen) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsMounted(false);
    }, 220);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isMounted, isOpen]);

  const openMenu = () => {
    setIsMounted(true);
    window.requestAnimationFrame(() => {
      setIsOpen(true);
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    closeMenu();
    navigate("/");
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={openMenu}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary"
        aria-label="Abrir menu principal"
        aria-expanded={isMounted}
        aria-controls="mobile-header-menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isMounted && (
        <div
          id="mobile-header-menu"
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          <button
            type="button"
            aria-label="Cerrar menu"
            className={`absolute inset-0 bg-black/70 transition-opacity duration-200 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
          />

          <div
            className={`absolute inset-0 flex flex-col bg-background px-6 pb-6 pt-5 transition-transform duration-200 ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="mb-6 flex items-center justify-between border-b border-border-primary pb-4">
              <span className="font-mono text-xl font-bold tracking-wide">
                STOCKFILS
              </span>
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <button
                  type="button"
                  onClick={closeMenu}
                  className="rounded p-1.5 hover:bg-card-background/80"
                  aria-label="Cerrar menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-lg font-medium transition-colors ${
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto space-y-4 border-t border-border-primary pt-4">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-lg font-semibold text-red-600 transition-colors hover:bg-red-600/10"
              >
                <LogOut className="h-5 w-5" />
                Cerrar sesion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
