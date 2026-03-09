'use client';

import { useState, FormEvent } from 'react';

const SUBJECTS = [
  'Web Sitesi Geliştirme',
  'Mobil Uygulama',
  'Backend / API Geliştirme',
  'AI / Yapay Zeka Entegrasyonu',
  'Mevcut Proje Bakım & Destek',
  'Danışmanlık',
  'Diğer',
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: SUBJECTS[0], budget: '', message: ''
  });
  const [customSubject, setCustomSubject] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const finalSubject = formData.subject === 'Diğer' ? customSubject : formData.subject;
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject: finalSubject }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: SUBJECTS[0], budget: '', message: '' });
      setCustomSubject('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(74,222,128,0.2)',
        borderRadius: '14px',
        padding: '2.5rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'rgba(74,222,128,0.12)', color: '#4ade80',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1rem', fontSize: '1.5rem',
        }}>✓</div>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'white' }}>Gönderildi! 🎉</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.5, maxWidth: '350px', margin: '0 auto 1.25rem' }}>
          Mesajınız bana ulaştı. En kısa sürede dönüş yapacağım.
        </p>
        <button
          onClick={() => setStatus('idle')}
          style={{
            padding: '0.5rem 1.2rem', borderRadius: '8px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit',
          }}
        >
          Yeni Mesaj
        </button>
      </div>
    );
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '0.7rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
    color: 'white',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  };

  const labelBase: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '0.3rem',
    fontWeight: 500,
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(59,130,246,0.4)';
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '14px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.9rem',
    }}>

      {/* Name & Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label style={labelBase}>İsim Soyisim *</label>
          <input name="name" value={formData.name} onChange={handleChange} required placeholder="Adınız" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
        <div>
          <label style={labelBase}>E-posta *</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="ornek@email.com" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label style={labelBase}>Telefon (opsiyonel)</label>
        <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="05XX XXX XX XX" style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
      </div>

      {/* Subject & Budget */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label style={labelBase}>Konu *</label>
          <select name="subject" value={formData.subject} onChange={handleChange} required style={{ ...inputBase, cursor: 'pointer' }} onFocus={focusHandler} onBlur={blurHandler}>
            {SUBJECTS.map(s => <option key={s} value={s} style={{ background: '#1a1a2e', color: 'white' }}>{s}</option>)}
          </select>
        </div>
        <div>
          <label style={labelBase}>Tahmini Bütçe</label>
          <input name="budget" value={formData.budget} onChange={handleChange} style={inputBase} onFocus={focusHandler} onBlur={blurHandler} />
        </div>
      </div>

      {/* Custom Subject Input — only when 'Diğer' is selected */}
      {formData.subject === 'Diğer' && (
        <div>
          <label style={labelBase}>Konunuzu yazın *</label>
          <input
            value={customSubject}
            onChange={e => setCustomSubject(e.target.value)}
            required
            placeholder="Hangi konuda hizmet almak istiyorsunuz?"
            style={inputBase}
            onFocus={focusHandler}
            onBlur={blurHandler}
          />
        </div>
      )}

      {/* Message */}
      <div>
        <label style={labelBase}>Mesajınız *</label>
        <textarea
          name="message" value={formData.message} onChange={handleChange} required rows={4}
          placeholder="Projeniz hakkında kısaca bilgi verin..."
          style={{ ...inputBase, resize: 'vertical' as const, minHeight: '90px' }}
          onFocus={focusHandler} onBlur={blurHandler}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          width: '100%', padding: '0.8rem', borderRadius: '8px',
          background: status === 'sending' ? 'rgba(59,130,246,0.3)' : 'var(--brand)',
          color: 'white', border: 'none',
          fontSize: '0.95rem', fontWeight: 600,
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.2s',
          boxShadow: status === 'sending' ? 'none' : '0 2px 10px rgba(59,130,246,0.25)',
        }}
      >
        {status === 'sending' ? '⏳ Gönderiliyor...' : '🚀 Teklif İsteğini Gönder'}
      </button>

      {status === 'error' && (
        <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '0.85rem', margin: 0 }}>
          Bir hata oluştu. Lütfen tekrar deneyin.
        </p>
      )}
    </form>
  );
}
