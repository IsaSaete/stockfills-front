import { useState } from "react";
import { isFilamentDepleted } from "../../domain/stock.logic";
import useStock from "../../hooks/useStock/useStock";
import type { FilamentDto } from "../../types/types";
import BrandCell from "./cells/BrandCell/BrandCell";
import ActionsCell from "./cells/ActionsCell/ActionsCell";
import ColorCell from "./cells/ColorCell/ColorCell";
import ConsumeCell from "./cells/ConsumeCell/ConsumeCell";
import DateCell from "./cells/DateCell/DateCell";
import DiameterCell from "./cells/DiameterCell/DiameterCell";
import FavoriteCell from "./cells/FavoriteCell/FavoriteCell";
import MaterialCell from "./cells/MaterialCell/MaterialCell";
import PriceCell from "./cells/PriceCell/PriceCell";
import WeightCell from "./cells/WeightCell/WeightCell";
import ConsumeFilamentModal from "../ConsumeFilament/ConsumeFilamentForm/ConsumeFilamentModal";
import FilamentMobileCard from "./FilamentMobileCard";
import DeleteFilamentModal from "./DeleteFilamentModal";

interface Props {
  filaments: FilamentDto[];
}

const tableHeaders = [
  { key: "favoritos", label: "FAVORITOS" },
  { key: "color", label: "COLOR" },
  { key: "tipo", label: "TIPO" },
  { key: "marca", label: "MARCA" },
  { key: "cantidad", label: "STOCK (g)" },
  { key: "consumir", label: "CONSUMIR" },
  { key: "diametro", label: "DIÁMETRO" },
  { key: "precio", label: "PRECIO" },
  { key: "fecha", label: "FECHA" },
  { key: "acciones", label: "ACCIONES" },
];

export const FilamentsTable: React.FC<Props> = ({ filaments }) => {
  const { updateFavoriteFilament, deleteFilamentById, isDeleting } = useStock();
  const [modalState, setModalState] = useState({
    isOpen: false,
    filament: null as FilamentDto | null,
  });
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    filament: null as FilamentDto | null,
  });
  const [deleteSubmitError, setDeleteSubmitError] = useState<string | null>(
    null,
  );
  const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);

  const handleOpenModal = (filament: FilamentDto) => {
    if (isFilamentDepleted(filament.currentWeightGrams)) {
      return;
    }

    setModalState({ isOpen: true, filament });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, filament: null });
  };

  const handleOpenDeleteModal = (filament: FilamentDto) => {
    setDeleteSubmitError(null);
    setDeleteModalState({ isOpen: true, filament });
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) {
      return;
    }

    setDeleteModalState({ isOpen: false, filament: null });
    setDeleteSubmitError(null);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!deleteModalState.filament) {
      return;
    }

    try {
      await deleteFilamentById(deleteModalState.filament.id);
      handleCloseDeleteModal();
      setShowDeleteSuccessToast(true);
      setTimeout(() => {
        setShowDeleteSuccessToast(false);
      }, 2200);
    } catch {
      setDeleteSubmitError(
        "No se pudo eliminar el filamento. Intentalo de nuevo.",
      );
    }
  };

  const handleFavoriteFilament = (filamentId: string) => {
    updateFavoriteFilament(filamentId);
  };

  const isFilamentsEmpty = filaments.length === 0;

  return (
    <>
      <ConsumeFilamentModal
        filament={modalState.filament}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
      />
      <DeleteFilamentModal
        filament={deleteModalState.filament}
        isOpen={deleteModalState.isOpen}
        isDeleting={isDeleting}
        submitError={deleteSubmitError}
        onClose={handleCloseDeleteModal}
        onConfirmDelete={handleConfirmDelete}
      />
      {showDeleteSuccessToast && (
        <div className="fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-green-700 bg-green-900 px-5 py-4 text-sm font-semibold text-green-100 shadow-xl">
          Filamento eliminado correctamente.
        </div>
      )}
      <div className="md:hidden space-y-3">
        {filaments.map((filament) => (
          <FilamentMobileCard
            key={filament.id}
            filament={filament}
            onFavorite={handleFavoriteFilament}
            onConsume={handleOpenModal}
            onDelete={handleOpenDeleteModal}
            isDeleting={isDeleting}
          />
        ))}
        {isFilamentsEmpty && (
          <div className="flex items-center justify-center rounded-lg border border-border bg-card">
            <p className="py-4">No se ha registrado ninguna bobina</p>
          </div>
        )}
      </div>
      <div className="hidden md:block w-full rounded-xl overflow-hidden border border-border bg-card">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b border-border bg-panel">
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="px-5 py-3 text-center text-sm font-bold text-muted-foreground align-top leading-tight"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filaments.map((filament) => (
              <tr
                className="border-b border-border bg-transparent transition-colors hover:bg-muted"
                key={filament.id}
              >
                <FavoriteCell
                  isFavorite={filament.isFavorite}
                  action={() => handleFavoriteFilament(filament.id)}
                />
                <ColorCell colorHex={filament.colorHex} />
                <MaterialCell
                  material={filament.material}
                  customMaterial={filament.customMaterial}
                />
                <BrandCell brand={filament.brand} />
                <WeightCell
                  currentGrams={filament.currentWeightGrams}
                  initialGrams={filament.initialWeightGrams}
                />
                <ConsumeCell onConsume={handleOpenModal} filament={filament} />
                <DiameterCell diameter={filament.diameter} />
                <PriceCell price={filament.priceEurs!} />
                <DateCell date={filament.createdAt!} />
                <ActionsCell
                  filament={filament}
                  onDelete={handleOpenDeleteModal}
                  isDeleting={isDeleting}
                />
              </tr>
            ))}
          </tbody>
        </table>
        {isFilamentsEmpty && (
          <div className="flex items-center justify-center">
            <p className="pt-4 pb-4">No se ha registrado ninguna bobina</p>
          </div>
        )}
      </div>
    </>
  );
};
