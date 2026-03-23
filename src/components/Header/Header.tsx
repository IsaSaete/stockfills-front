import { NavLink } from "react-router";
import Navigation from "../Navigation/Navigation";
import { useAuth } from "../../features/auth/hooks/useAuth";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import UserMenu from "../UserMenu/UserMenu";
import MobileMenu from "../MobileMenu/MobileMenu";

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="flex items-center justify-between gap-3 bg-muted px-6 py-4 md:px-10">
      <NavLink
        to="/"
        className="text-2xl font-bold tracking-wide text-foreground hover:opacity-80 transition-opacity"
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
