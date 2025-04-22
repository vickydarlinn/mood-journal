import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="container mx-auto py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
