import { Palette } from "lucide-react";

interface ColorInfoProps {
  color: string;
}

const ColorInfo: React.FC<ColorInfoProps> = ({ color }) => {
  return (
    <section className="bg-section-background p-6 border border-border-primary rounded-xl h-full flex justify-between flex-col gap-3">
      <div className="flex items-center gap-2">
        <Palette />
        <h3 className="text-lg font-bold font-mono uppercase tracking-widest">
          Previsualización Color
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        <div
          style={{ background: color }}
          className="w-full h-10 rounded-xl border-2 border-border-primary "
        ></div>
        <div className="flex justify-between items-center text-sm p-3 rounded-lg border-2 border-border-primary">
          <span className="uppercase font-bold">Código de color HEX</span>
          <span className="text-header font-bold">{color}</span>
        </div>
      </div>
    </section>
  );
};

export default ColorInfo;
