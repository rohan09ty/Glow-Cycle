# 🌸 GlowCycle - Women's Health & Wellness App

A comprehensive mobile application for women's health tracking, period wellness, and personalized health insights.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple)
![Capacitor](https://img.shields.io/badge/Capacitor-8.0.0-blue)

## ✨ Features

- 🌸 **Period Cycle Tracking** - Track your menstrual cycle with ease
- 📊 **Health Analytics** - Visualize your health data with beautiful charts
- 💬 **AI-Powered Assistant** - Get personalized health insights and advice
- 📱 **Beautiful Interface** - Modern, intuitive design with dark mode support
- 🔒 **Privacy-Focused** - Your health data stays private and secure
- 📲 **Mobile Ready** - Native Android app via Capacitor
- 🎨 **Customizable** - Personalize your experience

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 5.4.19** - Build tool & dev server

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **shadcn/ui** - Beautiful component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Mobile
- **Capacitor 8.0.0** - Native mobile wrapper
- **Android Studio** - Android development

### State & Forms
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Routing
- **React Router DOM 6.30.1** - Client-side routing

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/glow-cycle.git

# Navigate to project directory
cd glow-cycle

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:8080 in your browser
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Android Development

GlowCycle can be built as a native Android app using Capacitor.

### Quick Start

```bash
# Build web app and sync with Android
npm run android:build

# Open in Android Studio
npm run android:open

# Run on connected device/emulator
npm run android:run
```

### Detailed Instructions

For complete Android setup instructions, see:
- **[ANDROID_BUILD_GUIDE.md](ANDROID_BUILD_GUIDE.md)** - Complete setup guide
- **[ANDROID_QUICK_REFERENCE.md](ANDROID_QUICK_REFERENCE.md)** - Quick commands
- **[COMPATIBILITY_FIXES.md](COMPATIBILITY_FIXES.md)** - Compatibility notes

### Prerequisites for Android

- **JDK 17** - Java Development Kit
- **Android Studio Ladybug** - Latest version
- **Android SDK** - Installed via Android Studio

## 📂 Project Structure

```
glow-cycle/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── BottomNav.tsx # Bottom navigation
│   │   └── NavLink.tsx   # Navigation links
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── TrackerPage.tsx
│   │   ├── InsightsPage.tsx
│   │   ├── ChatPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── AuthPage.tsx
│   │   └── OnboardingPage.tsx
│   ├── App.tsx           # Main app component
│   ├── App.css           # Global styles
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── android/              # Android project (Capacitor)
├── index.html            # HTML entry point
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
├── capacitor.config.ts   # Capacitor configuration
└── tsconfig.json         # TypeScript configuration
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run android:sync` | Sync web app with Android |
| `npm run android:open` | Open project in Android Studio |
| `npm run android:run` | Run on Android device/emulator |
| `npm run android:build` | Build web app and sync with Android |

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components including:

- Buttons, Cards, Dialogs
- Forms, Inputs, Selects
- Navigation, Tabs, Menus
- Charts, Progress bars
- Toasts, Alerts
- And many more...

All components are customizable via Tailwind CSS.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Add your environment variables here
VITE_API_URL=your_api_url
```

### Tailwind Configuration

Customize colors, fonts, and more in `tailwind.config.ts`.

### Capacitor Configuration

Modify app settings in `capacitor.config.ts`:

```typescript
{
  appId: 'com.glowcycle.app',
  appName: 'GlowCycle',
  webDir: 'dist'
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Capacitor](https://capacitorjs.com/) - Native mobile wrapper
- [Vite](https://vitejs.dev/) - Fast build tool

## 📞 Support

If you have any questions or need help, please:

- Check the [ANDROID_BUILD_GUIDE.md](ANDROID_BUILD_GUIDE.md) for Android setup
- Check the [UPLOAD_TO_GITHUB.md](UPLOAD_TO_GITHUB.md) for GitHub upload instructions
- Open an issue on GitHub

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ for women's health and wellness**
