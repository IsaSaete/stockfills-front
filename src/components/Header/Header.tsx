import { NavLink } from "react-router";
import Navigation from "../Navigation/Navigation";
import { useAuth } from "../../features/auth/hooks/useAuth";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import UserMenu from "../UserMenu/UserMenu";
import MobileMenu from "../MobileMenu/MobileMenu";

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-panel/95 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-panel/85 md:px-10">
      <NavLink
        to="/"
        className="text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:text-2xl"
      >
        STOCKFILS
      </NavLink>
      <div className="flex flex-1 gap-8">
        {isAuthenticated && (
          <>
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
            <Navigation />
          </>
        )}
      </div>
      <div className="flex items-center">
        {isAuthenticated ? (
          <>
            <div className="hidden md:flex">
              <UserMenu />
            </div>
            <MobileMenu />
          </>
        ) : (
          <ThemeSwitcher />
        )}
      </div>
    </header>
  );
};
