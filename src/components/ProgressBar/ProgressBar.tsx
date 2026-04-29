interface ProgressBarProps {
  percentage: number;
  colorClass: string;
  height?: string;
  width?: string;
  currentGrams: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  colorClass,
  height = "h-6",
  width = "w-full",
  currentGrams,
  label,
}) => {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={currentGrams}
      className={`${width} ${height} overflow-hidden rounded-full bg-section border border-foreground/30 shadow-md`}
    >
      <div
        className={`h-full rounded-full transition-all duration-300 ${colorClass}`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
};
