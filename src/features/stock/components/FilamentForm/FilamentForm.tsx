import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import SpecificationsSection from "./SpecificationsSection/SpecificationsSection";
import GeneralInfoSection from "./GeneralInfoSection/GeneralInfoSection";
import NotesSection from "./NotesSection/NotesSection";
import useFilamentForm from "../../hooks/useFilamentForm";
import useStock from "../../hooks/useStock";
import { mapFilamentFormToFilamentSend } from "../../helpers/mapFilamentFormToFilamentSend";

const FilamentForm: React.FC = () => {
  const {
    changeFilamentData,
    formFilamentData,
    setFormField,
    setFormFilamentError,
    formFilamentError,
  } = useFilamentForm();
  const { addNewFilament, isCreating } = useStock();
  const navigate = useNavigate();

  const handleColorButtonClick = (colorHex: string) => {
    setFormField("colorHex", colorHex);
  };

  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      const filamentToSend = mapFilamentFormToFilamentSend(formFilamentData);

      await addNewFilament(filamentToSend);

      navigate("/stock");
    } catch (error) {
      if (error instanceof Error) {
        setFormFilamentError(error.message);
      }
    }
  };

  return (
    <div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {formFilamentError && (
          <div
            role="alert"
            className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm font-bold text-destructive"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{formFilamentError}</span>
            </div>
          </div>
        )}
        <GeneralInfoSection
          formValues={formFilamentData}
          onChange={changeFilamentData}
        />
        <SpecificationsSection
          formValues={formFilamentData}
          onChange={changeFilamentData}
          onColorButtonClick={handleColorButtonClick}
        />
        <NotesSection
          formValues={formFilamentData}
          onChange={changeFilamentData}
        />
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
            disabled={isCreating}
          >
            {isCreating ? "Creando..." : "Añadir"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilamentForm;
