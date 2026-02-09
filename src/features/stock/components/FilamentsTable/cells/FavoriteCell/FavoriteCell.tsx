import { Star } from "lucide-react";

interface FavoriteCellProps {
  isFavorite: boolean;
}

const FavoriteCell: React.FC<FavoriteCellProps> = ({ isFavorite }) => {
  return (
    <td className="px-4 py-4">
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="flex items-center justify-center w-full"
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              isFavorite
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground hover:text-amber-400"
            }`}
          />
        </button>
      </div>
    </td>
  );
};

export default FavoriteCell;
