import { Notebook } from "lucide-react";

interface NotesInfoProps {
  notes?: string;
}

const NotesInfo: React.FC<NotesInfoProps> = ({ notes }) => {
  return (
    <section className="bg-section-background p-6 border border-border-primary rounded-xl h-full justify-between flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Notebook />
        <h3 className="text-lg font-bold font-mono uppercase tracking-widest">
          Notas
        </h3>
      </div>
      <div className="flex flex-col rounded-xl border-2 border-border-primary overflow-hidden">
        <div className="px-6 py-3">
          {notes && <p>{notes}</p>}
          {!notes && (
            <p>
              Este filamento aún no tiene notas. Puedes añadirlas desde el botón
              editar.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NotesInfo;
