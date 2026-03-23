import { LogOut } from "lucide-react";
import { useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router";

const UserMenu: React.FC = () => {
  const { userInfo, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  const userInitials = userInfo?.username
    ? userInfo?.username
        .split(" ")
        .map((namePart) => namePart[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  const toggleUserMenu = () => {
    setIsMenuOpen((previousMenuState) => !previousMenuState);
  };

  const closeUserMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    closeUserMenu();
    navigate("/");
  };

  const handleMenuContainerBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocusedElement = event.relatedTarget as Node | null;

    if (!event.currentTarget.contains(nextFocusedElement)) {
      closeUserMenu();
    }
  };

  const handleMenuContainerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      closeUserMenu();
      menuTriggerRef.current?.focus();
    }
  };

  return (
    <div
      className="relative"
      onBlur={handleMenuContainerBlur}
      onKeyDown={handleMenuContainerKeyDown}
    >
      <button
        ref={menuTriggerRef}
        type="button"
        onClick={toggleUserMenu}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:opacity-90"
        aria-label="Abrir menú de usuario"
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        aria-controls="user-menu-dropdown"
      >
        {userInitials}
      </button>

      {isMenuOpen && (
        <div
          id="user-menu-dropdown"
          role="menu"
          className="absolute right-0 top-11 z-50 min-w-56 rounded-lg border border-border-primary bg-background p-2 shadow-lg"
        >
          <div className="mb-2 border-b border-border-primary px-2 pb-2">
            <p className="text-sm font-semibold">{userInfo?.username}</p>
            <p className="text-xs text-muted-foreground">{userInfo?.email}</p>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-600/10"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
