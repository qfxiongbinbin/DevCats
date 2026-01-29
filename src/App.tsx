import { Sidebar } from './components/Sidebar';
import { Workspace } from './components/Workspace';
import './App.css';

function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-950">
      {/* Topbar */}
      <div className="h-12 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-100">
          <span className="text-xl">🦞</span>
          <span className="font-semibold">DevCats</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-100 transition-colors text-lg">🔍</button>
          <button className="text-gray-400 hover:text-gray-100 transition-colors text-lg">⚙️</button>
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
