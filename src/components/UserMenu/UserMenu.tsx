import { LogOut } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router";

const UserMenu: React.FC = () => {
  const { userInfo, logoutUser } = useAuth();
  const navigate = useNavigate();

  const initials = userInfo?.username
    ? userInfo?.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {initials}
      </div>
      <button
        onClick={handleLogout}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label="Cerrar sesión"
      >
        <LogOut className="h-8 w-8" />
      </button>
    </div>
  );
};

export default UserMenu;
