import { capitalizeInitial } from "../../../../utils/strings";
import { stockColorMap } from "../../../stock/constanst/stockColors";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  value: number;
  variant?: "default" | "danger";
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  value,
  variant,
}) => {
  const plural = value === 1 ? "" : "s";

  const cardVariantStyles: Record<string, string> = {
    default: "bg-card-background border-border-primary",
    danger: stockColorMap.red.card,
  };

  return (
    <div
      className={`flex flex-col gap-1 rounded-2xl py-2 px-4 border ${cardVariantStyles[variant ?? "default"]}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold font-mono uppercase tracking-widest">
          {title}
        </h3>
        <div
          className={`p-2 rounded-lg border-2 ${cardVariantStyles[variant ?? "default"]}`}
        >
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-5xl font-bold">{value}</p>
        <span className="text-lg font-bold">
          {description && `${capitalizeInitial(description)}${plural}`}
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
