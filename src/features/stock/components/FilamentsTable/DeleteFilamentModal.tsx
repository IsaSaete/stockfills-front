import { X } from "lucide-react";
import type { FilamentDto } from "../../types/types";

interface DeleteFilamentModalProps {
  filament: FilamentDto | null;
  isOpen: boolean;
  isDeleting: boolean;
  submitError: string | null;
  onClose: () => void;
  onConfirmDelete: () => Promise<void>;
}

const DeleteFilamentModal: React.FC<DeleteFilamentModalProps> = ({
  filament,
  isOpen,
  isDeleting,
  submitError,
  onClose,
  onConfirmDelete,
}) => {
  if (!isOpen || !filament) return null;

  const materialLabel =
    filament.material === "OTHER"
      ? filament.customMaterial || "OTRO"
      : filament.material;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          <div className="flex items-center justify-between border-b border-border bg-panel px-6 py-4">
            <h2 className="text-lg font-bold">Eliminar filamento</h2>
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              aria-label="Cerrar modal"
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-3 px-6 py-5">
            <p className="text-base text-foreground">
              Vas a eliminar el filamento {materialLabel} de {filament.brand}.
            </p>
            <p className="text-sm italic text-muted-foreground">
              Esta accion no se puede deshacer.
            </p>
            {submitError && (
              <p className="text-sm text-red-400" role="alert">
                {submitError}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-border bg-panel px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="rounded-lg border border-primary px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-70"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirmDelete}
              disabled={isDeleting}
              className="rounded-lg border border-red-500/70 px-3 py-2 text-sm font-semibold hover:text-red-600 transition-colors  disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteFilamentModal;
