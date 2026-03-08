'use client';

import { useState } from 'react';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: 'long' }).format(date);
  } catch (e) {
    return dateStr;
  }
};

export default function ExperienceItem({ ex }: { ex: any }) {
  const [expanded, setExpanded] = useState(false);

  // If text is short, don't show read more button
  const isLongDescription = ex.details && ex.details.length > 150;
  const displayDetails = expanded || !isLongDescription ? ex.details : `${ex.details.substring(0, 150)}...`;

  return (
    <div className="experience-item" style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
      <div className="timeline-icon" style={{
        width: '42px', height: '42px',
        borderRadius: '50%',
        background: 'var(--background)',
        border: '2px solid var(--brand)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)'
      }}>
        <div style={{ width: '8px', height: '8px', background: 'var(--brand)', borderRadius: '50%' }} />
      </div>

      <div className="glass-panel" style={{ flex: 1, padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '0.1rem' }}>{ex.role}</h3>
            <div style={{ fontSize: '0.95rem', color: 'var(--brand)', fontWeight: 500 }}>{ex.company}</div>
          </div>
          <div style={{ padding: '0.3rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500 }}>
            {formatDate(ex.start_date)} &mdash; {ex.end_date ? formatDate(ex.end_date) : 'Devam Ediyor'}
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.9rem' }}>
          {displayDetails}
        </p>
        
        {isLongDescription && (
          <button 
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--brand)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '0.8rem',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            {expanded ? 'Daha Az Göster' : 'Detaylar'}
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
