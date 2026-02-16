interface FavoriteFilterProps {
  isActive: boolean;
  onToggle: () => void;
}

const FavoriteFilter: React.FC<FavoriteFilterProps> = ({ onToggle }) => {
  return (
    <div className="lg:col-span-2 relative">
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-full h-14 appearance-none bg-card-background border border-border-primary rounded-lg font-mono text-foreground text-base hover:bg-card-background/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
      >
        Favoritos
      </button>
    </div>
  );
};

export default FavoriteFilter;
