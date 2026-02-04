const ConsumeCell: React.FC = () => {
  return (
    <td className="px-4 py-4">
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="rounded-lg border border-primary bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-transparent hover:text-foreground"
        >
          Consumir
        </button>
      </div>
    </td>
  );
};

export default ConsumeCell;
