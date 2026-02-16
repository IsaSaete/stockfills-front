interface LowStockFilterProps {
  isActive: boolean;
  onToggle: () => void;
}

const LowStockFilter: React.FC<LowStockFilterProps> = ({
  onToggle,
  isActive,
}) => {
  return (
    <div className="lg:col-span-2 relative">
      <button
        onClick={onToggle}
        className={`flex items-center justify-center w-full h-14 appearance-none border rounded-lg font-mono text-base cursor-pointer
         ${isActive ? "bg-primary text-white border-primary" : "bg-card-background border-border-primary hover:bg-card-background/50"}
         focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
      >
        Stock bajo
      </button>
    </div>
  );
};

export default LowStockFilter;
