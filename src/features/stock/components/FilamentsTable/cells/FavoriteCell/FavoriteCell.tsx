import { Star } from "lucide-react";

interface FavoriteCellProps {
  isFavorite: boolean;
  action: () => void;
}

const FavoriteCell: React.FC<FavoriteCellProps> = ({ isFavorite, action }) => {
  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center">
        <button
          onClick={action}
          type="button"
          className="flex items-center justify-center w-full cursor-pointer"
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              isFavorite
                ? "fill-amber-400 stroke-1 stroke-foreground dark:stroke-none"
                : "text-muted-foreground "
            }`}
          />
        </button>
      </div>
    </td>
  );
};

export default FavoriteCell;
