const BASE_URL = import.meta.env.DEV ? 'http://localhost:8000' : ''

export async function checkLucasLehmer(p: number) {
  const res = await fetch(`${BASE_URL}/api/lucas-lehmer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ p })
  })
  if (!res.ok) throw new Error('API request failed')
  return res.json()
}
