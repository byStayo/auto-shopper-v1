import type { ConfigContext, ExpoConfig } from 'expo/config'

/**
 * Dynamic Expo config for iOS Expo Go testing.
 *
 * The native shell (App.tsx) loads the Closet Shopper web app in a WebView so
 * the team can test the live TanStack Start build on a real iPhone via Expo Go.
 * Override the target URL without editing code:
 *
 *   EXPO_PUBLIC_WEB_URL=http://192.168.1.20:3000 npx expo start
 */
const DEFAULT_WEB_URL = 'https://closet-shopper-app.stelios.poke.site'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? 'Closet Shopper',
  slug: config.slug ?? 'closet-shopper-app',
  plugins: [...(config.plugins ?? []), 'expo-asset'],
  extra: {
    ...config.extra,
    webUrl: process.env.EXPO_PUBLIC_WEB_URL ?? DEFAULT_WEB_URL,
  },
})
