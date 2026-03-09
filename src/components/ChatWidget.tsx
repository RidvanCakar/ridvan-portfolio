'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, newUserMsg].map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.text();
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes avatar-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
        }
        .chat-fab:hover {
          transform: scale(1.08) !important;
        }
      `}} />

      {/* Floating Bubble (closed state) */}
      {!isOpen && (
        <button
          className="chat-fab"
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.6rem 1.2rem 0.6rem 0.5rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(12, 13, 17, 0.98)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(59,130,246,0.15)',
            cursor: 'pointer',
            zIndex: 999,
            color: 'white',
            transition: 'transform 0.2s ease',
            backdropFilter: 'blur(16px)',
          }}
          aria-label="Rıdvan AI Asistan"
        >
          {/* Avatar */}
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
            border: '2px solid var(--brand)',
            animation: 'avatar-pulse 2.5s ease-in-out infinite',
          }}>
            <img src="/ridvan-avatar.jpg" alt="Rıdvan" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          {/* Text */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>💬 Merhaba!</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>Rıdvan hakkında soru sorun</div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '360px',
          height: '580px',
          maxHeight: '90vh',
          maxWidth: 'calc(100vw - 2rem)',
          backgroundColor: 'rgba(10, 11, 15, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.12)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden',
          animation: 'chatSlideIn 0.25s ease-out forwards',
        }}>

          {/* Hero Header with Photo */}
          <div style={{
            position: 'relative',
            height: '160px',
            flexShrink: 0,
            overflow: 'hidden',
          }}>
            {/* Background gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #0f1229 0%, #1a1f3a 50%, #0b1520 100%)',
            }} />
            {/* Grid overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
            {/* Smooth bottom fade — prevents harsh cut to message area */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '50px',
              background: 'linear-gradient(to bottom, transparent, rgba(10,11,15,0.98))',
              pointerEvents: 'none',
            }} />

            {/* Profile photo - centered */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden',
              border: '3px solid var(--brand)',
              boxShadow: '0 0 20px rgba(59,130,246,0.5)',
            }}>
              <img src="/ridvan-avatar.jpg" alt="Rıdvan Çakar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>

            {/* Name and title */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: 0, right: 0,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>Rıdvan Çakar</div>
              <div style={{
                fontSize: '0.75rem', color: 'var(--brand)', fontWeight: 500, marginTop: '2px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                Yazılım Mühendisi · AI Asistanı
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute', top: '12px', right: '12px',
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
          }}>
            {messages.length === 0 ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', gap: '1rem',
              }}>
                {/* Welcome bubble from assistant */}
                <div style={{
                  alignSelf: 'flex-start',
                  display: 'flex', gap: '0.6rem', alignItems: 'flex-end',
                }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                    <img src="/ridvan-avatar.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.9)',
                    padding: '0.75rem 1rem',
                    borderRadius: '16px 16px 16px 4px',
                    fontSize: '0.875rem',
                    lineHeight: 1.55,
                    maxWidth: '90%',
                  }}>
                    👋 Merhaba! Ben Rıdvan'ın AI asistanıyım.<br />
                    Rıdvan'ın yetenekleri, projeleri veya deneyimleri hakkında dilediğiniz soruyu sorabilirsiniz.
                  </div>
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} style={{
                  display: 'flex',
                  flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                  gap: '0.5rem',
                  alignItems: 'flex-end',
                }}>
                  {m.role === 'assistant' && (
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                      <img src="/ridvan-avatar.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  )}
                  <div style={{
                    backgroundColor: m.role === 'user' ? 'var(--brand)' : 'rgba(255,255,255,0.06)',
                    border: m.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    color: 'white',
                    padding: '0.7rem 0.9rem',
                    borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    maxWidth: '80%',
                    fontSize: '0.875rem',
                    lineHeight: 1.55,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {m.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <img src="/ridvan-avatar.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '0.8rem 1rem',
                  borderRadius: '16px 16px 16px 4px',
                  display: 'flex', gap: '5px', alignItems: 'center',
                }}>
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <span key={i} style={{
                      width: 6, height: 6, background: 'rgba(255,255,255,0.5)', borderRadius: '50%',
                      display: 'inline-block',
                      animation: `dot-pulse 1s ease-in-out ${delay}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} style={{
            padding: '0.875rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', gap: '0.6rem', flexShrink: 0,
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bir şeyler sorun..."
              autoFocus
              style={{
                flex: 1, padding: '0.7rem 1rem', borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)', color: 'white',
                fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit',
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: '42px', height: '42px', borderRadius: '10px',
                backgroundColor: 'var(--brand)', color: 'white', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                flexShrink: 0, transition: 'opacity 0.2s',
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>

          {/* Branding Footer */}
          <div style={{
            textAlign: 'center',
            padding: '0.5rem',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.02em',
            flexShrink: 0,
          }}>
            ⚡ <span style={{ color: 'rgba(255,255,255,0.3)' }}>Rıdvan Çakar</span> tarafından tasarlandı
          </div>
        </div>
      )}
    </>
  );
}
