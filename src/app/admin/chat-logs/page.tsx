'use client';

import { useState, useEffect } from 'react';
import { getChatLogs } from '@/lib/actions';

export default function ChatLogsAdmin() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await getChatLogs();
    setLogs(data);
    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    try {
      // SQLite CURRENT_TIMESTAMP is UTC — append 'Z' so JS parses it as UTC
      const utcStr = dateStr.endsWith('Z') ? dateStr : dateStr + 'Z';
      const date = new Date(utcStr);
      // Format in Turkey timezone: "14:30 - 09.03.2026"
      return new Intl.DateTimeFormat('tr-TR', { 
        hour: '2-digit', minute: '2-digit',
        day: '2-digit', month: '2-digit', year: 'numeric',
        timeZone: 'Europe/Istanbul'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  // Group logs by session_id
  const groupedLogs = logs.reduce((acc: any, log: any) => {
    if (!acc[log.session_id]) {
      acc[log.session_id] = {
        messages: [],
        lastActive: log.created_at,
        ip: log.ip_address || 'Bilinmiyor',
        device: log.user_agent || 'Bilinmiyor',
      };
    }
    // Prepend to keep chronological order within session (since query is DESC)
    acc[log.session_id].messages.unshift(log);
    
    // Update last active if this log is newer
    if (new Date(log.created_at) > new Date(acc[log.session_id].lastActive)) {
      acc[log.session_id].lastActive = log.created_at;
    }
    
    return acc;
  }, {});

  // Convert to array and sort by lastActive DESC
  const sessions = Object.entries(groupedLogs)
    .map(([sessionId, data]: any) => ({
      sessionId,
      messages: data.messages,
      lastActive: data.lastActive,
      ip: data.ip,
      device: data.device
    }))
    .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div>
          <h1>💬 Canlı AI Sohbetleri (Geçici)</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Ziyaretçilerin AI Asistan ile yaptığı son 24 saat içindeki sohbetler. <br/>
            Gizlilik gereği 24 saatten eski sohbetler otomatik olarak veritabanından silinir.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={loadData} disabled={loading}>
          {loading ? 'Yenileniyor...' : '🔄 Yenile'}
        </button>
      </div>

      {sessions.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.5)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Son 24 saat içinde sohbet eden kimse yok.</p>
          <p style={{ fontSize: '0.875rem' }}>Ziyaretçiler asistan ile konuştuğunda loglar burada görünecek.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {sessions.map((session: any, index) => (
            <div key={session.sessionId} className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(59,130,246,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontFamily: 'monospace' }}>
                    Oturum: {session.sessionId.substring(0, 8)}...
                  </span>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                    <span title={session.ip}>🌍 IP: {session.ip}</span>
                    <span title={session.device} style={{ width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      💻 Cihaz: {session.device}
                    </span>
                  </div>
                </div>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                  Son Aktivite: {formatDate(session.lastActive)}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {session.messages.map((msg: any) => (
                  <div key={msg.id} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.role === 'user' ? 'flex-start' : 'flex-end',
                  }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: msg.role === 'user' ? 'var(--brand)' : '#4ade80',
                      marginBottom: '0.25rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {msg.role === 'user' ? 'Ziyaretçi' : 'AI Asistan'}
                    </span>
                    <div style={{
                      backgroundColor: msg.role === 'user' ? 'rgba(255,255,255,0.05)' : 'rgba(59,130,246,0.1)',
                      border: msg.role === 'user' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(59,130,246,0.2)',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      maxWidth: '85%',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      color: 'rgba(255,255,255,0.9)',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
