export function trackFbq(eventName) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName)
  }
}
