import type { ReactNode } from "react";

interface HeaderPagesProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

const HeaderPages: React.FC<HeaderPagesProps> = ({
  title,
  subtitle,
  action,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold font-mono tracking-wide">{title}</h2>
        <span className="text-base font-light">{subtitle}</span>
      </div>
      {action}
    </div>
  );
};

export default HeaderPages;
