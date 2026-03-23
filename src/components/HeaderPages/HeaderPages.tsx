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
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold font-mono tracking-wide">{title}</h2>
        <span className="text-base font-light">{subtitle}</span>
      </div>
      {action && <div className="w-full md:w-auto">{action}</div>}
    </div>
  );
};

export default HeaderPages;
