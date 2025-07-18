// src/hooks/usePageTitle.js
import { useEffect } from 'react';

const usePageTitle = (pageTitle) => {
  useEffect(() => {
    if (pageTitle) {
      document.title = `Crypto Sentinel | ${pageTitle}`;
    } else {
      document.title = 'Crypto Sentinel';
    }
  }, [pageTitle]);
};

export default usePageTitle;
