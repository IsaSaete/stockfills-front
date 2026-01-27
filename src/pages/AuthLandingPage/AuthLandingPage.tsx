import { AuthPanel } from "../../features/auth/components/AuthPanel/AuthPanel";
import AppIntro from "../../features/marketing/components/AppIntro";

const AuthLandingPage: React.FC = () => {
  return (
    <>
      <AppIntro />
      <AuthPanel />
    </>
  );
};

export default AuthLandingPage;
