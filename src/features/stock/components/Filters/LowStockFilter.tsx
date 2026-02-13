interface LowStockFilterProps {
  isActive: boolean;
  onToggle: () => void;
}

const LowStockFilter: React.FC<LowStockFilterProps> = ({ onToggle }) => {
  return (
    <div className="lg:col-span-2 relative">
      <button
        onClick={onToggle}
        className="flex items-center justify-around w-full h-14 px-4 appearance-none bg-card-background border border-border-primary 
      rounded-lg font-mono text-foreground text-base hover:bg-card-background/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
      >
        Stock bajo
      </button>
    </div>
  );
};

export default LowStockFilter;
