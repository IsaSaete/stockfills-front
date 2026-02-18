import FilamentDetail from "../../features/stock/components/FilamentDetail/FilamentDetail";
import type { FilamentDto } from "../../features/stock/types/types";

interface FilamentDetailPageProps {
  filament?: FilamentDto;
}

const FilamentDetailPage: React.FC<FilamentDetailPageProps> = ({
  filament,
}) => {
  return <FilamentDetail filament={filament!} />;
};

export default FilamentDetailPage;
