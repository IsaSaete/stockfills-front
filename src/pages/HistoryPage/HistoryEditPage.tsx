import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, FileImage, LoaderCircle, Upload, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import usePrintingHistory from "../../features/historyPrint/hooks/usePrintingHistory";
import {
  historyStatusButtonStyles,
  historyStatusLabels,
} from "../../features/historyPrint/constants/status";
import type { PrintingHistoryStatus } from "../../features/historyPrint/types";
import { getOptimizedCloudinaryImageUrl } from "../../utils/images";

const HistoryEditPage: React.FC = () => {
  const formLabelClassName = "text-header font-semibold";
  const { id: historyId } = useParams();
  const navigate = useNavigate();
  const {
    printingHistory,
    isLoading,
    loadPrintingHistoryByPage,
    updatePrintingHistoryById,
    uploadPrintingImage,
  } = usePrintingHistory();
  const entry = useMemo(
    () => printingHistory.find((historyEntry) => historyEntry.id === historyId),
    [historyId, printingHistory],
  );

  const [pieceNameDraft, setPieceNameDraft] = useState<string | undefined>();
  const [statusDraft, setStatusDraft] = useState<
    PrintingHistoryStatus | undefined
  >();
  const [notesDraft, setNotesDraft] = useState<string | undefined>();
  const [imageUrlDraft, setImageUrlDraft] = useState<string | undefined>();
  const [imagePublicIdDraft, setImagePublicIdDraft] = useState<
    string | undefined
  >();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (printingHistory.length === 0) {
      loadPrintingHistoryByPage();
    }
  }, [loadPrintingHistoryByPage, printingHistory.length]);

  const handleBack = () => {
    navigate("/historial");
  };

  const pieceName = pieceNameDraft ?? entry?.pieceName ?? "";
  const status = statusDraft ?? entry?.status ?? "PENDING";
  const notes = notesDraft ?? entry?.notes ?? "";
  const imageUrl = imageUrlDraft ?? entry?.imageUrl ?? "";
  const imagePublicId = imagePublicIdDraft ?? entry?.imagePublicId ?? "";
  const optimizedThumbnailImageUrl = imageUrl
    ? getOptimizedCloudinaryImageUrl(imageUrl, "thumb")
    : "";
  const selectedStatusStyles: Record<PrintingHistoryStatus, string> = {
    PENDING: "bg-primary/20 ring-1 ring-primary/60",
    COMPLETED: "bg-emerald-500/20 ring-1 ring-emerald-400/60",
    FAILED: "bg-red-500/20 ring-1 ring-red-500/60",
  };

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];

    if (!imageFile) return;

    const maxFileSizeInBytes = 5 * 1024 * 1024;
    const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(
      imageFile.type,
    );

    if (!isValidType) {
      setSubmitError("Solo puedes subir imágenes JPG, PNG o WEBP.");
      event.target.value = "";

      return;
    }

    if (imageFile.size > maxFileSizeInBytes) {
      setSubmitError("La imagen no puede superar 5MB.");
      event.target.value = "";

      return;
    }

    setSubmitError(null);
    setSelectedImage(imageFile);
    setImageUrlDraft(URL.createObjectURL(imageFile));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrlDraft("");
    setImagePublicIdDraft("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!entry || !historyId) {
      setSubmitError("No se ha encontrado el registro a editar.");

      return;
    }

    setSubmitError(null);

    try {
      let uploadedImageUrl = imageUrl;
      let uploadedImagePublicId = imagePublicId;

      if (selectedImage) {
        setIsUploadingImage(true);
        const uploadedImage = await uploadPrintingImage(selectedImage);
        uploadedImageUrl = uploadedImage.imageUrl;
        uploadedImagePublicId = uploadedImage.imagePublicId;
        setIsUploadingImage(false);
      }

      await updatePrintingHistoryById(historyId, {
        pieceName,
        status,
        notes,
        imageUrl: uploadedImageUrl,
        imagePublicId: uploadedImagePublicId,
      });

      navigate("/historial");
    } catch {
      setIsUploadingImage(false);
      setSubmitError(
        "No se pudo actualizar el registro. Revisa los datos e inténtalo de nuevo.",
      );
    }
  };

  if (isLoading && !entry) {
    return <p>Cargando registro...</p>;
  }

  if (!entry) {
    return (
      <div className="space-y-4">
        <HeaderPages
          title="Editar impresión"
          subtitle="No se ha encontrado este registro en el historial actual"
        />
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 font-semibold hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al historial
        </button>
      </div>
    );
  }

  const materialLabel =
    entry.filament.material === "OTHER"
      ? entry.filament.customMaterial || "OTRO"
      : entry.filament.material;
  const costDisplay =
    entry.costPerPiece !== undefined
      ? `${entry.costPerPiece.toFixed(2)} €`
      : "-";

  return (
    <>
      <HeaderPages
        title="Editar registro de impresión"
        subtitle="Completa y ajusta la información del registro de impresión"
        action={
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-primary px-4 py-2 font-semibold hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
        }
      />

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-6xl flex-col gap-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr] md:items-stretch">
          <section className="flex h-full flex-col rounded-xl border border-border-primary bg-section-background">
            <div className="border-b border-border-primary bg-card-background px-5 py-4 rounded-t-xl">
              <h3 className="text-lg font-bold font-mono uppercase tracking-wider">
                Datos editables
              </h3>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="pieceName" className={formLabelClassName}>
                  Nombre de la pieza
                </label>
                <input
                  id="pieceName"
                  value={pieceName}
                  onChange={(event) => setPieceNameDraft(event.target.value)}
                  className="form-input w-full rounded border border-border-primary bg-card-background px-4 py-3 focus:border-primary"
                  placeholder="Ej: Engranaje Extrusor V2"
                />
              </div>

              <fieldset className="flex flex-col gap-2">
                <legend
                  id="status-legend"
                  className={`${formLabelClassName} mb-1`}
                >
                  Estado
                </legend>
                <div
                  className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                  role="radiogroup"
                  aria-labelledby="status-legend"
                >
                  {(["PENDING", "COMPLETED", "FAILED"] as const).map(
                    (statusOption) => (
                      <button
                        key={statusOption}
                        type="button"
                        role="radio"
                        aria-checked={status === statusOption}
                        onClick={() => setStatusDraft(statusOption)}
                        className={`rounded-lg border px-4 py-2 text-inherit text-sm font-semibold transition-colors ${
                          status === statusOption
                            ? `${historyStatusButtonStyles[statusOption]} ${selectedStatusStyles[statusOption]}`
                            : "border-border-primary hover:border-primary"
                        }`}
                      >
                        {historyStatusLabels[statusOption]}
                      </button>
                    ),
                  )}
                </div>
              </fieldset>

              <div className="flex flex-col gap-2">
                <label htmlFor="notes" className={formLabelClassName}>
                  Notas
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(event) => setNotesDraft(event.target.value)}
                  className="form-input min-h-32 w-full resize-none rounded border border-border-primary bg-card-background px-4 py-3 focus:border-primary md:min-h-40"
                  placeholder="Detalles de configuración, observaciones o incidencias..."
                />
              </div>
            </div>
          </section>

          <section className="flex h-full flex-col gap-4">
            <div className="rounded-xl border border-border-primary bg-section-background p-4">
              <p className={`${formLabelClassName} mb-2`}>Foto de pieza</p>
              <div className="rounded-lg border border-dashed border-border-primary  p-3">
                <div className="flex items-center gap-3 px-1 py-1">
                  {optimizedThumbnailImageUrl ? (
                    <img
                      src={optimizedThumbnailImageUrl}
                      alt={pieceName || "Miniatura de la pieza"}
                      className="h-16 w-16 rounded-lg border border-border-primary object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border-primary bg-card-background text-muted-foreground">
                      <FileImage className="h-6 w-6 opacity-70" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 text-sm ">
                    {selectedImage ? (
                      <>
                        <p className="truncate font-semibold text-foreground">
                          {selectedImage.name}
                        </p>
                        <p className="text-xs text-primary">
                          Nueva imagen pendiente de guardar
                        </p>
                      </>
                    ) : imageUrl ? (
                      <>
                        <p className="font-semibold text-foreground">
                          Imagen adjuntada
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Se mostrara en grande en la pagina de detalle
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-foreground">
                          Sin imagen adjuntada
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Sube una imagen para esta impresion
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Formatos permitidos: JPG, PNG o WEBP. Maximo 5MB. La imagen se
                mostrara ampliada en la pagina de detalle.
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="inline-flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm font-semibold transition-colors hover:border-red-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                      Quitar foto
                    </button>
                  )}
                  <label
                    htmlFor="printing-history-camera"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary md:hidden"
                  >
                    <Upload className="h-4 w-4" />
                    Hacer foto
                  </label>
                </div>
                <label
                  htmlFor="printing-history-image"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  <Upload className="h-4 w-4" />
                  Subir foto
                </label>
              </div>
              <input
                id="printing-history-camera"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleSelectImage}
              />
              <input
                id="printing-history-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleSelectImage}
              />
            </div>
            <div className="rounded-xl border border-border-primary bg-section-background text-sm">
              <h3 className="rounded-t-xl border-b border-border-primary bg-card-background px-5 py-3 text-lg font-bold font-mono uppercase tracking-wider">
                Datos de solo lectura
              </h3>
              <div className="space-y-2 p-4 ">
                <p>
                  <span className="text-header font-semibold">Filamento:</span>{" "}
                  {entry.filament.brand}
                </p>
                <p>
                  <span className="text-header font-semibold">Material:</span>{" "}
                  {materialLabel}
                </p>
                <p>
                  <span className="text-header font-semibold">Consumo:</span>{" "}
                  {entry.gramsConsumed} g
                </p>
                <p>
                  <span className="text-header font-semibold">
                    Coste pieza:
                  </span>{" "}
                  {costDisplay}
                </p>
                <p>
                  <span className="text-header font-semibold">Fecha:</span>{" "}
                  {new Date(entry.createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </section>
        </div>

        {submitError && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {submitError}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div className="hidden md:block" />
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="w-full rounded-lg border border-border-primary px-5 py-2.5 font-semibold hover:border-primary hover:text-primary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || isUploadingImage}
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUploadingImage && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isUploadingImage ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default HistoryEditPage;
