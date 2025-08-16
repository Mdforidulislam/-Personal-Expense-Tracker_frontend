/* eslint-disable @typescript-eslint/no-explicit-any */
// components/FacebookPixel.tsx
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

type Fbq = {
  (...args: any[]): void;
  callMethod?: (...args: any[]) => void;
  queue?: any[];
  push?: (...args: any[]) => void;
  loaded?: boolean;
  version?: string;
};



export default function FacebookPixel() {
  useEffect(() => {
    // Inject the Facebook Pixel script only once
    if (!window.fbq) {
      const fbq: Fbq = function (...args: any[]) {
        if (fbq.callMethod) {
          fbq.callMethod(...args);
        } else {
          (fbq.queue = fbq.queue || []).push(args);
        }
      };
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      window.fbq = fbq;
      window._fbq = fbq;

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    }

    if (window.fbq) window.fbq('init', '720061294011638');
    if (window.fbq) window.fbq('track', 'PageView');
  }, []);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=720061294011638&ev=PageView&noscript=1"
      />
    </noscript>
  );
}
