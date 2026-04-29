import React from "react";
import { NavLink } from "react-router";

interface NavItem {
  label: string;
  href: string;
  hasAlert?: boolean;
}

const Navigation: React.FC = () => {
  const navItems: NavItem[] = [
    { label: "Stock", href: "/stock", hasAlert: true },
    { label: "Historial", href: "/historial" },
    { label: "Ajustes", href: "/ajustes" },
  ];

  return (
    <nav className="hidden items-center gap-2 md:flex">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            `relative flex items-center gap-2 rounded-lg px-3 py-2 text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
              isActive
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
