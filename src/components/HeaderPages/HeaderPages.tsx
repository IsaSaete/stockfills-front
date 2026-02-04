import { Button } from "../shared/Button/Button";

interface HeaderPagesProps {
  title: string;
  subtitle?: string;
  buttonLabel?: string;
}

const HeaderPages: React.FC<HeaderPagesProps> = ({
  title,
  buttonLabel,
  subtitle,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{title}s</h2>
        <span className="text-base font-light">{subtitle}</span>
      </div>
      <Button className="gap-3 transition-all shadow-2xs shadow-primary/30 hover:bg-primary/50 hover:cursor-pointer">
        <span className="text-xl">+</span>
        <span>{buttonLabel}</span>
      </Button>
    </div>
  );
};

export default HeaderPages;
