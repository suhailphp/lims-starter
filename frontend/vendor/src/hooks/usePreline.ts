import { useEffect } from 'react';
import HSStaticMethods from 'preline';

export const usePreline = (dependencies: any[] = []) => {
  useEffect(() => {
    // Re-initialize Preline after component renders
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        console.log('Preline: Initializing...');
        HSStaticMethods.autoInit();
        console.log('Preline: Initialization complete');
      }, 100);
    }
  }, dependencies);
};
