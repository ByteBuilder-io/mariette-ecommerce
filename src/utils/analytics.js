// utils/analytics.js

import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-V9BQT8PSER');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category, action, label) => {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  };