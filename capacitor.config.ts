import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.glowcycle.app',
  appName: 'GlowCycle',
  webDir: 'dist',
  server: {
    // Uncomment for live reload during development
    // url: 'http://192.168.1.X:5173',
    // cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  }
};

export default config;
