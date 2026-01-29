import { Sidebar } from './components/Sidebar';
import { Workspace } from './components/Workspace';
import './App.css';

function App() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      {/* Topbar */}
      <div className="h-14 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur flex items-center justify-between px-5">
        <div className="flex items-center gap-3 text-slate-100">
          <span className="text-xl">🦞</span>
          <span className="font-semibold tracking-wide">DevCats</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Workspace</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-slate-100 transition-colors text-lg">🔍</button>
          <button className="text-slate-400 hover:text-slate-100 transition-colors text-lg">⚙️</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Workspace />
      </div>
    </div>
  );
}

export default App;
