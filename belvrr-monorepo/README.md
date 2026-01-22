# BELVRR

**Life in Weeks** - A visualization to reflect on the passage of time.

## 🌐 Live Demo

- **Web:** [cherry-76821.web.app](https://cherry-76821.web.app)
- **iOS:** Coming soon to App Store

## 📦 Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@belvrr/core` | Shared TypeScript logic | ✅ Ready |
| `@belvrr/web` | Vite + React + Tailwind | 🚧 In Progress |
| `@belvrr/mobile` | Expo + React Native | 📋 Planned |

## 🛠 Tech Stack

- **Monorepo:** Turborepo
- **Language:** TypeScript
- **Web:** Vite, React, Tailwind CSS
- **Mobile:** Expo, React Native
- **Backend:** Firebase (Auth, Firestore, Hosting)
- **CI/CD:** GitHub Actions

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- (For iOS) Apple Developer Account

### Installation

```bash
# Clone the repository
git clone https://github.com/huddlerr/cherry.git belvrr
cd belvrr

# Install dependencies
npm install

# Build core package
npm run build --workspace=@belvrr/core

# Start development
npm run dev
```

### Development Commands

```bash
# Start all packages in dev mode
npm run dev

# Build all packages
npm run build

# Type check
npm run typecheck

# Lint
npm run lint

# Clean all build artifacts
npm run clean
```

## 📁 Project Structure

```
belvrr/
├── packages/
│   ├── core/           # Shared logic & types
│   ├── web/            # Web application
│   └── mobile/         # Mobile application
├── docs/               # Documentation
├── .github/workflows/  # CI/CD
└── assets/             # App icons & images
```

## 📱 Mobile Development

### iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

## 🔐 Environment Variables

Create `.env.local` files in each package:

### packages/web/.env.local

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'feat: add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 📧 Contact

- Website: [belvrr.com](https://belvrr.com)
- Email: hello@belvrr.com

---

Built with ❤️ by [Huddler](https://github.com/huddlerr)
