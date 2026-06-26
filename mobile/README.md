# Closet Shopper — Expo Go shell

A thin native shell that loads the Closet Shopper web app (TanStack Start) in a
WebView so you can test the real build on a physical iPhone using **Expo Go**.

## Run

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with the Camera app (iOS) and open it in **Expo Go**.

## Point it at a different build

By default the shell loads the production URL
(`https://closet-shopper-app.stelios.poke.site`). To test a local dev server,
pass your machine's LAN IP (not `localhost`, which the phone can't reach):

```bash
EXPO_PUBLIC_WEB_URL=http://192.168.1.20:3000 npx expo start
```

Config lives in `app.json` (static) + `app.config.ts` (dynamic, injects
`extra.webUrl`).
