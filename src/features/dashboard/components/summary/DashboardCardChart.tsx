interface DashboardCardChartProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const DashboardCardChart: React.FC<DashboardCardChartProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <div className="flex justify-between flex-col gap-4 rounded-2xl p-6 border border-border-primary bg-card-background h-full">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold font-mono uppercase tracking-widest">
          {title}
        </h3>
        <div className="bg-section-background p-2 rounded-lg border-2 border-border-primary">
          {icon}
        </div>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
};

export default DashboardCardChart;
