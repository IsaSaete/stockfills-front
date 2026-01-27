import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background h-screen">
      <Header />
      <main className="flex-1 p-10 m-0 flex justify-center gap-x-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
