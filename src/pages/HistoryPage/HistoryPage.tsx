import { useEffect } from "react";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import { HistoryTable } from "../../features/historyPrint/components/HistoryTable/HistoryTable";
import usePrintingHistory from "../../features/historyPrint/hooks/usePrintingHistory";
import DashboardCard from "../../features/dashboard/components/summary/DashboardCard";
import { Euro, Printer, Scale } from "lucide-react";

const HistoryPage: React.FC = () => {
  const {
    error,
    isLoading,
    printingHistory,
    pagination,
    loadPrintingHistoryByPage,
  } = usePrintingHistory();

  useEffect(() => {
    loadPrintingHistoryByPage();
  }, [loadPrintingHistoryByPage]);

  const fetchPage = (page: number) => {
    loadPrintingHistoryByPage({ page, limit: pagination.limit });
  };

  const handleGoToPreviousPage = () => {
    if (!pagination.hasPreviousPage || isLoading) return;

    fetchPage(pagination.page - 1);
  };

  const handleGoToNextPage = () => {
    if (!pagination.hasNextPage || isLoading) return;

    fetchPage(pagination.page + 1);
  };

  const totalEstimatedCost = printingHistory.reduce(
    (acc, curr) => acc + (curr.costPerPiece ?? 0),
    0,
  );

  const totalConsumed = printingHistory.reduce(
    (acc, curr) => acc + curr.gramsConsumed,
    0,
  );

  return (
    <>
      <HeaderPages
        title="Historial de impresiones"
        subtitle="Gestión y seguimiento detallado de piezas impresas"
      />

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <DashboardCard
          title="Total consumido"
          icon={<Scale />}
          value={totalConsumed}
          description="gramo"
        />
        <DashboardCard
          title="Gasto estimado"
          icon={<Euro />}
          value={`${totalEstimatedCost.toFixed(2)} €`}
        />
        <DashboardCard
          title="Piezas totales"
          icon={<Printer />}
          value={printingHistory.length}
        />
      </div>

      <HistoryTable entries={printingHistory} isLoading={isLoading} />
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleGoToPreviousPage}
          disabled={!pagination.hasPreviousPage || isLoading}
          className="rounded-lg border border-border-primary bg-card-background px-5 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="min-w-[8rem] text-center font-mono text-base font-semibold tabular-nums">
          Página {pagination.page}
          {pagination.totalPages > 0 ? ` / ${pagination.totalPages}` : ""}
        </span>
        <button
          type="button"
          onClick={handleGoToNextPage}
          disabled={!pagination.hasNextPage || isLoading}
          className="rounded-lg border border-border-primary bg-card-background px-5 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default HistoryPage;
