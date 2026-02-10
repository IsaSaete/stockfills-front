import { NotebookPen } from "lucide-react";
import type { FilamentForm } from "../../../types/types";

interface NotesSectionProps {
  formValues: FilamentForm;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  formValues,
  onChange,
}) => {
  return (
    <section className="bg-section-background border border-border-primary rounded-xl overflow-hidden shadow-sm">
      <div className="border-b border-border-primary bg-card-background px-6 py-4 flex items-center gap-3">
        <NotebookPen className="text-primary" />
        <h3 className="text-lg font-bold font-mono">Notas Adicionales</h3>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label
              className="font-bold uppercase tracking-wider text-header font-mono"
              htmlFor="notes"
            >
              Notas
            </label>
            <span className="font-mono italic text-ms text-header">
              (Opcional)
            </span>
          </div>
          <textarea
            id="notes"
            value={formValues.notes}
            onChange={onChange}
            className="form-input w-full bg-card-background border border-border-primary rounded p-4 text-base focus:border-primary custom-scrollbar resize-none"
            rows={6}
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default NotesSection;
