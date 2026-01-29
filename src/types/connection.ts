export type ConnectionType = 'mysql' | 'redis' | 'postgresql';

export interface Connection {
  id: string;
  name: string;
  type: ConnectionType;
  host: string;
  port: number;
  username?: string;
  password?: string;
  database?: string;
  connected: boolean;
  createdAt: string;
}

export interface QueryHistory {
  id: string;
  connectionId: string;
  query: string;
  timestamp: string;
}
