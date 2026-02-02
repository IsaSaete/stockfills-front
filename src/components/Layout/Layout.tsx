import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = () => {
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
