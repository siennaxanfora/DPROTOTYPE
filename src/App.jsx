import React, { useMemo, useState } from 'react'
import { ARCHETYPES, SAMPLE_SPIELS } from './data'

export default function App() {
  const [query, setQuery] = useState('')
  const [archetype, setArchetype] = useState('all')
  const spiels = SAMPLE_SPIELS

  const filteredSpiels = useMemo(() => {
    const q = query.toLowerCase()
    return spiels.filter(s => {
      const matchesArch = archetype === 'all' || s.archetype === archetype
      const matchesQ = !q || s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q)
      return matchesArch && matchesQ
    })
  }, [spiels, archetype, query])

  return (
    <div style={{ fontFamily: 'Inter, system-ui, Arial', padding: 20 }}>
      <h1>Agent Playbook Prototype</h1>
      <div style={{ marginBottom: 12 }}>
        <input placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} />
        <select value={archetype} onChange={e => setArchetype(e.target.value)} style={{ marginLeft: 8 }}>
          <option value="all">All</option>
          {ARCHETYPES.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12 }}>
        {filteredSpiels.map(s => (
          <div key={s.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ marginRight: 8 }}>{s.title}</strong>
              <small style={{ background: '#f3f4f6', padding: '4px 8px', borderRadius: 6 }}>{s.archetype}</small>
            </div>
            <p style={{ marginTop: 8, marginBottom: 6, fontSize: 13, color: '#374151' }}><em>Opener</em></p>
            <div style={{ background: '#f9fafb', padding: 8, borderRadius: 6 }}>{s.openers[0]}</div>
            <p style={{ marginTop: 8, marginBottom: 6, fontSize: 13, color: '#374151' }}><em>Body</em></p>
            <div style={{ background: '#f9fafb', padding: 8, borderRadius: 6, whiteSpace: 'pre-wrap' }}>{s.body}</div>
            <p style={{ marginTop: 8, marginBottom: 6, fontSize: 13, color: '#374151' }}><em>Closer</em></p>
            <div style={{ background: '#f9fafb', padding: 8, borderRadius: 6 }}>{s.closers[0]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
