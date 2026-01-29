# 🐱 DevCats

A modern, lightweight desktop development tool for database and cache management. Built with Tauri + React + TypeScript.

## ✨ Features

### 🎯 Current (MVP)
- **MySQL Support**: Connection testing and query execution
- **Redis Support**: Coming soon
- **Dark Theme**: Eye-friendly interface for long coding sessions
- **Query History**: Track and reuse your queries
- **Connection Management**: Multiple connections with status indicators

### 🚀 Planned
- PostgreSQL support
- Message queue management (RabbitMQ, Kafka)
- SQL syntax highlighting
- Data export (JSON, CSV)
- SSH tunnel support
- Query optimization suggestions

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **State**: Zustand
- **Styling**: Tailwind CSS
- **Build**: Vite

### Backend
- **Runtime**: Tauri 2
- **Language**: Rust
- **Database**: mysql2, ioredis

### Design
- Modern dark theme inspired by VS Code
- Responsive and accessible UI
- Keyboard shortcuts support

## 📦 Installation

### Prerequisites
- Node.js 18+
- Rust 1.70+
- (Linux) libwebkit2gtk-4.1-dev, libappindicator3-dev, librsvg2-dev

### Build from Source

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/devcats.git
cd devcats

# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

## 🚀 Usage

### Quick Start

1. **Launch DevCats**
   ```bash
   npm run tauri dev
   ```

2. **Add a Connection**
   - Click the "+" button in the sidebar
   - Fill in connection details
   - Click "Test Connection"

3. **Run Queries**
   - Select a connection from the sidebar
   - Enter your SQL query in the editor
   - Press `Ctrl+Enter` or click "Run"

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Run query |
| `Ctrl+Shift+K` | Clear editor |
| `Ctrl+N` | New connection |
| `Ctrl+W` | Close tab |
| `Ctrl+F` | Search |

## 📁 Project Structure

```
devcats/
├── src/                    # React frontend
│   ├── components/         # UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Sidebar.tsx
│   │   └── Workspace.tsx
│   ├── store/             # State management
│   │   └── appStore.ts
│   ├── types/             # TypeScript types
│   │   ├── connection.ts
│   │   └── tauri.d.ts
│   ├── App.tsx            # Main app
│   └── App.css            # Styles
├── src-tauri/            # Rust backend
│   ├── src/
│   │   ├── commands/      # Tauri commands
│   │   │   └── mysql.rs
│   │   ├── lib.rs        # Command registration
│   │   └── main.rs
│   ├── Cargo.toml        # Rust dependencies
│   └── tauri.conf.json   # Tauri config
└── package.json          # Node.js dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) - Cross-platform desktop framework
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

Made with 🦞 for developers, by developers
