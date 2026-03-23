import { Search } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className="col-span-2 relative group lg:col-span-7">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="text-foreground" />
      </div>
      <label htmlFor="searchBox" className="sr-only">
        Búsqueda
      </label>
      <input
        id="searchBox"
        value={value}
        onChange={handleChange}
        className="h-14 w-full rounded-lg border-3 border-border-dark bg-surface-dark pl-12 pr-4 text-base text-foreground focus:outline-none focus:ring-3 focus:ring-primary placeholder:text-header/50"
        placeholder="Buscar por material, marca, precio..."
        type="text"
      />
    </div>
  );
};

export default SearchBox;

// const SearchBox: React.FC = () => {
//   return (
//     <>
//       <div className="mb-8 space-y-4">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
//           <div className="lg:col-span-5 relative group">
//             <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
//               <span className="material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors">
//                 search
//               </span>
//             </div>
//             <input
//               className="w-full h-14 pl-12 pr-4 bg-surface-dark border-border-dark rounded-xl text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-slate-600 text-sm"
//               placeholder="Búsqueda por nombre o marca..."
//               type="text"
//             />
//           </div>
//           <div className="lg:col-span-2 relative">
//             <div className="absolute top-1.5 left-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
//               Tipo de Material
//             </div>
//             <select className="w-full h-14 pt-5 pb-1 px-3 bg-surface-dark border-border-dark rounded-xl text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer">
//               <option>Todos los tipos</option>
//               <option>PLA</option>
//               <option>PETG</option>
//               <option>ABS</option>
//               <option>ASA</option>
//               <option>TPU</option>
//               <option>Nylon</option>
//             </select>
//             <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
//               <span className="material-symbols-outlined text-slate-500 text-sm">
//                 expand_more
//               </span>
//             </div>
//           </div>
//           <div className="lg:col-span-2 relative">
//             <div className="absolute top-1.5 left-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
//               Estado
//             </div>
//             <select className="w-full h-14 pt-5 pb-1 px-3 bg-surface-dark border-border-dark rounded-xl text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer">
//               <option>Cualquier estado</option>
//               <option>Nuevo</option>
//               <option>En uso</option>
//               <option>Casi agotado</option>
//             </select>
//             <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
//               <span className="material-symbols-outlined text-slate-500 text-sm">
//                 expand_more
//               </span>
//             </div>
//           </div>
//           <div className="lg:col-span-3 relative">
//             <div className="absolute top-1.5 left-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
//               Ordenar por
//             </div>
//             <select className="w-full h-14 pt-5 pb-1 px-3 bg-surface-dark border-border-dark rounded-xl text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer">
//               <option>Fecha (Más reciente)</option>
//               <option>Cantidad</option>
//               <option>Precio</option>
//             </select>
//             <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
//               <span className="material-symbols-outlined text-slate-500 text-sm">
//                 sort
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-wrap items-center gap-2 py-2">
//           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-2">
//             Filtros activos:
//           </span>
//           <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-[11px] font-bold hover:bg-primary/20 transition-all">
//             PLA
//             <span className="material-symbols-outlined text-[14px]">close</span>
//           </button>
//           <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-dark border border-border-dark rounded-full text-slate-400 text-[11px] font-medium hover:text-white transition-all">
//             En uso
//             <span className="material-symbols-outlined text-[14px]">close</span>
//           </button>
//           <button className="ml-auto text-[10px] font-bold text-slate-500 hover:text-primary uppercase tracking-widest underline underline-offset-4 decoration-slate-800 transition-colors">
//             Limpiar todos
//           </button>
//         </div>
//       </div>
//       <div className="bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"></div>
//       <div className="overflow-x-auto"></div>
//     </>
//   );
// };

// export default SearchBox;
