import { create } from 'zustand';
import { Connection, QueryHistory } from '../types/connection';

interface AppState {
  connections: Connection[];
  activeConnectionId: string | null;
  queryHistory: QueryHistory[];

  // Actions
  addConnection: (connection: Omit<Connection, 'id' | 'createdAt' | 'connected'>) => void;
  updateConnection: (id: string, connection: Partial<Connection>) => void;
  deleteConnection: (id: string) => void;
  setActiveConnection: (id: string | null) => void;
  toggleConnection: (id: string) => void;
  addQueryHistory: (history: Omit<QueryHistory, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  connections: [
    {
      id: '1',
      name: 'MySQL - localhost',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'test',
      connected: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Redis - localhost',
      type: 'redis',
      host: 'localhost',
      port: 6379,
      connected: true,
      createdAt: new Date().toISOString(),
    },
  ],
  activeConnectionId: '1',
  queryHistory: [
    {
      id: '1',
      connectionId: '1',
      query: 'SELECT * FROM users',
      timestamp: new Date().toISOString(),
    },
  ],

  addConnection: (connection) =>
    set((state) => ({
      connections: [
        ...state.connections,
        {
          ...connection,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          connected: false,
        },
      ],
    })),

  updateConnection: (id, connection) =>
    set((state) => ({
      connections: state.connections.map((c) =>
        c.id === id ? { ...c, ...connection } : c
      ),
    })),

  deleteConnection: (id) =>
    set((state) => ({
      connections: state.connections.filter((c) => c.id !== id),
      activeConnectionId: state.activeConnectionId === id ? null : state.activeConnectionId,
    })),

  setActiveConnection: (id) => set({ activeConnectionId: id }),

  toggleConnection: (id) =>
    set((state) => ({
      connections: state.connections.map((c) =>
        c.id === id ? { ...c, connected: !c.connected } : c
      ),
    })),

  addQueryHistory: (history) =>
    set((state) => ({
      queryHistory: [
        {
          ...history,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        },
        ...state.queryHistory.slice(0, 99), // Keep last 100
      ],
    })),

  clearHistory: () => set({ queryHistory: [] }),
}));
