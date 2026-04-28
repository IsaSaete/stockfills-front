import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ImageOff, Pencil, Trash2, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import usePrintingHistory from "../../features/historyPrint/hooks/usePrintingHistory";
import {
  historyStatusBadgeStyles,
  historyStatusLabels,
} from "../../features/historyPrint/constants/status";
import { getHistoryMaterialLabel } from "../../features/historyPrint/constants/material";
import { getOptimizedCloudinaryImageUrl } from "../../utils/images";
import { capitalizeInitial } from "../../utils/strings";

const HistoryDetailPage: React.FC = () => {
  const { id: historyId } = useParams();
  const navigate = useNavigate();
  const { getPrintingHistoryById } = usePrintingHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [entry, setEntry] = useState<Awaited<
    ReturnType<typeof getPrintingHistoryById>
  > | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (!historyId) {
      setError("No se ha encontrado este registro de impresión.");
      setIsLoading(false);

      return;
    }

    const loadDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const printingHistory = await getPrintingHistoryById(historyId);
        setEntry(printingHistory);
      } catch {
        setEntry(null);
        setError("No se ha encontrado este registro de impresión.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadDetail();
  }, [getPrintingHistoryById, historyId]);

  useEffect(() => {
    if (!isImageModalOpen) return;

    const handleCloseWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsImageModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleCloseWithEscape);

    return () => {
      window.removeEventListener("keydown", handleCloseWithEscape);
    };
  }, [isImageModalOpen]);

  const handleBack = () => {
    navigate("/historial");
  };

  const handleEdit = () => {
    if (!entry) return;

    navigate(`/historial/${entry.id}/editar`);
  };

  const detailImageUrl = useMemo(() => {
    if (!entry?.imageUrl) return undefined;

    return getOptimizedCloudinaryImageUrl(entry.imageUrl, "detail");
  }, [entry?.imageUrl]);
  const fullImageUrl = entry?.imageUrl;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 w-36 rounded bg-card-background" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4 rounded-xl border border-border-primary bg-section-background p-5">
            <div className="h-8 w-2/3 rounded bg-card-background" />
            <div className="h-6 w-1/3 rounded bg-card-background" />
            <div className="h-24 rounded bg-card-background" />
            <div className="h-24 rounded bg-card-background" />
          </div>
          <div className="space-y-4 rounded-xl border border-border-primary bg-section-background p-4">
            <div className="aspect-square rounded-lg bg-card-background" />
            <div className="h-10 rounded bg-card-background" />
            <div className="h-10 rounded bg-card-background" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
        <div className="rounded-xl border border-border-primary bg-section-background p-5">
          <p className="font-semibold">{error ?? "Registro no encontrado."}</p>
        </div>
      </div>
    );
  }

  const pieceName = entry.pieceName?.trim() || "Sin nombre";
  const notes = entry.notes?.trim() || "Sin notas";
  const materialLabel = getHistoryMaterialLabel(
    entry.filament.material,
    entry.filament.customMaterial,
  );
  const filamentBrand = capitalizeInitial(entry.filament.brand);
  const priceDisplay =
    entry.costPerPiece === undefined || entry.costPerPiece <= 0
      ? "Precio no disponible"
      : `${entry.costPerPiece.toFixed(2)} €`;
  const detailDate = new Date(entry.createdAt).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
              Editar
            </button>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-600 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch">
          <article className="rounded-xl border border-border-primary bg-section-background p-5 lg:h-full">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {pieceName}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {detailDate}
                </p>
              </div>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${historyStatusBadgeStyles[entry.status]}`}
              >
                {historyStatusLabels[entry.status]}
              </span>
            </div>

            <div className="mt-4">
              {detailImageUrl ? (
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(true)}
                  className="w-full overflow-hidden rounded-lg border border-border-primary"
                >
                  <img
                    src={detailImageUrl}
                    alt={pieceName}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-border-primary bg-card-background text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <ImageOff className="h-8 w-8 opacity-70" />
                    <p className="text-sm font-medium">Sin imagen</p>
                  </div>
                </div>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                {detailImageUrl
                  ? "Haz click sobre la imagen para ampliarla."
                  : "Aún no hay imagen adjuntada para este registro."}
              </p>
            </div>
          </article>

          <article className="rounded-xl border border-border-primary bg-section-background p-5 lg:h-full">
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight">
                Filamento utilizado
              </h2>
              <div className="mt-4 rounded-lg border border-border-primary bg-card-background p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
                  <div className="relative mx-auto sm:mx-0">
                    <span
                      className="block h-20 w-20 rounded-full border-2 border-foreground/50 sm:h-24 sm:w-24"
                      style={{ backgroundColor: entry.filament.colorHex }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-header">
                        Marca
                      </p>
                      <p className="mt-1 text-lg font-bold leading-none sm:text-2xl">
                        {filamentBrand}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-header">
                        Material
                      </p>
                      <p className="mt-1 text-lg font-bold leading-none uppercase sm:text-2xl">
                        {materialLabel}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-header">
                        Color
                      </p>
                      <p className="mt-1 font-mono text-base font-bold uppercase leading-none sm:text-lg">
                        {entry.filament.colorHex}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-header">
                        Diámetro
                      </p>
                      <p className="mt-1 text-lg font-bold leading-none sm:text-2xl">
                        {entry.filament.diameter} mm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border-primary bg-card-background p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-header">
                    Consumo
                  </p>
                  <p className="mt-1 text-xl font-semibold">
                    {entry.gramsConsumed} g
                  </p>
                </div>
                <div className="rounded-lg border border-border-primary bg-card-background p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-header">
                    Coste estimado
                  </p>
                  <p className="mt-1 text-xl font-semibold">{priceDisplay}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight">Notas</h2>
                <p className="mt-3 min-h-32 rounded-lg border border-border-primary bg-card-background p-4 text-sm leading-relaxed">
                  {notes}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="mt-6 flex w-full items-center justify-between gap-2 md:hidden">
        <button
          type="button"
          onClick={handleEdit}
          className="inline-flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
        >
          <Pencil className="h-4 w-4" />
          Editar
        </button>
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 rounded-lg border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-600 disabled:cursor-not-allowed"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </button>
      </div>

      {isImageModalOpen && fullImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative max-h-[90vh] w-full max-w-5xl rounded-lg border border-border-primary bg-card-background p-3"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsImageModalOpen(false)}
              className="ml-auto mb-2 inline-flex items-center justify-center rounded-lg border border-border-primary p-2 hover:border-primary hover:text-primary"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar imagen</span>
            </button>
            <img
              src={fullImageUrl}
              alt={pieceName}
              className="max-h-[78vh] w-full rounded object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryDetailPage;
