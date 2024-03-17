// FacebookPixel.tsx
type PixelEvent = {
    name: string;
    options?: object;
  };
  
  declare global {
    interface Window {
      fbq: (...args: any[]) => void;
    }
  }
  
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  
  export const initFacebookPixel = () => {
    if (!FB_PIXEL_ID) return;
    window.fbq('init', FB_PIXEL_ID);
  };
  
  export const trackEvent = (event: PixelEvent) => {
    if (!FB_PIXEL_ID) return;
    window.fbq('track', event.name, event.options);
  };
  