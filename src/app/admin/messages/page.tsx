'use client';

import { useState, useEffect } from 'react';
import { getContactMessages, toggleContactMessageRead, deleteContactMessage } from '@/lib/actions';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await getContactMessages();
    setMessages(data);
    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    try {
      const utcStr = dateStr.endsWith('Z') ? dateStr : dateStr + 'Z';
      return new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
        timeZone: 'Europe/Istanbul'
      }).format(new Date(utcStr));
    } catch { return dateStr; }
  };

  const handleToggleRead = async (id: number) => {
    await toggleContactMessageRead(id);
    await loadData();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
      await deleteContactMessage(id);
      await loadData();
    }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1>
            📬 Gelen Mesajlar
            {unreadCount > 0 && (
              <span style={{
                marginLeft: '0.75rem',
                padding: '0.2rem 0.6rem',
                background: 'rgba(239,68,68,0.15)',
                color: '#ef4444',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}>
                {unreadCount} yeni
              </span>
            )}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            "Ücretsiz Fiyat Teklifi" formundan gelen tüm mesajlar burada listelenir.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={loadData} disabled={loading}>
          {loading ? 'Yenileniyor...' : '🔄 Yenile'}
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.5)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Henüz mesaj yok.</p>
          <p style={{ fontSize: '0.875rem' }}>Ziyaretçiler iletişim formunu doldurduğunda mesajlar burada görünecek.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg: any) => (
            <div
              key={msg.id}
              className="glass-panel"
              style={{
                padding: '1.25rem 1.5rem',
                border: msg.is_read ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(59,130,246,0.25)',
                cursor: 'pointer',
                opacity: msg.is_read ? 0.7 : 1,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Header Row */}
              <div
                onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                  {!msg.is_read && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: '0.2rem' }}>
                      {msg.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {msg.subject} {msg.budget ? `· ${msg.budget}` : ''}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                    {formatDate(msg.created_at)}
                  </span>
                  <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.3)', transform: expanded === msg.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                </div>
              </div>

              {/* Expanded Content */}
              {expanded === msg.id && (
                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📧 E-posta</span>
                      <p style={{ fontSize: '0.9rem', marginTop: '0.2rem' }}>
                        <a href={`mailto:${msg.email}`} style={{ color: 'var(--brand)', textDecoration: 'none' }}>{msg.email}</a>
                      </p>
                    </div>
                    {msg.phone && (
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📱 Telefon</span>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.2rem' }}>{msg.phone}</p>
                      </div>
                    )}
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📋 Konu</span>
                      <p style={{ fontSize: '0.9rem', marginTop: '0.2rem' }}>{msg.subject}</p>
                    </div>
                    {msg.budget && (
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>💰 Bütçe</span>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.2rem' }}>{msg.budget}</p>
                      </div>
                    )}
                  </div>

                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    padding: '1rem',
                    borderLeft: '3px solid var(--brand)',
                    marginBottom: '1rem',
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>💬 Mesaj</span>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginTop: '0.4rem', whiteSpace: 'pre-wrap', color: 'rgba(255,255,255,0.85)' }}>
                      {msg.message}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleToggleRead(msg.id)}
                      className="btn btn-secondary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                    >
                      {msg.is_read ? '📩 Okunmadı Yap' : '✅ Okundu Yap'}
                    </button>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="btn btn-secondary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', textDecoration: 'none' }}
                    >
                      ✉️ Cevapla
                    </a>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="btn btn-danger btn-secondary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                    >
                      🗑️ Sil
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
