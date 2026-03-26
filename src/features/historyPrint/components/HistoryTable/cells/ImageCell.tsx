import { ImageOff } from "lucide-react";

interface ImageCellProps {
  imageUrl?: string;
  alt?: string;
  pieceName?: string;
}

const ImageCell: React.FC<ImageCellProps> = ({ imageUrl, alt, pieceName }) => {
  if (imageUrl) {
    return (
      <td className="px-4 py-3">
        <div className="flex items-center justify-center">
          <img
            src={imageUrl}
            alt={alt || `${pieceName} - Pieza impresa`}
            className="h-12 w-12 rounded-lg border border-border-primary object-cover"
          />
        </div>
      </td>
    );
  }

  return (
    <td className="px-4 py-3">
      <div className="flex items-center justify-center text-muted-foreground">
        <span className="sr-only">Sin imagen</span>
        <ImageOff className="h-8 w-8 opacity-60" aria-hidden="true" />
      </div>
    </td>
  );
};

export default ImageCell;
