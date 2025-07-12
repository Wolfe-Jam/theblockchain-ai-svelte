// Safe navigation utilities to prevent open redirect vulnerabilities

const ALLOWED_DOMAINS = [
  'https://theblockchain.ai',
  'https://www.theblockchain.ai'
];

const ALLOWED_PATHS = [
  '/',
  '/marketplace',
  '/demo',
  '/help',
  '/vision',
  '/invest',
  '/report'
];

/**
 * Safely redirect to a URL, preventing open redirect attacks
 * @param url - The URL to redirect to
 * @param fallback - Fallback URL if the target is not safe (default: '/')
 */
export function safeRedirect(url: string, fallback: string = '/'): void {
  try {
    // Allow relative paths starting with /
    if (url.startsWith('/')) {
      const path = url.split('?')[0]; // Remove query params for validation
      if (ALLOWED_PATHS.some(allowedPath => path.startsWith(allowedPath))) {
        window.location.href = url;
        return;
      }
    }
    
    // Allow absolute URLs from trusted domains
    if (ALLOWED_DOMAINS.some(domain => url.startsWith(domain))) {
      window.location.href = url;
      return;
    }
    
    // If URL is not safe, redirect to fallback
    console.warn('Blocked unsafe redirect attempt:', url);
    window.location.href = fallback;
    
  } catch (error) {
    console.error('Error during safe redirect:', error);
    window.location.href = fallback;
  }
}

/**
 * Validate if a URL is safe for redirection
 * @param url - The URL to validate
 * @returns boolean indicating if the URL is safe
 */
export function isUrlSafe(url: string): boolean {
  // Allow relative paths
  if (url.startsWith('/')) {
    const path = url.split('?')[0];
    return ALLOWED_PATHS.some(allowedPath => path.startsWith(allowedPath));
  }
  
  // Allow trusted domains
  return ALLOWED_DOMAINS.some(domain => url.startsWith(domain));
}

/**
 * Get a safe URL, returning fallback if unsafe
 * @param url - The URL to validate
 * @param fallback - Fallback URL if unsafe (default: '/')
 * @returns A safe URL
 */
export function getSafeUrl(url: string, fallback: string = '/'): string {
  return isUrlSafe(url) ? url : fallback;
}
