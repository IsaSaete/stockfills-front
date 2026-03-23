import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background h-screen">
      <Header />
      <main className="m-0 flex-1 px-6 py-8 md:px-8 lg:p-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
