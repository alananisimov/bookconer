import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "expo",
  slug: "expo",
  scheme: "expo",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/book.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/book.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFF",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "your.bundle.identifier",
    supportsTablet: true,
  },
  android: {
    package: "your.bundle.identifier",
    adaptiveIcon: {
      foregroundImage: "./assets/book.png",
      backgroundColor: "#FFFFF",
    },
  },
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router"],
});
