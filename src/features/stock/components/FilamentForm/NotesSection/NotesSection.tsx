import { NotebookPen } from "lucide-react";
import { useState } from "react";

const NotesSection: React.FC = () => {
  const [notes, setNotes] = useState("");

  const handleNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const notes = event.target.value;

    setNotes(notes);
  };

  return (
    <section className="bg-section-background border border-border-primary rounded-xl overflow-hidden shadow-sm">
      <div className="border-b border-border-primary bg-card-background px-6 py-4 flex items-center gap-3">
        <NotebookPen className="text-primary" />
        <h3 className="text-lg font-bold font-mono">Notas Adicionales</h3>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-2">
          <label
            className="font-bold uppercase tracking-wider text-header font-mono"
            htmlFor="notes"
          >
            Notas
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={handleNotes}
            className="form-input w-full bg-card-background border border-border-primary rounded p-4 text-base focus:border-primary custom-scrollbar resize-none"
            rows={6}
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default NotesSection;
