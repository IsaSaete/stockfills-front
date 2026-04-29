import { ArrowLeft, Pencil } from "lucide-react";
import { NavLink } from "react-router";
import type { FilamentDto } from "../../types/types";
import ColorInfo from "./ColorInfo";
import SupplyInfo from "./SupplyInfo";
import StockInfo from "./StockInfo";
import NotesInfo from "./NotesInfo";

interface FilamentDetailProps {
  filament: FilamentDto;
}

const FilamentDetail: React.FC<FilamentDetailProps> = ({ filament }) => {
  return (
    <>
      <NavLink
        className="inline-flex items-center gap-2 hover:text-primary text-sm font-bold transition-all group"
        to="/stock"
      >
        <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:scale-110" />
        <span>Volver al Inventario</span>
      </NavLink>
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 mt-5 gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="font-mono text-3xl font-black">
              Filamento: {filament.brand}
            </h2>
            <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded flex items-center">
              {filament.material}
            </span>
          </div>
          <p className="text-header text-xl font-mono">
            Bobina de {filament.initialWeightGrams} g • {filament.diameter} mm
            {filament.isFavorite && " • Marcado como favorito"}
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="bg-primary text-primary-foreground border text-base py-3 px-4 rounded-lg flex items-center gap-3 transition-all hover:bg-transparent hover:text-primary hover:border-primary hover:cursor-pointer">
            <span>Editar filamento</span>
            <Pencil />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:grid-rows-2 lg:gap-6">
        <div className="lg:col-span-2 lg:row-span-2">
          <ColorInfo color={filament.colorHex} />
        </div>
        <div className="lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-3">
          <StockInfo
            currentWeightGrams={filament.currentWeightGrams}
            initialWeightGrams={filament.initialWeightGrams}
          />
        </div>
        <div className="lg:col-span-3 lg:row-span-2 lg:col-start-3 lg:row-start-1">
          <SupplyInfo
            date={filament.createdAt}
            price={filament.priceEurs}
            purchaseUrl={filament.purchaseUrl}
            supplier={filament.supplier}
          />
        </div>
        <div className="lg:col-span-3 lg:row-span-2 lg:col-start-3 lg:row-start-3">
          <NotesInfo notes={filament.notes} />
        </div>
      </div>
    </>
  );
};

export default FilamentDetail;
