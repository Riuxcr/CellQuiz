import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function MetaPixelPageView() {
  const location = useLocation()
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
    }
  }, [location.pathname, location.search])

  return null
}
