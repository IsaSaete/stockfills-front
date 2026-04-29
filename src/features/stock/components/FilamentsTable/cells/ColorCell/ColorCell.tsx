interface ColorCellProps {
  colorHex: string;
}
const ColorCell: React.FC<ColorCellProps> = ({ colorHex }) => {
  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center">
        <div
          className="h-8 w-8 rounded-full border border-foreground"
          style={{ backgroundColor: colorHex }}
          title={colorHex}
        />
      </div>
    </td>
  );
};

export default ColorCell;
