import { useAuth } from "../../features/auth/hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { userInfo } = useAuth();

  return (
    <div className="flex">
      <span className="hidden text-2xl font-bold text-foreground md:block">
        ¡ Hola de nuevo {userInfo?.username || ""} !
      </span>
    </div>
  );
};

export default DashboardPage;
