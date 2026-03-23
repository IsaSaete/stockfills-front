import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background h-screen">
      <Header />
      <main className="m-0 flex flex-1 justify-center gap-x-5 px-6 py-8 md:px-8 lg:p-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
