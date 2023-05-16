export {};

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage(msg: string): void;
    };
    isWebViewAccess: boolean;
    notificationPagePath: string;
    DeviceHeight: number;
    platform: 'ios' | 'android';
    platformVersion: string;
  }
}
