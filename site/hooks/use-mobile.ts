import * as React from 'react';

const MOBILE_QUERY = '(max-width: 767px)';
const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
const getServerSnapshot = () => false;
function subscribe(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
