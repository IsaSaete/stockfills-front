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
    <nav className="hidden md:flex items-center gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            `relative flex items-center gap-2 rounded-lg px-4 py-2 text-xl font-medium transition-colors ${
              isActive
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
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
