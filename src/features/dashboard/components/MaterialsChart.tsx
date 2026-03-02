import { useMemo } from "react";
import useStock from "../../stock/hooks/useStock/useStock";
import type { FilamentMaterial } from "../../stock/types/types";
import { materialColorMap } from "../../stock/domain/filament.prensentation";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface MaterialChartEntry {
  materialName: string;
  filamentCount: number;
  filamentColor: string;
}

const MaterialsChart: React.FC = () => {
  const { filaments } = useStock();

  const materialChartData: MaterialChartEntry[] = useMemo(() => {
    const filamentCountByMaterial = filaments.reduce(
      (accumulator, currentFilament) => {
        const material = currentFilament.material;

        accumulator[material] = (accumulator[material] || 0) + 1;

        return accumulator;
      },
      {} as Record<FilamentMaterial, number>,
    );

    return Object.entries(filamentCountByMaterial).map(([material, count]) => ({
      materialName: material,
      filamentCount: count,
      filamentColor: materialColorMap[material as FilamentMaterial],
    }));
  }, [filaments]);

  return (
    <div className="flex flex-col justify-between gap-6 sm:flex-row">
      <div
        role="img"
        aria-hidden="true"
        className="w-full h-60 sm:w-60 sm:shrink-0"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={materialChartData}
              dataKey="filamentCount"
              nameKey="materialName"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={1}
              aria-hidden="true"
            >
              {materialChartData.map((entry) => (
                <Cell key={entry.materialName} fill={entry.filamentColor} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${name}, ${value} bobinas `]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul
        aria-label="Leyenda de materiales"
        className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-2"
      >
        {materialChartData.map((entry) => (
          <li
            key={entry.materialName}
            className="flex items-center gap-2 font-semibold"
          >
            <span
              aria-hidden="true"
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: entry.filamentColor }}
            />
            <span>{`${entry.materialName} (${entry.filamentCount})`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialsChart;
