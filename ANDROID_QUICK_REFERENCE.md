# GlowCycle Android - Quick Reference

## 🎯 Quick Commands

### Development
```bash
# Build web app
npm run build

# Sync with Android
npm run android:sync

# Build + Sync (combined)
npm run android:build

# Open in Android Studio
npm run android:open

# Run on device
npm run android:run
```

### First Time Setup (Already Done ✅)
```bash
npm install @capacitor/core @capacitor/cli
npx cap init "GlowCycle" "com.glowcycle.app" --web-dir=dist
npm install @capacitor/android
npm run build
npx cap add android
```

## 📱 Running the App

### In Android Studio
1. Open project: `npm run android:open`
2. Wait for Gradle sync
3. Select device/emulator
4. Click Run (▶️) button

### From Command Line
```bash
npm run android:build
npm run android:run
```

## 🔧 Common Tasks

### Update App After Code Changes
```bash
npm run build && npm run android:sync
```

### Clear and Rebuild
```bash
# In Android Studio
Build → Clean Project
Build → Rebuild Project
```

### View Logs
```bash
# In Android Studio
View → Tool Windows → Logcat
```

## 📂 Important Files

| File | Purpose |
|------|---------|
| `capacitor.config.ts` | Capacitor configuration |
| `android/app/build.gradle` | Android build config |
| `android/app/src/main/AndroidManifest.xml` | App permissions & settings |
| `android/app/src/main/res/` | App icons & resources |

## 🎨 Customization

### Change App Name
Edit `android/app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">GlowCycle</string>
```

### Change App Icon
Replace files in:
- `android/app/src/main/res/mipmap-*/ic_launcher.png`
- `android/app/src/main/res/mipmap-*/ic_launcher_round.png`

Use [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/) to generate icons.

### Change Package Name
Edit `capacitor.config.ts`:
```typescript
appId: 'com.glowcycle.app'  // Change this
```
Then run: `npm run android:sync`

## 🐛 Quick Fixes

### Gradle Sync Failed
```
File → Invalidate Caches → Invalidate and Restart
```

### White Screen
```bash
npm run build
npm run android:sync
# Then reinstall app
```

### Device Not Found
1. Enable USB Debugging on phone
2. Accept USB debugging prompt
3. Try: `adb devices` in terminal

### Build Errors
```bash
cd android
./gradlew clean
cd ..
npm run android:build
```

## 📦 Build APK

### Debug APK
```
Build → Build Bundle(s) / APK(s) → Build APK(s)
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK
1. Generate keystore (one time)
2. Configure signing
3. Build → Generate Signed Bundle / APK

See `ANDROID_BUILD_GUIDE.md` for detailed instructions.

## 🌐 App Info

- **App Name**: GlowCycle
- **Package ID**: com.glowcycle.app
- **Platform**: Android (Capacitor)
- **Framework**: React + TypeScript + Vite

## 📞 Need Help?

1. Check `ANDROID_BUILD_GUIDE.md` for detailed instructions
2. View Logcat in Android Studio for errors
3. Check [Capacitor Docs](https://capacitorjs.com/docs)
4. Check [Android Developer Docs](https://developer.android.com)

---

**Status**: ✅ Ready to build and run!
