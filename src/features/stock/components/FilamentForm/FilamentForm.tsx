import SpecificationsSection from "./SpecificationsSection/SpecificationsSection";
import GeneralInfoSection from "./GeneralInfoSection/GeneralInfoSection";
import NotesSection from "./NotesSection/NotesSection";

const FilamentForm: React.FC = () => {
  return (
    <div>
      <form className="space-y-8">
        <GeneralInfoSection />
        <SpecificationsSection />
        <NotesSection />
        <div className="flex items-center justify-between gap-4 pb-12">
          <button
            className="w-50 h-12 bg-foreground rounded font-bold text-background cursor-pointer"
            type="button"
          >
            Cancelar
          </button>
          <button
            className="w-50 h-12 bg-primary hover:bg-primary/50 text-white rounded font-bold transition-all shadow-lg shadow-primary/20 cursor-pointer"
            type="submit"
          >
            Añadir
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilamentForm;
