import { NavLink } from "react-router";
import Navigation from "../Navigation/Navigation";
import { useAuth } from "../../features/auth/hooks/useAuth";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import UserMenu from "../UserMenu/UserMenu";

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="flex items-center px-10 py-4 bg-muted gap-3 justify-between">
      <NavLink
        to="/"
        className="text-2xl font-bold tracking-wide text-foreground hover:opacity-80 transition-opacity"
      >
        STOCKFILS
      </NavLink>
      <div className="flex-1 flex gap-8">
        {isAuthenticated && (
          <>
            <ThemeSwitcher />
            <Navigation />
          </>
        )}
      </div>
      <div className="flex items-center">
        {isAuthenticated ? <UserMenu /> : <ThemeSwitcher />}
      </div>
    </header>
  );
};
