interface BrandCellProps {
  brand: string;
}

const BrandCell: React.FC<BrandCellProps> = ({ brand }) => {
  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center">
        <span className="text-sm font-medium text-foreground">{brand}</span>
      </div>
    </td>
  );
};

export default BrandCell;
