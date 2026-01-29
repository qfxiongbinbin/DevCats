import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { Button } from './Button';

export function Workspace() {
  const { activeConnectionId, connections } = useAppStore();
  const [query, setQuery] = useState('SELECT * FROM users\nLIMIT 100;');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const activeConnection = connections.find(c => c.id === activeConnectionId);

  const handleRun = async () => {
    if (!activeConnection) return;
    setLoading(true);

    try {
      const result = await window.__TAURI_INVOKE__('execute_mysql_query', {
        config: {
          host: activeConnection.host,
          port: activeConnection.port,
          username: activeConnection.username || '',
          password: '', // In production, this should be securely stored
          database: activeConnection.database || '',
        },
        query,
      });
      setResults(result);
    } catch (error) {
      console.error('Query failed:', error);
      alert('Query failed: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-950">
      {/* Toolbar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex gap-3">
        <Button onClick={handleRun} disabled={loading} variant="primary" className="gap-2">
          {loading ? 'Running...' : '▶ Run'}
          <span className="opacity-50 text-xs">Ctrl+Enter</span>
        </Button>
        <Button onClick={() => setQuery('')} variant="secondary" className="gap-2">
          🗑️ Clear
          <span className="opacity-50 text-xs">Ctrl+Shift+K</span>
        </Button>
      </div>

      {/* Query Editor */}
      <div className="flex-1 flex">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-gray-950 text-gray-100 p-6 font-mono text-sm resize-none focus:outline-none"
          placeholder="Enter your SQL query..."
          spellCheck={false}
        />

        {/* Results */}
        <div className="w-1/2 border-l border-gray-800 flex flex-col">
          {results ? (
            <>
              <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex justify-between items-center">
                <div className="flex gap-6 text-sm text-gray-400">
                  <span className="text-green-400">✓ Query successful</span>
                  <span>{results.rows.length} rows</span>
                  <span>{results.execution_time_ms}ms</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Export JSON</Button>
                  <Button size="sm">Export CSV</Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-900">
                    <tr>
                      {results.columns.map((col: string, i: number) => (
                        <th key={i} className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {results.rows.map((row: string[], i: number) => (
                      <tr key={i} className="hover:bg-gray-800/50 transition-colors">
                        {row.map((cell: string, j: number) => (
                          <td key={j} className="px-6 py-3 text-gray-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <div>Run a query to see results</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logs */}
      <div className="bg-gray-900 border-t border-gray-800 px-6 py-3 h-32 overflow-auto">
        <div className="text-xs font-semibold text-gray-400 mb-2">📜 Logs</div>
        <div className="space-y-1">
          <div className="text-xs text-gray-500">
            <span className="text-gray-400">{new Date().toLocaleTimeString()}</span>{' '}
            <span className="text-green-400">✓ Connected to MySQL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
