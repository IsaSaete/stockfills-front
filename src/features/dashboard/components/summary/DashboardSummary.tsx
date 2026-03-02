import { useEffect } from "react";
import useStock from "../../../stock/hooks/useStock/useStock";
import DashboardCard from "./DashboardCard";
import { FileCheckCorner, Layers, Scale, TriangleAlert } from "lucide-react";
import MaterialsChart from "./MaterialsChart";
import DashboardCardChart from "./DashboardCardChart";

const DashboardSummary: React.FC = () => {
  const { loadStock, filaments } = useStock();

  useEffect(() => {
    loadStock();
  }, [loadStock]);

  const totalFilaments = filaments.length;
  const getlowfilaments = filaments.filter(
    (filamentslow) => filamentslow.currentWeightGrams < 300,
  );

  const filamentWeights = filaments.map(
    (filament) => filament.currentWeightGrams,
  );

  const totalWeight = filamentWeights.reduce(
    (weightTotal, weigthActual) => weightTotal + weigthActual,
    0,
  );

  const changeGrToKg = (weightGrams: number): number => {
    return weightGrams / 1000;
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <DashboardCard
            value={totalFilaments}
            description="bobina"
            title="Total de bobinas"
            icon={<FileCheckCorner />}
          />
          <DashboardCard
            value={getlowfilaments.length}
            description="bobina"
            title="Stock bajo"
            icon={<TriangleAlert className="text-red-600" />}
            variant="danger"
          />
          <DashboardCard
            value={changeGrToKg(totalWeight)}
            description="kg"
            title="Stock en peso"
            icon={<Scale />}
          />
        </div>
        <DashboardCardChart
          title="Resumen de filamentos por material"
          icon={<Layers />}
        >
          <MaterialsChart />
        </DashboardCardChart>
      </div>
    </>
  );
};

export default DashboardSummary;
