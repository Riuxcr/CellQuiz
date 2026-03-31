/** CellStart destinations + A/B tracking (shared by Quiz and Result). */
export const PRODUCT_URL =
  'https://cellstart.com/products/nad?selling_plan=3903586561&variant=46896557195521'

export const CHECKOUT_URL =
  'https://cellstart.com/checkouts/cn/hWNAU8GfyILoKlWisS38oZvN/en-us?_r=AQABeic2poYKAyDjN9NVkfsIjkT9LngcU-PtbsT3yIKv_GA&auto_redirect=false&edge_redirect=true&preview_theme_id=156406677761&skip_shop_pay=true'

export const buildRedirectUrl = (baseUrl, flow) => {
  const url = new URL(baseUrl)
  url.searchParams.set('utm_source', 'cellquiz')
  url.searchParams.set('utm_medium', 'quiz_ab')
  url.searchParams.set('utm_campaign', 'protocol_flow')
  url.searchParams.set('utm_content', flow)
  return url.toString()
}

/** Open in a new tab when allowed; same-tab fallback if pop-ups are blocked. */
export const openCellStartUrl = (url) => {
  const tab = window.open(url, '_blank', 'noopener,noreferrer')
  if (tab == null) {
    window.location.assign(url)
  }
}

export const RESULT_STATE_STORAGE_KEY = 'cellquiz_result_v1'
