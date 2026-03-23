import { Info, Play } from "lucide-react";

const AppIntro: React.FC = () => {
  return (
    <div className="hidden max-w-4xl flex-1 md:flex">
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            STOCKFILS
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            No te quedes sin filamento. Gestiona tu stock fácilmente.
          </p>
        </div>
        <div>
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              Registra tus bobinas, controla el stock y recibe alertas cuando tu
              filamento esté bajo.{" "}
              <span className="font-semibold text-primary">
                TOTALMENTE GRATUITO.
              </span>
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-card">
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
                <Play className="ml-1 h-6 w-6" fill="currentColor" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIntro;
