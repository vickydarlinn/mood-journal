import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { navItems } from "../config";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Left sidebar for big screens */}
      <aside className="hidden bg-gray-800 text-white sm:flex sm:w-28 sm:flex-col lg:w-64">
        <div className="p-4 text-lg font-bold">My App</div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 px-4 py-2 hover:bg-gray-700 lg:justify-start ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              {<item.icon />}
              <span className="hidden lg:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        <div>date and time will come here</div>
        <main className="flex-1 overflow-auto p-4 pb-16 sm:pb-4">
          <Outlet />
        </main>

        {/* Bottom nav for small screens */}
        <nav className="fixed bottom-0 left-0 flex w-full border-t bg-white sm:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center py-2 text-center hover:bg-gray-100 ${
                  isActive ? "bg-gray-200 font-semibold" : ""
                }`
              }
            >
              <div className="text-center">{<item.icon />}</div>
              <div className="mt-1 text-xs">{item.label}</div>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MainLayout;
