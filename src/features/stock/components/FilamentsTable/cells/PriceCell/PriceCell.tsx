interface PriceCellProps {
  price: number;
}

const PriceCell: React.FC<PriceCellProps> = ({ price }) => {
  const formatPrice = (price?: number): string => {
    if (price === undefined || price === 0) return "-";

    return `${price.toFixed(2)} €`;
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
