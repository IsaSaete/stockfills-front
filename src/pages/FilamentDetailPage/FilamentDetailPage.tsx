import { useParams } from "react-router";
import FilamentDetail from "../../features/stock/components/FilamentDetail/FilamentDetail";

import { useEffect } from "react";
import useStock from "../../features/stock/hooks/useStock/useStock";

const FilamentDetailPage: React.FC = () => {
  const { id: filamentId } = useParams();
  const { isLoading, currentFilament, getFilamentById } = useStock();

  useEffect(() => {
    window.scroll({ top: 0, behavior: "instant" });

    getFilamentById(filamentId!);
  }, [filamentId, getFilamentById]);

  if (isLoading) return <div>Cargando...</div>;
  if (!currentFilament) return <div>No encontrado</div>;

  return <FilamentDetail filament={currentFilament} />;
};

export default FilamentDetailPage;
