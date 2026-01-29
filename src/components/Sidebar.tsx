import { useAppStore } from '../store/appStore';
import { Button } from './Button';
import { Connection } from '../types/connection';

const ConnectionIcon = (type: string) => {
  switch (type) {
    case 'mysql':
      return '🐬';
    case 'redis':
      return '🔴';
    case 'postgresql':
      return '🐘';
    default:
      return '📦';
  }
};

export function Sidebar() {
  const { connections, activeConnectionId, setActiveConnection } = useAppStore();

  return (
    <div className="w-80 bg-slate-950/70 border-r border-slate-800/80 flex flex-col p-4 gap-4">
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-sm">
        <div className="px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Connections</h2>
            <p className="text-xs text-slate-500">Select a source to run queries.</p>
          </div>
          <Button size="sm" className="w-8 h-8 p-0 rounded-full">+</Button>
        </div>
        <div className="p-2 space-y-2 max-h-[45vh] overflow-y-auto">
          {connections.map((conn) => (
            <ConnectionItem
              key={conn.id}
              connection={conn}
              isActive={activeConnectionId === conn.id}
              onClick={() => setActiveConnection(conn.id)}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-sm">
        <div className="px-4 py-3 border-b border-slate-800/80">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">History</h3>
          <p className="text-xs text-slate-500">Recent queries and commands.</p>
        </div>
        <div className="p-3 space-y-2">
          <div className="text-xs text-slate-400 px-3 py-2 rounded-lg bg-slate-950/60 hover:bg-slate-800/60 cursor-pointer transition-colors">
            SELECT * FROM users
          </div>
          <div className="text-xs text-slate-400 px-3 py-2 rounded-lg bg-slate-950/60 hover:bg-slate-800/60 cursor-pointer transition-colors">
            Redis: GET user:123
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectionItem({ connection, isActive, onClick }: { connection: Connection; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full px-3 py-3 flex items-center gap-3 text-left rounded-xl border transition-all',
        isActive
          ? 'bg-gradient-to-r from-blue-500/15 via-slate-900/80 to-slate-900/60 border-blue-500/40 shadow-lg shadow-blue-500/10'
          : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/70'
      )}
    >
      <div
        className={cn(
          'w-2.5 h-2.5 rounded-full',
          connection.connected ? 'bg-emerald-400 shadow-lg shadow-emerald-400/40' : 'bg-slate-600'
        )}
      />
      <span className="text-lg">{ConnectionIcon(connection.type)}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-100 truncate">{connection.name}</div>
        <div className="text-xs text-slate-500">{connection.host}:{connection.port}</div>
      </div>
    </button>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
