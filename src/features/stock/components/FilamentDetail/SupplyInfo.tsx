import { ShoppingCart, Van } from "lucide-react";

interface SupplyInfoProps {
  purchaseUrl?: string;
  supplier?: string;
  price?: number;
  date?: string;
}

const SupplyInfo: React.FC<SupplyInfoProps> = ({
  purchaseUrl,
  supplier,
  price,
  date,
}) => {
  const formatDate = (date?: string): string => {
    if (date === undefined) return "-";

    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="bg-section-background p-6 border border-border-primary rounded-xl h-full flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex items-start gap-2">
          <Van />
          <h3 className="text-lg font-bold font-mono uppercase tracking-widest">
            Datos de compra
          </h3>
        </div>
        {purchaseUrl && (
          <a
            className="flex items-center gap-2 text-white rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95"
            href={purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            <span className="text-foreground">Ir a la tienda</span>
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:px-6 lg:py-3 py-4 border-b lg:border-b-0 lg:border-t-2 border-border-primary lg:border-r-2 flex justify-between lg:flex-col gap-2">
          <p className="font-bold uppercase tracking-wider text-header font-mono">
            Fabricante
          </p>
          <p className="text-base font-bold">
            {supplier ? `${supplier}` : "-"}{" "}
          </p>
        </div>
        <div className="lg:px-6 lg:py-3 py-4 border-b lg:border-b-0 lg:border-t-2 border-border-primary lg:border-r-2 flex justify-between lg:flex-col gap-2">
          <p className="font-bold uppercase tracking-wider text-header font-mono">
            Coste Bobina
          </p>
          {price && (
            <p className="text-base font-bold">{price ? `${price} €` : "-"}</p>
          )}
        </div>
        <div className="lg:px-6 lg:py-3  py-4 lg:border-t-2 border-border-primary flex justify-between lg:flex-col gap-2">
          <p className="font-bold uppercase tracking-wider text-header font-mono">
            Fecha de compra
          </p>
          <p className="text-base font-bold">{date ? formatDate(date) : "-"}</p>
        </div>
      </div>
    </section>
  );
};

export default SupplyInfo;
