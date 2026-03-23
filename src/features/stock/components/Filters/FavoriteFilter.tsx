interface FavoriteFilterProps {
  isActive: boolean;
  onToggle: () => void;
}

const FavoriteFilter: React.FC<FavoriteFilterProps> = ({
  onToggle,
  isActive,
}) => {
  return (
    <div className="col-span-1 relative lg:col-span-2">
      <button
        onClick={onToggle}
        className={`flex items-center justify-center w-full h-14 appearance-none border rounded-lg font-mono text-[17px] cursor-pointer
         ${isActive ? "bg-primary text-white border-primary" : "bg-card-background border-border-primary hover:bg-card-background/50"}
         focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
      >
        Favoritos
      </button>
    </div>
  );
};

export default FavoriteFilter;
