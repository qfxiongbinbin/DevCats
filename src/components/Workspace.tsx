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
    <div className="flex-1 flex flex-col bg-slate-950/60 p-4 gap-4">
      {/* Toolbar */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 px-4 py-3 flex flex-wrap items-center gap-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
          Workspace
        </div>
        <div className="flex-1" />
        <Button onClick={handleRun} disabled={loading} variant="primary" className="gap-2">
          {loading ? 'Running...' : '▶ Run'}
          <span className="opacity-60 text-xs">Ctrl+Enter</span>
        </Button>
        <Button onClick={() => setQuery('')} variant="secondary" className="gap-2">
          🗑️ Clear
          <span className="opacity-60 text-xs">Ctrl+Shift+K</span>
        </Button>
      </div>

      {/* Query Editor & Results */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        <div className="flex flex-col rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-900/70 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
            <span>Query Editor</span>
            <span className="text-[11px] normal-case tracking-normal text-slate-400">
              {activeConnection ? `${activeConnection.name} · ${activeConnection.type}` : 'No connection'}
            </span>
          </div>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-100 p-4 font-mono text-sm resize-none focus:outline-none placeholder:text-slate-600"
            placeholder="Enter your SQL query..."
            spellCheck={false}
          />
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-sm flex flex-col overflow-hidden">
          {results ? (
            <>
              <div className="bg-slate-900/70 border-b border-slate-800/80 px-4 py-3 flex flex-wrap gap-3 justify-between items-center">
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="text-emerald-400">✓ Query successful</span>
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
                  <thead className="sticky top-0 bg-slate-900/90 backdrop-blur">
                    <tr>
                      {results.columns.map((col: string, i: number) => (
                        <th
                          key={i}
                          className="px-4 py-3 text-left text-[11px] font-semibold text-slate-300 uppercase tracking-wider"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {results.rows.map((row: string[], i: number) => (
                      <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                        {row.map((cell: string, j: number) => (
                          <td key={j} className="px-4 py-3 text-slate-300">
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
            <div className="flex-1 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <div>Run a query to see results</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logs */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 px-4 py-3 h-32 overflow-auto shadow-sm">
        <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-[0.2em]">Logs</div>
        <div className="space-y-1">
          <div className="text-xs text-slate-500">
            <span className="text-slate-400">{new Date().toLocaleTimeString()}</span>{' '}
            <span className="text-emerald-400">✓ Connected to MySQL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
