export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center px-6 py-4 border-t border-border">
      <div className="flex items-center gap-2 text-xs text-muted-foreground tracking-wider">
        <span>STOCKFILS &copy; {currentYear}</span>
        <span className="text-primary">&bull;</span>
        <span>GESTIÓN TECNOLÓGICA</span>
      </div>
    </footer>
  );
};
