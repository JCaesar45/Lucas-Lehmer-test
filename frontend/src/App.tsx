import { useState, FormEvent } from 'react'
import './App.css'

interface Result {
  p: number
  mersenne_number: string
  is_prime: boolean
  steps: number
}

function App() {
  const [p, setP] = useState<string>('11')
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/lucas-lehmer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ p: parseInt(p, 10) })
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || 'Request failed')
      }

      const data: Result = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Lucas-Lehmer Primality Test</h1>
        <p className="subtitle">Check whether 2<sup>p</sup> − 1 is prime</p>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="p">Enter odd prime p:</label>
        <input
          id="p"
          type="number"
          min="3"
          max="5000"
          value={p}
          onChange={(e) => setP(e.target.value)}
          placeholder="e.g. 11, 13, 17, 19"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Computing...' : 'Run Test'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className={`result ${result.is_prime ? 'prime' : 'composite'}`}>
          <div className="result-header">
            <span className="badge">
              {result.is_prime ? 'Prime ✓' : 'Composite ✗'}
            </span>
          </div>
          <dl>
            <dt>p</dt>
            <dd>{result.p}</dd>
            <dt>Mersenne number 2<sup>p</sup> − 1</dt>
            <dd className="mersenne">{result.mersenne_number}</dd>
            <dt>Iterations</dt>
            <dd>{result.steps}</dd>
          </dl>
        </div>
      )}

      <footer>
        <p>
          Rule: if p is an odd prime and S(p−2) ≡ 0 (mod 2<sup>p</sup> − 1),
          then 2<sup>p</sup> − 1 is prime.
        </p>
      </footer>
    </div>
  )
}

export default App
