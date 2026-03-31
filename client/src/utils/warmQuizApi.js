import { API_BASE_URL } from '../config.js'

/** Fire-and-forget ping so Render/Mongo wake before the user submits (reduces perceived cold-start delay). */
export function warmQuizApi() {
  if (typeof fetch !== 'function') return
  const url = `${API_BASE_URL}/api/test`
  fetch(url, { method: 'GET', mode: 'cors', cache: 'no-store' }).catch(() => {})
}
