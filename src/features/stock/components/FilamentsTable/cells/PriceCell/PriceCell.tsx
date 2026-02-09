interface PriceCellProps {
  price: number;
}

const PriceCell: React.FC<PriceCellProps> = ({ price }) => {
  const formatPrice = (price?: number): string => {
    if (price === undefined) return "-";

    return `${price.toFixed(2)} \u20AC`;
  };

  return (
    <td className="px-4 py-4">
      <div className="flex items-center justify-center">
        <span className="text-sm font-semibold text-foreground">
          {formatPrice(price)}
        </span>
      </div>
    </td>
  );
};

export default PriceCell;
