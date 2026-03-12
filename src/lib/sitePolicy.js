export const LEGAL_AND_COOKIE_PATHS = [
  '/privacy',
  '/impressum',
  '/affiliate-disclosure',
  '/terms',
  '/cookie-policy',
  '/cookie-preferences',
];

export const isLegalOrCookiePath = (pathname = '') =>
  LEGAL_AND_COOKIE_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

export const isAdRenderingAllowed = ({ pathname = '', hasMarketingConsent = false, isAdSenseEnabled = false }) =>
  Boolean(isAdSenseEnabled && hasMarketingConsent && !isLegalOrCookiePath(pathname));
