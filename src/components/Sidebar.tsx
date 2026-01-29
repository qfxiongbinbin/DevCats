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
    <div className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Connections</h2>
          <Button size="sm" className="w-8 h-8 p-0">+</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {connections.map((conn) => (
          <ConnectionItem
            key={conn.id}
            connection={conn}
            isActive={activeConnectionId === conn.id}
            onClick={() => setActiveConnection(conn.id)}
          />
        ))}
      </div>

      <div className="border-t border-gray-800">
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">History</h3>
          <div className="space-y-1">
            <div className="text-xs text-gray-500 px-2 py-1.5 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              SELECT * FROM users
            </div>
            <div className="text-xs text-gray-500 px-2 py-1.5 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              Redis: GET user:123
            </div>
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
        'w-full px-4 py-3 flex items-center gap-3 text-left transition-colors',
        isActive ? 'bg-gray-800 border-l-2 border-blue-500' : 'hover:bg-gray-800/50 border-l-2 border-transparent'
      )}
    >
      <div
        className={cn(
          'w-2.5 h-2.5 rounded-full',
          connection.connected ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'
        )}
      />
      <span className="text-lg">{ConnectionIcon(connection.type)}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-100 truncate">{connection.name}</div>
        <div className="text-xs text-gray-500">{connection.host}:{connection.port}</div>
      </div>
    </button>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
