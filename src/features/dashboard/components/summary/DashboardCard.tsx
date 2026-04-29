import { capitalizeInitial } from "../../../../utils/strings";
import { stockColorMap } from "../../../stock/constanst/stockColors";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  value: number | string;
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
    default:
      "bg-card border border-border-primary/70 shadow-sm shadow-slate-900/5 dark:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.75)]",
    danger: `${stockColorMap.red.card} shadow-sm shadow-red-900/10 dark:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.75)]`,
  };

  const iconVariantStyles: Record<string, string> = {
    default: "bg-primary/10 text-primary",
    danger: "bg-red-600/15 text-red-600",
  };

  return (
    <div
      className={`flex flex-col gap-5 rounded-2xl p-6 ${cardVariantStyles[variant ?? "default"]}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-md font-bold text-muted-foreground uppercase">
          {title}
        </h3>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconVariantStyles[variant ?? "default"]}`}
        >
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-semibold text-foreground leading-none">
          {value}
        </p>
        <span className="text-md font-medium text-muted-foreground">
          {description && `${capitalizeInitial(description)}${plural}`}
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
