interface BrandCellProps {
  brand: string;
}

const BrandCell: React.FC<BrandCellProps> = ({ brand }) => {
  return (
    <td className="px-4 py-4">
      <div className="flex items-center justify-center">
        <span className="text-sm font-medium text-foreground">{brand}</span>
      </div>
    </td>
  );
};

export default BrandCell;
