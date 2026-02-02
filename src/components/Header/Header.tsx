import Navigation from "../Navigation/Navigation";
import { NavLink } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth";
import Theme from "../Theme/Theme";
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
            <Theme />
            <Navigation />
          </>
        )}
      </div>
      <div className="flex items-center">
        {isAuthenticated ? <UserMenu /> : <Theme />}
      </div>
    </header>
  );
};
