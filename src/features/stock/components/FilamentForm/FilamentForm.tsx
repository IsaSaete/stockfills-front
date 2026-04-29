import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import SpecificationsSection from "./SpecificationsSection/SpecificationsSection";
import GeneralInfoSection from "./GeneralInfoSection/GeneralInfoSection";
import NotesSection from "./NotesSection/NotesSection";
import useFilamentForm from "../../hooks/useFilamentForm";
import useStock from "../../hooks/useStock/useStock";
import { mapFilamentFormToFilamentSend } from "../../helpers/mapFilamentFormToFilamentSend";

const FilamentForm: React.FC = () => {
  const {
    changeFilamentData,
    formFilamentData,
    setFormField,
    validateForm,
    formErrors,
  } = useFilamentForm();
  const { addNewFilament, isCreating } = useStock();
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string | null>(null);

  const handleColorButtonClick = (colorHex: string) => {
    setFormField("colorHex", colorHex);
  };

  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setApiError(null);

    const isFormValid = validateForm();

    if (!isFormValid) return;

    try {
      const filamentToSend = mapFilamentFormToFilamentSend(formFilamentData);

      await addNewFilament(filamentToSend);

      navigate("/stock");
    } catch (error) {
      if (error instanceof Error) {
        setApiError("Error al crear el filamento. Inténtelo de nuevo");
      }
    }
  };

  return (
    <div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {apiError && (
          <div
            role="alert"
            className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm font-bold text-destructive"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{apiError}</span>
            </div>
          </div>
        )}
        <GeneralInfoSection
          errors={formErrors}
          formValues={formFilamentData}
          onChange={changeFilamentData}
        />
        <SpecificationsSection
          errors={formErrors}
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
            className="h-12 w-50 rounded-lg border border-border bg-card px-4 text-base font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          <button
            className="h-12 w-50 rounded-lg bg-primary px-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-70"
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
