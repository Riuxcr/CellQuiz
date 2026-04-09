/**
 * Unified tracking utility for Meta (Facebook) and TikTok pixels.
 * This centralization ensures that events are sent to both platforms consistently.
 */

export const trackEvent = (eventName, data = {}) => {
  const metaData = { ...data };
  const tiktokData = { ...data };
  // 1. Meta (Facebook) Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, metaData);
  }

  // 2. TikTok Pixel
  if (typeof window.ttq === 'function') {
    // Map Meta event names to TikTok standard events if they differ
    // Note: Most standard events like 'ViewContent', 'AddToCart', 'CompleteRegistration' are the same.
    window.ttq.track(eventName, tiktokData);
  }
};

/**
 * Identify user to both pixels for better attribution accuracy.
 * Often called after a user submits their email.
 */
export const identifyUser = (email, name = '') => {
  if (!email) return;

  // TikTok Identification
  if (typeof window.ttq === 'function') {
    window.ttq.identify({
      email: email,
      external_id: email,
    });
  }
};
