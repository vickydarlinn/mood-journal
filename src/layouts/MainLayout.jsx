import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="container mx-auto mb-10 py-4 sm:mb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
