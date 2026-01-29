// Tauri 类型定义
declare global {
  interface Window {
    __TAURI_INVOKE__: <T>(cmd: string, args?: any) => Promise<T>;
  }
}

export {};
