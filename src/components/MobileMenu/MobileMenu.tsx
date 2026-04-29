import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
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
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
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
            className={`absolute inset-0 flex min-h-screen flex-col bg-panel px-6 pb-6 pt-5 transition-transform duration-200 ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <NavLink
                to="/"
                onClick={closeMenu}
                className="text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                STOCKFILS
              </NavLink>
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <button
                  type="button"
                  onClick={closeMenu}
                  className="rounded p-1.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label="Cerrar menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <nav className="flex flex-1 flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                      isActive
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto space-y-4 border-t border-border pt-4">
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
